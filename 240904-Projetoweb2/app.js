// Importação das Libs:
const express = require('express');
const router = require('./index');

// Configuração Geral do Projeto:
const app = express();
app.use('/', router);

// Exportação:
module.exports = app;