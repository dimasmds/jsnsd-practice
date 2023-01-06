const path = require('path');
const AutoLoad = require('@fastify/autoload');
const pointOfView = require('point-of-view');
const handlebars = require('handlebars');

module.exports = async (fastify, opts) => {
  fastify.register(pointOfView, {
    engine: { handlebars },
    templates: path.join(__dirname, 'views'),
    layout: 'layout.hbs',
  });

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
