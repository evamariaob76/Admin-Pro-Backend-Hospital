const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = (req, res, next) => {

    ///Leer token de los headers

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la petición'
        })
    }

    console.log(token);

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();



    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });

    }

}

const validarADMIN_ROLE = async(req, resp, next) => {
    const uid = req.uid;
    try {
        const usuariodb = await Usuario.findById(uid);
        if (!usuariodb) {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuariodb.role !== 'ADMIN_ROLE') {
            return resp.status(403).json({
                ok: false,
                msg: 'Sin privilegios'
            });
        }

        next();


    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'hable con el administrado'
        })

    }

}



const validarADMIN_ROLE_o_MismoUsuario = async(req, resp, next) => {
    const uid = req.uid;
    const id = req.params.id;
    try {
        const usuariodb = await Usuario.findById(uid);
        if (!usuariodb) {
            return resp.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuariodb.role === 'ADMIN_ROLE' && uid === id) {
            next();
        } else {
            return resp.status(403).json({
                ok: false,
                msg: 'Sin privilegios'
            });
        }

    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'hable con el administrado'
        })

    }
}
module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}