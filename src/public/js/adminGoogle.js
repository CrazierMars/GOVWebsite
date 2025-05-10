//Consulta para obtener los usuarios desde Firebase
//node adminGoogle.js
const admin = require("firebase-admin");
//key.json 
const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Listar usuarios
admin.auth().listUsers(1000) // máximo 1000 usuarios por llamada
  .then((listUsersResult) => {
    listUsersResult.users.forEach((userRecord) => {
      console.log("Usuario:", userRecord.email, "UID:", userRecord.uid, "Nombre:", userRecord.displayName, "Foto:", userRecord.photoURL);
    });
  })
  .catch((error) => {
    console.log("Error listando usuarios:", error);
  });
