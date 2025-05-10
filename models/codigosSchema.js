//llamada a mongoose 
const { default: mongoose } = require('mongoose');
// const baseAvisos = require('mongoose');

//bd
const DB_URL = 'mongodb://localhost:27017/codigos'//revisar
//conexion
// mongoose.connect(DB_URL,{})
//     .then(()=>console.log("DB avisos conectada"))
//     .catch((err=>console.log(err)))


//Schema 
const codigosSchema = mongoose.Schema({
    codigo: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true }, // <-- CAMBIO: de String a Date
    estado: { type: Boolean, default: true },
  });
  

//crearColeccion
const codigosModel = mongoose.model('codigos', codigosSchema);

console.log('coleccion codigos creada')
module.exports = codigosModel;