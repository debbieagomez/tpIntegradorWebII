const express = require('express');
const app = express(); //dice que app es el archivo principal de la aplicacionnpm
const pug = require('pug'); //motor de plantillas 
const path = require('path'); //para manejar rutas de archivos


const PORT = 3000; //puerto donde se ejecutara la aplicacion

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


//configuracion de pug
app.set('view engine', 'pug'); //configura pug como motor de plantillas
app.set('views', path.join(__dirname, 'vista')); //configura la carpeta donde estan las vistas




//middleware
app.use(express.urlencoded({ extended: true })); //para poder recibir datos de formularios
app.use(express.json()); //para poder recibir datos en formato json
app.use(express.static(path.join(__dirname, 'public'))); //para servir archivos estaticos desde la carpeta public

//Importacion de rutas
const pacientesRouter = require('./rutas/pacientes'); //importa las rutas de pacientes
const admisionRouter = require('./rutas/admision'); //importa las rutas de admision
const habitacionRouter = require('./rutas/habitacion'); //importa las rutas de habitacion
const camaRouter = require('./rutas/cama'); //importa las rutas de cama
const internacionRouter = require('./rutas/internacion'); //importa las rutas de internacion
//uso de rutas 
app.use('/admision', admisionRouter); //usa las rutas de admision
app.use('/habitacion', habitacionRouter); //usa las rutas de habitacion
app.use('/cama', camaRouter); //usa las rutas de cama
app.use('/internacion', internacionRouter); //usa las rutas de internacion
app.use('/paciente', pacientesRouter); //usa las rutas de pacientes




//ruta principal 
app.get('/', (req, res) => {
    res.render('index', { title: 'Hospital Management System', message: 'Bienvenido al sistema de gestión hospitalaria' });
});



//paciente
//habitacion
//cama
//internacion
//admision