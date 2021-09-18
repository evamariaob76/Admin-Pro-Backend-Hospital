// Path: '/api/ñogin'
const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignI, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../midelwares/validar-campos");
const { validarJWT } = require("../midelwares/validar-jwt")

const router = Router();

router.post('/', [

        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login);
router.post('/google', [

        check('token', 'el token de google  es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignI);

router.get('/renew',
    validarJWT,
    renewToken
)






module.exports = router;