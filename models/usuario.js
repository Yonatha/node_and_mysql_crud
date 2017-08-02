var db = require('../db');
/**
 * Model Usuario
 */
var Usuario = db.define('usuario', {
    id: {type: 'serial', key: true}, // the auto-incrementing primary key
    nome: {type: 'text'},
    sobrenome: {type: 'text'},
    idade: {type: 'number'},
    email: {type: 'text'},
    status: {type: 'boolean'},
}, {
    methods: {
        fullName: function () {
            return this.nome + ' ' + this.surnome;
        }
    }
});

module.exports = Usuario;