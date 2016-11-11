/**
 * Created by luizmiccieli on 05/11/16.
 */
var mysql = require('mysql');

var connectMYSQL  = function() {
    console.log('Retornando conexão da Fábrica');
   return mysql.createConnection({
        host : 'localhost',
        user: 'root',
        password: 'root',
        database: 'casadocodigo'
    });

};


module.exports = function () {
    console.log('Preparando a factory');
    return connectMYSQL;
};