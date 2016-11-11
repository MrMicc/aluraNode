/**
 * Created by luizmiccieli on 05/11/16.
 */
function ProdutosDAO(connection) {
    this.lista = function (callback) {
        connection.query('SELECT * FROM LIVROS', callback);
        console.log('Query que retorna lista de livros montada')
    };

    this.salvaProduto = function(produto,callback) {
        console.log('PRODUTO::::: '+produto);
        connection.query('INSERT INTO LIVROS SET ?', produto, callback);
    };

    this.delete = function (produto,callback) {
        connection.query('DELETE FROM LIVROS WHERE ID = ?',produto.id, callback);
    };

    return this;


}


module.exports = function(){
    return ProdutosDAO;
};