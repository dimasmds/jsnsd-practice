const Hapi = require('@hapi/hapi');
const { promisify } = require('util');
const { bicycle } = require('./model');

const create = promisify(bicycle.create);
const read = promisify(bicycle.read);
const update = promisify(bicycle.update);
const del = promisify(bicycle.del);

const { uid } = bicycle;

(async () => {
  const server = Hapi.server({
    port: 3000,
    debug: {
      log: ['error'],
    },
  });

  server.route({
    method: 'POST',
    path: '/bicycle',
    handler: async (request, h) => {
      const { data } = request.payload;
      const id = uid();
      await create(id, data);
      const response = h.response({
        id,
      });
      response.code(201);
      return response;
    },
  });

  server.route({
    method: 'POST',
    path: '/bicycle/{id}',
    handler: async (request, h) => {
      const { id } = request.params;
      const { data } = request.payload;

      try {
        await update(id, data);
        const response = h.response();
        response.code(204);
        return response;
      } catch (error) {
        if (error.message === 'not found') {
          const response = h.response({
            message: error.message,
          });
          response.code(404);
          return response;
        }

        throw error;
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/bicycle/{id}',
    handler: async (request, h) => {
      const { id } = request.params;

      try {
        return await read(id);
      } catch (error) {
        if (error.message === 'not found') {
          const response = h.response({ message: error.message });
          response.code(404);
          return response;
        }

        throw error;
      }
    },
  });

  server.route({
    method: 'PUT',
    path: '/bicycle/{id}',
    handler: async (request, h) => {
      const { id } = request.params;
      const { data } = request.payload;

      try {
        await create(id, data);
        const response = h.response({ id });
        response.code(201);
        return response;
      } catch (error) {
        if (error.message === 'resource exists') {
          await update(id, data);
          const response = h.response();
          response.code(204);
          return response;
        }

        throw error;
      }
    },
  });

  server.route({
    method: 'DELETE',
    path: '/bicycle/{id}',
    handler: async (request, h) => {
      const { id } = request.params;

      try {
        await del(id);
        const response = h.response();
        response.code(204);
        return response;
      } catch (error) {
        if (error.message === 'not found') {
          const response = h.response({
            message: error.message,
          });
          response.code(404);
          return response;
        }

        throw error;
      }
    },
  });

  await server.start();
})();
