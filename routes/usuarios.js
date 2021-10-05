//RUTA ; /api/usuarios

const { Router } = require("express");
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario, getUsuario } = require('../controllers/usuarios')
const { check } = require('express-validator') //Exportación midelware
const { validarCampos } = require('../midelwares/validar-campos')
const { validarJWT } = require('../midelwares/validar-jwt')

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.get('/:id', validarJWT, getUsuario);


//Midelwares para validar sin tener que crear multiples if
router.post('/', [

        check('nombre', ' el nombre es obligatorio').not().isEmpty(),
        check('password', ' el password es obligatorio').not().isEmpty(),
        check('email').isEmail(),
        validarCampos,

    ],

    crearUsuario);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    actualizarUsuario
);
router.delete('/:id',
    validarJWT,
    borrarUsuario
);



module.exports = router