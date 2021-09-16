/* Ruta :
api/hospitales*/



const { Router } = require("express");
const { check } = require('express-validator') //Exportación midelware
const { validarCampos } = require('../midelwares/validar-campos')
const { validarJWT } = require('../midelwares/validar-jwt')
const { getHospitales, crearHospital, borrarHospital, actualizarHospital } = require('../controllers/hospitales')

const router = Router();

router.get('/', /* validarJWT, */ getHospitales);

//Midelwares para validar sin tener que crear multiples if
router.post('/', [
        validarJWT,
        check('nombre', 'el nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],

    crearHospital);

router.put('/:id', [


    ],
    actualizarHospital
);
router.delete('/:id',
    borrarHospital
);



module.exports = router