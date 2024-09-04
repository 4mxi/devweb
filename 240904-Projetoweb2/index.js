// Importação:
const express = require('express');
const fs = require('fs');
const path = require('path');

// Cria a rota:
const router = express();  

// Cria a rota "/":
router.get('/',(req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) =>{
        if(err){
            res.status(500).send("500 - Erro Interno do servidor. ")
        }else{
            res.status(200).type('text/html').send(data);
        }
    });
});

// Cria a rota '/rota1':
router.get('/rota1',(req, res) => {
    let nome1 = req.query.nome;
    let nome2 = process.env.AUTOR;
    let num1 = parseFloat(req.query.num1);
    let num2 = parseFloat(req.query.num2);
    let soma = num1 + num2;
    let resultado = soma.toString();

    res.send(nome1 + " - " + nome2 +" a soma =" + num1 + " + " + num2 + " = " + resultado)
});

// Cria a rota '/rota2':
router.get('/rota2',(req, res) => {
    res.send("Rota 2...");
});

// Exportação
module.exports = router;