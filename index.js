//FVtFM9sKAoFPPJHq
//mean_user2

require('dotenv').config();

const express = require('express');
const cors = require('cors')



const { dbConnection } = require('./database/config');

//Crear servidor express
const app = express();

//Configurar cors
app.use(cors());


//Base de datos
dbConnection();

app.listen(process.env.PORT, () => {
    console.log('servidor correindo en puerto  ' + process.env.PORT)

});



//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })

});