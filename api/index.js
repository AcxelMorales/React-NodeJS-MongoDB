const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const cors       = require('cors');

const app = express();

///////////////////////////////////////////////////////////////////////////////////////
// <= SETTINGS =>
///////////////////////////////////////////////////////////////////////////////////////
app.set('port', process.env.PORT || 4000);

///////////////////////////////////////////////////////////////////////////////////////
// <= MIDDLEWARES =>
///////////////////////////////////////////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Proteger API
const whiteList = ['http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    const existe = whiteList.some(dominio => dominio === origin);
    (existe) ? callback(null, true) : callback(new Error('No permitido por CORS'));
  }
};

app.use(cors(corsOptions));

///////////////////////////////////////////////////////////////////////////////////////
// <= ROUTES =>
///////////////////////////////////////////////////////////////////////////////////////
app.use(require('./routes/paciente.routes'));

///////////////////////////////////////////////////////////////////////////////////////
// <= LISTENER =>
///////////////////////////////////////////////////////////////////////////////////////
app.listen(app.get('port'), () => console.log(`Servidor en el puerto: ${app.get('port')}`));

///////////////////////////////////////////////////////////////////////////////////////
// <= DATABASE =>
///////////////////////////////////////////////////////////////////////////////////////
mongoose.connect('mongodb://localhost/veterinaria', {
  useNewUrlParser   : true,
  useUnifiedTopology: true,
  useFindAndModify  : false
}).then(()  => console.log('Base de datos en linea'))
  .catch(() => console.error('Error en la Base de Datos'));