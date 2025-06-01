const express = require ('express');
const app = express(); //dice que app es el archivo principal de la aplicacionnpm
const pug = require('pug'); //motor de plantillas 
const path = require('path'); //para manejar rutas de archivos


const PORT = 3000; //puerto donde se ejecutara la aplicacion

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


//configuracion de pug
app.set('view engine', 'pug'); //configura pug como motor de plantillas
app.get('/', (req, res) => {
    const data = pug.renderFile('./vista/index.pug')
    res.send(data);
}
);

app.use(express.static(path.join(__dirname, 'public'))); //para servir archivos estaticos
app.use(express.urlencoded({ extended: true })); //para poder recibir datos de formularios
app.use(express.json()); //para poder recibir datos en formato json

//paciente
//habitacion
//cama
//internacion
//admision