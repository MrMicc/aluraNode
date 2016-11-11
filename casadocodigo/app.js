/**
 * Created by luizmiccieli on 02/11/16.
 */
//chamando o arquivo de configuração
var app = require('./config/configExpress')();

app.listen(3000, function () {
    console.log('Servidor rodando!!');
});


