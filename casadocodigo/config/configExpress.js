/**
 * Created by ter00409 on 03/11/2016.
 */
/*
FUNCIONAMENTO DO REQUIRE:
    O require sem barra ou ponto, ele vai para pasta de modulos do node e ai sim, carrega as bibliotecas
    caso tenham algum ponto ou barra, será percorrido o path do projeto apartir do path onde se encontra o modulo
 */

var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

//Exportando o modulo responsavel em configurar o express
module.exports = function (){
    var app = express();

    app.set('view engine', 'ejs');
    app.set('views','./app/views');

    app.use(bodyParser.urlencoded({extended:true})); //middleware responsavel no html response
    app.use(bodyParser.json()); //middleware responsavel em parsear o JSON
    app.use(expressValidator()); //middleware responsavel pela validação

    load('routes',{cwd : 'app'})
        .then('db')
        .into(app);

    return app;
};