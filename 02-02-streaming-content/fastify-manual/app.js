const Fastify = require('fastify');
const hnLatestStream = require('hn-latest-stream');

(async () => {
  const app = Fastify();

  app.route({
    method: 'GET',
    url: '/articles',
    handler: async (request, reply) => {
      const { amount = 10, type = 'html' } = request.query;

      if (type === 'html') {
        reply.type('text/html');
      }

      if (type === 'json') {
        reply.type('application/json');
      }

      return hnLatestStream(amount, type);
    },
  });
  await app.listen({ port: 3000 });
})();
