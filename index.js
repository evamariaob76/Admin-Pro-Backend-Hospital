//FVtFM9sKAoFPPJHq
//mean_user2

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path')



const { dbConnection } = require('./database/config');

//Crear servidor express
const app = express();

//Configurar cors
app.use(cors());

//Lectura  y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//Directorio público
app.use(express.static('public')) //nombre de la carpeta que es pública



//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

//Si no es ninguna ruta
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
});


app.listen(process.env.PORT, () => {
    console.log('servidor correindo en puerto  ' + process.env.PORT)

});