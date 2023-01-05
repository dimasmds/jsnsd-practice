const Fastify = require('fastify');
const data = require('./data');

(async () => {
  const app = Fastify();

  app.route({
    method: 'GET',
    url: '/',
    handler: async () => data(),
  });

  app.setNotFoundHandler((request, reply) => {
    reply.code(404).send({ error: 'Not found' });
  });

  await app.listen({ port: 3000 });
})();
