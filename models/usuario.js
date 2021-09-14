const { Schema, model } = require('mongoose');

//Modelo
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },

    img: {
        type: String,

    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'


    },

    google: {
        type: Boolean,
        DEFAULT: false
    }
});

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject(); // Extrayendo versión e id

    object.uid = _id; //para cambiar id a uid pero no funciona. Cambio de versión?
    return object;

})

module.exports = model('Usuario', UsuarioSchema);