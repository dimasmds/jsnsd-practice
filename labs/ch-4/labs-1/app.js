const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const handlebars = require('handlebars');
const path = require('path');

(async () => {
  const server = Hapi.server({
    port: 3000,
  });

  await server.register(Vision);

  server.views({
    engines: { hbs: handlebars },
    path: path.join(__dirname, 'views'),
    layout: 'layout',
  });

  server.route({
    method: 'GET',
    path: '/me',
    handler: (request, h) => h.view('me'),
  });

  await server.start();
})();
