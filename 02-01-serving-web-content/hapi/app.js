const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const handlebars = require('handlebars');

(async () => {
  const server = Hapi.server({
    port: 3000,
  });

  await server.register(Vision);

  server.views({
    engines: { hbs: handlebars },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'layout',
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => h.view('index'),
    },
    {
      method: 'GET',
      path: '/hello',
      handler: (request, h) => {
        const { greeting = 'World' } = request.query;
        return h.view('hello', { greeting });
      },
    },
  ]);

  await server.start();
})();
