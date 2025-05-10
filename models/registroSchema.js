//llamada a mongoose 
const { default: mongoose } = require('mongoose');
// const baseAvisos = require('mongoose');

//bd
const DB_URL = 'mongodb://localhost:27017/registro'//revisar
//conexion
// mongoose.connect(DB_URL,{})
//     .then(()=>console.log("DB avisos conectada"))
//     .catch((err=>console.log(err)))


//Schema 
const registroSchema = mongoose.Schema({
    nombre: {type: String, required: true}, 
    apellido1: {type: String, required: true},
    apellido2: {type: String, required: true},
    email: {type: String, required: true},
    cedula: {type: String, required: true},
    numeroTelefono: {type: String, required: true},
    provinciaRegistro: {type: String, required: true},
    cantonRegistro: {type: String, required: true},
    distritoRegistro: {type: String, required: true},
    direccion: {type: String, required: true},
    password2: {type: String, required: true}, 
    role: { type: String,
        enum: ['user', 'concejal', 'admin'], default: 'user'
    }
})

//crearColeccion
const registroModel = mongoose.model('registro',registroSchema);

console.log('coleccion registro creada')
module.exports = registroModel;
