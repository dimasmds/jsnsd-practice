const http = require('http');
const url = require('url');

const { STATUS_CODES } = http;

const PORT = process.env.PORT || 3000;

const hello = `
  <html lang="en">
    <head>
      <title>Hello World</title>
      <style>
        body { background: #333; margin: 1.25rem }
        h1 { color: #EEE; font-family: sans-serif }
      </style>
    </head>
    <body>
      <h1>Hello World</h1>
    </body>
  </html>
`;

const root = `
  <html lang="en">
    <head>
      <title>Root</title>
      <style>
        body { background: #333; margin: 1.25rem }
        h1 { color: #EEE; font-family: sans-serif }
      </style>
    </head>
    <body>
      <a href="/hello">Hello</a>
    </body>
  </html>
      
`;

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });

  if (request.method !== 'GET') {
    response.statusCode = 405;
    response.end(`${STATUS_CODES[response.statusCode]}\r\n`);
    return;
  }

  const { pathname } = url.parse(request.url);

  if (pathname === '/') {
    response.end(root);
    return;
  }

  if (pathname === '/hello') {
    response.end(hello);
    return;
  }

  response.statusCode = 404;
  response.end(`${STATUS_CODES[response.statusCode]}\r\n`);
});

server.listen(PORT);
