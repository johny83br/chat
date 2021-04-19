import express from "express";
import bodyParser from 'body-parser';

const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

/**
 * GET = Buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Deletar
 * PATCH = Alterar uma informação específica
 */

app.get("/", (request, response) => {
  return response.json({
    message: "Olá NLW 05"
  });
});

app.post("/", (request, response) => {
  return response.json({
    message: "Usuário salvo com sucesso!"
  });
});

app.listen(3333, () => console.log("Server is running on port 3333"));