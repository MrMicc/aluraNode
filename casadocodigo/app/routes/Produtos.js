/**
 * Created by ter00409 on 03/11/2016.
 *
 * controller responsável pelas rotas dos produtos
 */


//exportando rota que lista produtos
module.exports = function (app) {
    app.get('/produtos',function (req,res) {
        console.log('Listando os produtos');

        console.log('Carregando a conection da fábrica');
        var connection = app.db.ConnectionFactory();
        var produtosBanco = new app.db.ProdutosDAO(connection);

        produtosBanco.lista(function(err, result){
            if(err != null){
                console.log(err);
            }else{
                console.log('Retornou livros ' +result.length);
                //retornando dois tipo de retornos possiveis JSON e HTML
                res.format({
                    html : function(){
                       res.render('./produtos/lista',{lista:result}); //redenderizando a pagina de forma html
                   },
                    json : function () {
                        res.json(result); //retornando valores via JSON
                    }
                })
            }
        });
        connection.end();
    });

    app.get('/produtos/form',function (req,res) {
        res.render('./produtos/form', {errosValidacao :{}, produto : {}});
    });

    /**
     * realizando o insert na base de livros
     */
    app.post('/produtos', function (req,res) {
        var produto = req.body; //pegando as tags do form e transformando em JSON

        //utilizando o express-validator
        req.assert('titulo', 'Titulo é obrigatorio').notEmpty();
        req.assert('preco', 'preco não pode ser vazio').isFloat();
        var erros = req.validationErrors();

        //Caso tenha algum pau
        if(erros){
            res.format({
                html : function () {
                    //retonar erro 400 e retornando os dados previamente preenchidos na tela
                    res.status(400).render('./produtos/form', {errosValidacao : erros, produto : produto });

                },
                json : function () {
                    //retornando erro 400 e o erro para o JSON
                    res.status(400).json(erros);
                }
            });
            return;
        }
        //fim express-validator

        var connection = app.db.ConnectionFactory();
        var produtosBanco = new app.db.ProdutosDAO(connection);
        produtosBanco.salvaProduto(produto,function (err, result) {
            if(err!=null){
                console.log(err);
            }else{
                res.redirect('/produtos'); //redirecionando para o pagina que lista
            }
        });
        connection.end();

    });


     app.get('/produtos/delete', function (req, res) {
         res.render('./produtos/delete');
     });


    app.post('/produtos/delete',function (req, res) {
        var produtoDelete = req.body;

        var connection = app.db.ConnectionFactory();
        var produtosBanco = new app.db.ProdutosDAO(connection);
        produtosBanco.delete(produtoDelete,function (err,result) {
            if(err!=null){
                connection.log(err);
            }else{
                res.redirect('/produtos');
            }
        })
        produtosBanco.end();

    })
};