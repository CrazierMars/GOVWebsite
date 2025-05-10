//llamada a mongoose 
const { default: mongoose } = require('mongoose');
// const baseDenuncias = require('mongoose');

//bd
const DB_URL = 'mongodb://localhost:27017/Hummingbirds'//revisar
//conexion
mongoose.connect(DB_URL,{})
    .then(()=>console.log("DB general conectada"))
    .catch((err=>console.log(err)))

//Schema 
const denunciaSchema = mongoose.Schema({
    titulo: {type: String, required: true}, 
    imagenes: {type: String, required: true}, 
    select: {type: String, required: false},
    descripcion: {type: String, required: true}, 
    date: {type: String, required: true},
    tramitado: {type: Boolean, default: false}
})

//crearColeccion
const denunciasModel = mongoose.model('denuncias', denunciaSchema);
module.exports = denunciasModel;