// Importação dos modulos necessarios:
const http = require('http');
const url  = require('url');
const fs   = require('fs');

// Criar o Server:
const server = http.createServer((req, res) =>{

    // Implementação de libs necessarias para trabalhar com URL/URI:
    const reqUrl = url.parse(req.url, true); // Analise da URL
    const path   = reqUrl.pathname;          // Analise do conteudo do caminho
    const query  = reqUrl.query;             // Analise das variaveis pela URL

    // Criação dos EndPoints (Rotas):
    if(path == "/"){
        // Caso o endpoint for "/" - executa esse bloco:
        fs.readFile('index.html', 'utf-8', (err, data) => {
            if(err){
                res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
                res.end("500 - Erro interno do servidor ... ");
            }else{
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                res.end(data);
            }
        });
    }else if(path == "/pdf"){
        // Caso o endpoint for "/pdf" - executa esse bloco: 
        fs.readFile('./arquivos/arquivo.pdf', (err, data) => {
            if(err){
                res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
                res.end("500 - Erro interno do servidor ... ");
            }else{
                res.writeHead(200, {'Content-Type':'application/pdf'});
                res.end(data);
            }
        });
    } else if (path == "/imc"){

        // Variavies para o endpoint 'imc':
        //const nome   = query.n;
        const peso   = parseFloat(query.p);
        const altura = parseFloat(query.a);

        // Processo Informação no back-end:
        if(isNaN(peso) || isNaN(altura)){
            // Caso variaveis não estejam corretas:
            res.writeHead(400, {'Content-Type':'text/plain; charset=utf-8'});
            res.end("400 - Os valores devem ter conteudos validos ...");
        }else{
            // Caso variaveis estejam corretas:
            const imc = peso/(altura*altura);

            // Classificação do imc:
            if(imc < 18.5){
                // Abaixo do Peso:
                fs.readFile('./abaixopeso.html', 'utf-8', (err, data) => {
                    if(err){
                        res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
                        res.end("500 - Erro interno do servidor ... ");
                    }else{
                        data = data.replace(`{imc}`, imc.toFixed(1));
                        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                        res.end(data);
                    }
                })
            }else if(imc < 24.9){
                // Peso Normal:
                fs.readFile('./pesonormal.html', 'utf-8', (err, data) =>{
                    if(err){
                        res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
                        res.end("500 - Erro interno do Servidor ...");
                    }else{
                        data = data.replace(`{imc}`, imc.toFixed(1));
                        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                        res.end(data);
                    }
                })
            }else if(imc < 29.9){
                // Sobre Peso:
                fs.readFile('./sobrepeso.html', 'utf-8', (err, data) =>{
                    if(err){
                        res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
                        res.end("500 - Erro interno do Servidor ...");
                    }else{
                        data = data.replace(`{imc}`, imc.toFixed(1));
                        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                        res.end(data);
                    }
                })
            }else if(imc < 39.9){
                // Obesidade 1:
                fs.readFile('./obesidade.html', 'utf-8', (err, data) =>{
                    if(err){
                        res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
                        res.end("500 - Erro interno do Servidor ...");
                    }else{
                        data = data.replace(`{imc}`, imc.toFixed(1));
                        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                        res.end(data);
                    }
                })
            }else{
                // Obesidade Grave:
                fs.readFile('./obesidadegrave.html', 'utf-8', (err, data) =>{
                    if(err){
                        res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
                        res.end("500 - Erro interno do Servidor ...");
                    }else{
                        data = data.replace(`{imc}`, imc.toFixed(1));
                        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                        res.end(data);
                    }
                })
            }
        }

    } else {
        // "Status Code 404"
        res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
        res.end("404 - Rota não encontrada ... ");
    }
});

// Configuração do Server:
// Atribui a porta como 3000 do servidor:
const PORT = 3000;

// Inicia o listen e envia uma msg ao usuario no terminal:
server.listen(PORT, () => {
    console.log(`[OK] Servidor 'localhost' iniciado na porta: ${PORT} ...`);
});