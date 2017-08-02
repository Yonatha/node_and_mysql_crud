var express = require('express');
var db = require('../db');
var Usuario = require('../models/usuario');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    usuarios = Usuario.find(null)

    res.render('index', {usuarios: usuarios});

});

router.get('/criartabela', function (req, res) {
    Usuario.sync(function () {
        res.end('Tabela usuario criada a partir do model Usuario.');
    });
    db.drop(function () {
        Usuario.sync(function () {
        });
    });
});

/**
 * Cadastra dados de exemplo
 */
router.get('/cadastrar_dados_de_exemplo', function (req, res) {
    var lista = [
        {
            nome: 'Yonatha',
            sobrenome: 'Alves Almeida',
            idade: 29,
            email: 'yonathalmeida@gmail.com',
            status: true
        },
        {
            nome: 'Fulano',
            sobrenome: 'Sobrenome',
            idade: 25,
            email: 'fulano@gmail.com',
            status: true
        },
        {
            nome: 'Cicrano',
            sobrenome: 'Sobrenome',
            idade: 26,
            email: 'cicrano.sobrenome@uol.com',
            status: false
        },
        {
            nome: 'Beutrana',
            sobrenome: 'Sobrenome',
            idade: 20,
            email: 'beutrana_teste1987@ibest.com',
            status: true
        },
        {
            nome: 'Jurema',
            sobrenome: 'Sobrenome',
            idade: 23,
            email: 'jurema@bol.com',
            status: false
        }
    ];

    for (var i = 0; i < lista.length; i++) {
        Usuario.create(lista[i], function (err, results) {

            console.log('Registro ' + results.nome + ' cadastrado com sucesso.');
        });
    }
    res.redirect('/')
});

router.get('/novo', function (req, res) {
    res.render('novo');
});

router.get('/alterar', function (req, res) {

    Usuario.find({id: req.query.id}, function (err, usuario) {
        if (usuario != null) {
            usuario[0].nome = 'Yonatha';
            usuario[0].idade = 30;
            usuario[0].save(function (err) {
                if (!err) {
                    console.log('Registro alterado com sucesso');
                }
            });
        }
    });
    res.redirect('/');
});

router.post('/salvar', function (req, res) {

    id = req.body.id
    nome = req.body.nome
    idade = req.body.idade
    email = req.body.email
    telefone = req.body.telefone

    Usuario.find({id: id}, function (err, usuario) {
        if (usuario != null) {
            usuario[0].nome = nome
            usuario[0].idade = idade
            usuario[0].email = email
            usuario[0].telefone = telefone
            usuario[0].save(function (err) {
                if (!err) {
                    console.log('Registro alterado com sucesso');
                }
            });
        }
    });
    res.redirect('/');
});

module.exports = router;
