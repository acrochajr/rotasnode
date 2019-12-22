var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
const atendeRequisicao = url => {
  console.log(url);
  switch (url) {
    case '/artigo':
      const artigo = path.join(__dirname + '/public/artigos.html');
      return artigo;

    case '/':
      const raiz = path.join(__dirname + '/public/artigos.html');
      return raiz;

    case '/contato':
      const contato = path.join(__dirname + '/public/contato.html');
      return contato;

    default:
      const erro = path.join(__dirname + '/public/erro.html');
      return erro;
  }
};

var server = http.createServer((request, response) => {
  let pathurl = url.parse(request.url, true);
  console.log('server aqui', pathurl);
  let pagina = atendeRequisicao(pathurl.pathname);

  console.log('pagina', pagina);

  fs.readFile(pagina, (err, html) => {
    response.writeHeader(200, {'Content-Type': 'text/html'});
    response.end(html);

    if (err) throw err;
    console.log(html.toString());
  });
});

var ativo = () => {
  console.log('servidor ativo');
};
server.listen(3000, ativo);
