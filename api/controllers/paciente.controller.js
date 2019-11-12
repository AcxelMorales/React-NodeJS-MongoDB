const Paciente = require('../models/Paciente');

///////////////////////////////////////////////////////////////////////////////////////
// <= GET ALL =>
///////////////////////////////////////////////////////////////////////////////////////
exports.getAll = async (req, res) => {
  try {
    const pacientes = await Paciente.find();

    res.json({
      ok: true,
      pacientes
    });
  } catch {
    return res.json({
      ok     : false,
      message: 'Hubo un error en la obtencion de datos'
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////////
// <= GET BY ID =>
///////////////////////////////////////////////////////////////////////////////////////
exports.getById = async (req, res) => {
  try {
    const paciente = await Paciente.findOne({ _id: req.params.id });

    res.json({
      ok: true,
      paciente
    });
  } catch {
    return res.json({
      ok     : false,
      message: 'Hubo un error en la busqueda con ID: ' + req.params.id
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////////
// <= POST =>
///////////////////////////////////////////////////////////////////////////////////////
exports.post = async (req, res) => {
  const paciente = new Paciente(req.body);

  try {
    await paciente.save();

    res.json({
      ok: true,
      message: 'Paciente creado'
    });
  } catch {
    return res.json({
      ok     : false,
      message: 'Hubo un error en la insercción'
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////////
// <= PUT =>
///////////////////////////////////////////////////////////////////////////////////////
exports.put = async (req, res) => {
  try {
    const paciente = await Paciente.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });

    res.json({
      ok: true,
      paciente
    });
  } catch {
    return res.json({
      ok     : false,
      message: 'Hubo un error en la actualización'
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////////
// <= DELETE =>
///////////////////////////////////////////////////////////////////////////////////////
exports.delete = async (req, res) => {
  try {
    const paciente = await Paciente.findOneAndDelete({ _id: req.params.id });

    res.json({
      ok: true,
      paciente
    });
  } catch {
    return res.json({
      ok     : false,
      message: 'Hubo un error en la eliminación'
    });
  }
};