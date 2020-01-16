const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const sql = require('mssql');
const connStr = "Server=localhost;Database=projeto;User Id=sa;Password=senhabanco;";


//fazendo a conexão global
sql.connect(connStr)
   .then(conn => GLOBAL.conn = conn)
   .catch(err => console.log(err));


//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

router.get('/chamados/:numero?', (req, res) =>{
    let filter = '';
    if(req.params.numero) filter = ' WHERE NUMERO=' + parseInt(req.params.numero);
    execSQLQuery('SELECT * FROM Chamados' + filter, res);
})

router.get('/chamados', (req, res) =>{
    execSQLQuery('SELECT * FROM chamados', res);
})
router.get('/maior', (req, res) =>{
    execSQLQuery('SELECT MAX(NUMERO) as NUMERO FROM chamados', res);
})

router.get('/chamados/abertos/:numero?', (req, res) =>{
    let filter = '';
    if(req.params.numero) filter = ' WHERE STATUS=' + parseInt(req.params.numero);
    execSQLQuery('SELECT * FROM Chamados' + filter, res);
})


router.delete('/chamados/:numero', (req, res) =>{
    execSQLQuery('DELETE chamados WHERE NUMERO=' + parseInt(req.params.numero), res);
})



router.patch('/chamados/:numero', (req, res) =>{
    const numero = parseInt(req.body.numero);
    const status = parseInt(req.body.status);
    execSQLQuery(`UPDATE chamados SET STATUS=${status} WHERE NUMERO=${numero}`, res);
})


router.post('/chamados', (req, res) =>{

    const numero = parseInt(req.body.numero);
    const nome = req.body.nome.substring(0,150);
    const ra = parseInt(req.body.ra);
    const predio = req.body.predio.substring(0,150);
    const sala = parseInt(req.body.sala);
    const maquina = parseInt(req.body.maquina);
    const status = parseInt(req.body.status);
    const descricao = req.body.descricao.substring(0,600);

    
    	execSQLQuery(`INSERT INTO Chamados(NUMERO, NOME, RA, PREDIO, SALA, MAQUINA, STATUS, DESCRICAO) VALUES(${numero},'${nome}',${ra},'${predio}', ${sala}, ${maquina}, ${status}, '${descricao}')`, res);
})




//inicia o servidor
app.listen(port);
console.log('API funcionando!');



function execSQLQuery(sqlQry, res){
    GLOBAL.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}