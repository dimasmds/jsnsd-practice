const Fastify = require('fastify');
const path = require('path');
const view = require('@fastify/view');
const handlebars = require('handlebars');

const app = Fastify();

(async () => {
  app.register(view, {
    engine: { handlebars },
    templates: path.join(__dirname, 'views'),
    layout: 'layout.hbs',
  });

  app.route({
    method: 'GET',
    url: '/',
    handler: (request, reply) => reply.view('index.hbs'),
  });

  app.route({
    method: 'GET',
    url: '/hello',
    handler: (request, reply) => {
      const { greeting = 'hello' } = request.query;

      return reply.view('hello.hbs', { greeting });
    },
  });

  await app.listen({ port: 3000 });
})();
