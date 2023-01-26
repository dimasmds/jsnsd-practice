const Hapi = require('@hapi/hapi');
const { boat } = require('./model');

(async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: process.env.PORT,
  });

  server.route([
    {
      method: 'GET',
      path: '/boat/{id}',
      handler: (request, h) => {
        const { id } = request.params;
        return new Promise((resolve) => {
          boat.read(id, (error, data) => {
            if (error) {
              const response = h.response({
                message: error.message,
              });

              if (error.message === 'not found') {
                response.code(404);
                return resolve(response);
              }

              response.code(500);
              return resolve(response);
            }

            return resolve(data);
          });
        });
      },
    },
  ]);

  await server.start();

  console.log(`server start at ${server.info.uri}`);
})();
