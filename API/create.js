const connStr = "Server=localhost;Database=projeto;User Id=sa;Password=senhabanco;";
const sql = require("mssql");

sql.connect(connStr)
   .then(conn => createTable(conn))
   .catch(err => console.log("erro! " + err));

function createTable(conn){

    const table = new sql.Table('Chamados');
    table.create = true;
    table.columns.add('NUMERO', sql.Int, {nullable: false, primary: true});
    table.columns.add('NOME', sql.NVarChar(150), {nullable: false});
    table.columns.add('RA', sql.Int, {nullable: false});
    table.columns.add('PREDIO', sql.NVarChar(5), {nullable: false});
    table.columns.add('SALA', sql.Int, {nullable: false});
    table.columns.add('MAQUINA', sql.Int, {nullable: false});
    table.columns.add('STATUS', sql.Int, {nullable: false});
    table.columns.add('DESCRICAO', sql.NVarChar(600), {nullable: false});

    table.rows.add(1, 'Aluno 1', 12345678,'P10',01,02,'1','Problema no Cabo VGA');
 
    const request = new sql.Request()
    request.bulk(table)
           .then(result => console.log('Tabela Criada'))
           .catch(err => console.log('erro no bulk. ' + err));
}