const Hapi = require('@hapi/hapi');
const got = require('got');

const {
  BICYCLE_SERVICE_PORT = 4000,
  BRAND_SERVICE_PORT = 5000,
} = process.env;

const bicycleService = `http://localhost:${BICYCLE_SERVICE_PORT}`;
const brandService = `http://localhost:${BRAND_SERVICE_PORT}`;

(async () => {
  const server = Hapi.server({
    port: process.env.PORT,
  });

  server.route([
    {
      method: 'GET',
      path: '/{id}',
      handler: async (request, h) => {
        const { id } = request.params;

        try {
          const [bicycle, brand] = await Promise.all([
            got(`${bicycleService}/${id}`).json(),
            got(`${brandService}/${id}`).json(),
          ]);

          return {
            id: bicycle.id,
            color: bicycle.color,
            brand: brand.name,
          };
        } catch (error) {
          if (!error.response) throw error;
          if (error.response.statusCode === 400) {
            return h.response({ message: 'bad request' }).code(400);
          }
          if (error.response.statusCode === 404) {
            return h.response({ message: 'not found' }).code(404);
          }

          throw error;
        }
      },
    },
  ]);

  await server.start();
})();
