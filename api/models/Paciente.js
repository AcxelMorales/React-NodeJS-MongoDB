const {
  Schema,
  model
} = require('mongoose');

const pacienteSchema = new Schema({
  nombre: {
    type: String,
    trim: true
  },
  propietario: {
    type: String,
    trim: true
  },
  fecha: {
    type: String,
    trim: true
  },
  hora: {
    type: String,
    trim: true
  },
  sintomas: {
    type: String,
    trim: true
  }
});

const Paciente = model('paciente', pacienteSchema);
module.exports = Paciente;