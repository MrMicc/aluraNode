/**
 * Created by ter00409 on 04/11/2016.
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('casadocodigo.db');

db.serialize(function() {

    db.run("CREATE TABLE if not exists livros (ROWID INTEGER PRIMARY KEY AUTOINCREMENT," +
        " titulo TEXT, " +
        "descricao TEXT, " +
        "preco NUM)");
    var stmt = db.prepare("INSERT INTO livros VALUES ('3','comecando com Algo', 'livro sobre alguma coisa', 99.00)");
    stmt.run();
    stmt.finalize();

    db.each("SELECT * FROM livros", function(err, row) {
        console.log(row);
    });
});

db.close();