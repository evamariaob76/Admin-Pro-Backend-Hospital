/*
    Medicos
    ruta: '/api/medico'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midelwares/validar-campos');

const { validarJWT } = require('../midelwares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
} = require('../controllers/medicos')


const router = Router();

router.get('/', validarJWT, getMedicos);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

router.delete('/:id',
    borrarMedico,
    validarJWT

);

router.get('/:id',
    validarJWT,
    getMedicoById

);

module.exports = router;