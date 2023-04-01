const mongoose = require("mongoose");

const UserEsquema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, requerid: true},
    apellidos: {type: String, requerid: true},
    nombre: {type: String, requerid: true},
    rol: {type: String, requerid: true},
});

module.exports = mongoose.model("User", UserEsquema);