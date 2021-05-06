const sgMail = require('@sendgrid/mail')
const config = require("config");
const apiKey = config.get("sendGridApiKey");
sgMail.setApiKey(apiKey);

module.exports =   sgMail ;

