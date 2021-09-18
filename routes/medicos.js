/* Ruta :
api/medicos*/



const { Router } = require("express");
const { check } = require('express-validator') //Exportación midelware
const { validarCampos } = require('../midelwares/validar-campos')
const { validarJWT } = require('../midelwares/validar-jwt')
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos')

const router = Router();

router.get('/', /* validarJWT, */ getMedicos);

//Midelwares para validar sin tener que crear multiples if
router.post('/', [
        validarJWT,
        check('nombre', 'el nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'el hospital ID debe de ser válido').not().isMongoId(),

        validarCampos
    ],

    crearMedico);

router.put('/:id', [
        validarJWT,
        check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'el hospital ID debe de ser válido').not().isMongoId(),

        validarCampos
    ],
    actualizarMedico
);


router.delete('/:id',
    borrarMedico
);



module.exports = router