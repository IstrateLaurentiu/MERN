# Introducere

Aplicatia denumita DevConnector este o aplicatie contruita folosind React si Node.js + Express, ce foloseste MongoDB ca si baza de date. Initial aplicatia a fost dezvoltata pe baza unui curs de pe Udemy in urma caruia voiam sa-mi imbunatatesc cunstintele de backend si cele de Redux. Ulterior a fost adaptata cerintelor pentru proiectul disciplinei Cloud Computing.

Cele 2 api-uri integrate sunt unul de la github, prin intermediul caruia un utilizator isi adauga, daca doreste, numele de utilizator de github si in aplicatie, in cadrul profilului, i se vor afisa toate repository-urile publice. Cel de-al doilea api integrat este  SendGrid, un serviciu pentru trimitere de email-uri.

Link-ul aplicatiei: https://secret-gorge-29804.herokuapp.com/

# Descriere problemă

In cadrul aplcatiei, persoanele, in special programatorii, isi pot crea cont si pot crea diverse postari, pot comenta si da like altor postari si pot urmari alte persoane. Fiecare utilizator logat isi poate crea un profil unde adauga ce informatii doreste despre el si despre experienta profesionala si cea educationala.

# Descriere API

Arhitectura aplicatiei este REST API. Prin intermediul router-ului din Express am creat mai multe endpoint-uri unde gestionez fiecare tip de request in parte (get, post, put si delete). Pentru legatura dintre client si server, am folosit pachetul axios prin intermediul caruia apelez endpoint-urile create. API-ul de la github este folosit in momentul in care se efectueaza un request  de tip GET pentru profilul unui singur user si pentru a apela endpoint-ul respectiv este nevoie de un "client secret" si de un "client Id", iar API-ul de la SendGrid este folosit in momentul in care este inregistrat un utilizator. Pentru a folosi SendGrid, am instalat pachetul npm aferent si am folosit API-key-ul generat la ei pe site, iar in momentul in care un user este creat, i se trimite un email care contine un link de confirmare. 
Pentru functionalitatea de logare in aplicatie am folosit JSON Web Token.

# Flux de date
## Exemple de request / response

Spre exemplu, pentru inregistrare este efectuat un request de tip post catre ruta "/api/users" din aplicatia de frontend :

const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      name,
      email,
      password,
    });
    const res = await axios.post("/api/users", body, config);

Dupa ce este efectuat request-ul din partea de frontend, pe backend va fi apelata prima functie din routes/api/users.js, unde se verifica prima data continutul din corpul requestului, se verifica daca exista deja un user cu email-ul introdus, iar daca aceste validari sunt trecute, este trimis un email de confirmare catre utilizator si  un ranspuns pozitiv, un token in cazul de fata, catre apelator (catre axios in frontend  res.send({ token }); ). In cazul in care nu sunt trecute toate validarile, este trimis un raspuns negativ catre frontend, ex:  return res.status(400).json({ errors: [{ msg: "User already exists" }] });

## Metode HTTP

Metodele HTTP folosite sunt GET, POST, PUT si DELETE. 
Get este folosit pentru a prelua informatii din baza de date ( informatii despre un profil sau despre toate profilurile)
Post este folosit ca sa trimit date catre server, spre exemplu endpoint-urile pentru login si register
Put este folosit pentru update ( activarea email-ului)
Delete este folosit pentru a sterge inregistrari din baza de date.

## Autentificare și autorizare servicii utilizate
Pentru cele 2 API-uri utilizate am fost nevoit sa obtin de pe platformele lor anumite "API-KEYS" si alte credentiale, pentru autentificare.
Aceste credentiale le-am pus in variable de environment si le-am utilizat acolo unde a fost nevoie.

Pentru sendgrid :

const config = require("config");
const apiKey = config.get("sendGridApiKey");
sgMail.setApiKey(apiKey);

Pentru github:

const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&
     sort=created:asc&client_id=${config.get(
       "githubClientId"
     )}&client_secret=${config.get("githubClientSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

##   Capturi ecran aplicație

<img src="cloud-computing-screenshots/ss1.PNG" />
<img src="cloud-computing-screenshots/ss2.png" />
<img src="cloud-computing-screenshots/ss3.png" />


## Referinte
https://www.udemy.com/course/mern-stack-front-to-back/
