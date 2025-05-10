const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  categoria: {              // ← Nuevo campo para agrupar  
    type: String,
    required: true,
    enum: ['Trámites', 'Eventos', 'Infraestructura', 'Otro'] // Ajusta categorías
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'servicios'
});

module.exports = mongoose.model('Servicio', servicioSchema);
