const Hapi = require('@hapi/hapi');
const { promisify } = require('util');
const { boat } = require('./model');

const read = promisify(boat.read);
const del = promisify(boat.del);

(async () => {
  const server = Hapi.server({
    port: process.env.PORT,
  });

  server.route([
    {
      method: 'GET',
      path: '/boat/{id}',
      handler: async (request, h) => {
        const { id } = request.params;

        try {
          return await read(id);
        } catch (error) {
          if (error.message === 'not found') {
            return h.response({ message: error.message }).code(404);
          }
          throw error;
        }
      },
    },
    {
      method: 'DELETE',
      path: '/boat/{id}',
      handler: async (request, h) => {
        const { id } = request.params;

        try {
          await del(id);
          return h.response().code(204);
        } catch (error) {
          const { message } = error;

          if (message === 'not found') {
            return h.response({ message }).code(404);
          }

          throw error;
        }
      },
    },
  ]);

  await server.start();
})();
