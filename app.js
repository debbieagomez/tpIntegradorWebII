const express = require('express');
const app = express(); //dice que app es el archivo principal de la aplicacionnpm
const path = require('path'); //para manejar rutas de archivos
const { sequelize } = require('./models'); //importa la conexion a la base de datos desde el archivo models/index.js


//configuracion de pug
app.set('view engine', 'pug'); //configura pug como motor de plantillas
app.set('views', path.join(__dirname, 'vista')); //configura la carpeta donde estan las vistas




//middleware
app.use(express.urlencoded({ extended: true })); //para poder recibir datos de formularios
app.use(express.json()); //para poder recibir datos en formato json
app.use(express.static(path.join(__dirname, 'public'))); //para servir archivos estaticos desde la carpeta public


app.get('/', (req, res) => {
    console.log('ruta raiz ejecutada');
    // Renderizar la vista principal
    res.render('index', { title: 'Hospital Management System', message: 'Bienvenido al sistema de gestión hospitalaria' });
});




//Importacion de rutas
const indexRouter = require('./rutas/index'); //importa las rutas principales
const pacientesRouter = require('./rutas/pacientes'); //importa las rutas de pacientes
const admisionRouter = require('./rutas/admision'); //importa las rutas de admision
const habitacionRouter = require('./rutas/habitacion'); //importa las rutas de habitacion
const camaRouter = require('./rutas/cama'); //importa las rutas de cama
const internacionRouter = require('./rutas/internacion'); //importa las rutas de internacion
//uso de rutas
app.use('/', indexRouter); //usa las rutas principales
app.use('/admision', admisionRouter); //usa las rutas de admision
app.use('/habitacion', habitacionRouter); //usa las rutas de habitacion
app.use('/cama', camaRouter); //usa las rutas de cama
app.use('/internacion', internacionRouter); //usa las rutas de internacion
app.use('/paciente', pacientesRouter); //usa las rutas de pacientes

//conexion con la base de datos
sequelize.sync({ alter: true })  
  .then(() => {
    console.log('Base de datos sincronizada correctamente');
    //  Iniciar el servidor
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(` Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(' Error al sincronizar la base de datos:', error);
  });



//error 404 
app.use((req, res, next) => {
    res.status(404).render('error', { 
        title: 'Error 404', 
        message: 'Página no encontrada' });

});

// manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack); //imprime el error en la consola
    res.status(500).render('error', { 
        title: 'Error 500', 
        message: 'Error interno del servidor' });
});





const PORT = 3000; //puerto donde se ejecutara la aplicacion

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});





//paciente
//habitacion
//cama
//internacion
//admision