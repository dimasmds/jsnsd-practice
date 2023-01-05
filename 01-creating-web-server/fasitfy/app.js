const path = require('path');
const AutoLoad = require('@fastify/autoload');

module.exports = async (fastify, opts) => {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });

  fastify.setNotFoundHandler((request, reply) => {
    if (request.method !== 'GET') {
      reply.code(404).send({ error: 'Not found' });
      return 'Method not allowed';
    }

    return 'Not Found\n';
  });
};
