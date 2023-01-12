const Hapi = require('@hapi/hapi');
const { bicycle } = require('./model');

(async () => {
  const server = Hapi.server({
    port: 3000,
  });

  server.route({
    method: 'GET',
    path: '/bicycle/{id}',
    handler: (request, h) => {
      const { id } = request.params;

      return new Promise((resolve) => {
        bicycle.read(id, (error, data) => {
          if (error) {
            const response = h.response({ message: error.message });

            if (error === 'not found') {
              resolve(response.code(404));
            }

            resolve(response.code(400));
          }

          return resolve(data);
        });
      });
    },
  });

  await server.start();
})();
