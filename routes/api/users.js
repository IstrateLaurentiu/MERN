const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const sendGrid =  require('../../mailAPI/mail');

const User = require("../../models/User");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
        isconfirmed: false
      });

      const salt = await bycrypt.genSalt(10);
      user.password = await bycrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          const msg = {
  to: email, // Change to your recipient
  from: 'laur.constantin22@gmail.com', // Change to your verified sender
  subject: 'Activate you account',
  text: 'Thank you for choosing our services! Please confirm your account!',
  html: `<strong>Thank you for choosing our services! <a href='https://secret-gorge-29804.herokuapp.com/activate/${token}' target='_blank'>Please confirm your account!</a> </strong>`,
}

sendGrid
  .send(msg)
  .then(() => {
    console.log('Email sent')
    res.send({ token });
  })
  .catch((error) => {
    console.error(error)
  })
          
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);


router.put(
  "/activate/:token",
  async (req, res) => {
    
    const token = req.params.token;

    jwt.verify(token, config.get("jwtSecret") , async function  (err, decoded) {
      if (err) {
          
          return res.json({msg: 'token is wrong or expired'});
      }
      else {
            let user = await User.findOne({ _id: decoded.user.id });
            if(user.isconfirmed) return res.json({msg: 'Your account is already confirmed!', success: false});
            user.update({isconfirmed: true}).then(result => res.status(200).json({msg: 'You have activated your account! You can login!', success: true}));
      
      } 
  })  
  }
);

module.exports = router;
