const Hapi = require('@hapi/hapi');
const stream = require('./stream');

(async () => {
  const server = Hapi.server({
    port: 3000,
  });

  server.route({
    method: 'GET',
    path: '/data',
    handler: (request, h) => h.response(stream())
      .header('Content-Type', 'text/html'),
  });

  await server.start();
})();
