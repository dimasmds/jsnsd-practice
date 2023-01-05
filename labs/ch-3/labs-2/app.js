const Fastify = require('fastify');

(async () => {
  const app = Fastify();

  app.route({
    method: 'GET',
    url: '/',
    handler: async () => 'this is an example',
  });

  app.route({
    method: 'POST',
    url: '/',
    handler: async (request, reply) => {
      reply.code(405);
      return 'Method Not Allowed';
    },
  });

  await app.listen({ port: 3000 });
})();
