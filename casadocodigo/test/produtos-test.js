/**
 * Created by ter00409 on 09/11/2016.
 */
/**
 * O MOCHA precisa que os testes estejam dentro da pasta test na raiz do projeto
 * as funções de test do mocha, devem comecar como descibe
 */

/**
 * Case de test de produtos
 */

var express = require('../config/configExpress')();
var request = require('supertest')(express);

//var assert = require('assert'); //modulo de verificacao de teste


describe('ProdutosController', function () {

    /**
     * Caso de teste reponsavel em verificar se o servidor está aceitando e retornando os produtos via JSON
     */
    it('#listagem json', function (done) { //necessario passar para que o MOCHA saiba que a funcao assincrona tenha acabado de fato

        console.log(request.get('/produtos'));
        request.get('/')
            //.set('Accept', 'application/json') // informando que no header da requisiçao tem que ser do tipo JSON
            //.expect('Content-Type', /json/)   //falando que a resposta esperada no contet-type tem que ter a palavara json
            .expect(200)
            .end(done);//informando que espera um statusCode 200 e que pode finalizar o teste
        
    });

});
