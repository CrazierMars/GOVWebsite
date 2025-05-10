//llamada a mongoose 
const { default: mongoose } = require('mongoose');
// const baseAvisos = require('mongoose');

//bd
const DB_URL = 'mongodb://localhost:27017/noticias'//revisar
//conexion
// mongoose.connect(DB_URL,{})
//     .then(()=>console.log("DB avisos conectada"))
//     .catch((err=>console.log(err)))



//Schema 
const noticiasSchema = mongoose.Schema({
    titulo: {type: String, required: true}, 
    imagenes: {type: String, required: true},
    descripcion: {type: String, required: true}, 
    date: {type: String, required: true},
})

//crearColeccion
const noticiasModel = mongoose.model('noticias',noticiasSchema);
module.exports = noticiasModel;