const Hapi = require('@hapi/hapi');
const { promisify } = require('util');
const { boat } = require('./model');

const { uid } = boat;
const create = promisify(boat.create);
const read = promisify(boat.read);

(async () => {
  const server = Hapi.server({
    port: process.env.PORT,
  });

  server.route([
    {
      method: 'POST',
      path: '/boat',
      handler: async (request, h) => {
        const { data } = request.payload;
        const id = uid();
        await create(id, data);
        return h.response({ id }).code(201);
      },
    },
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
  ]);

  await server.start();
})();
