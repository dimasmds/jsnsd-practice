const Hapi = require('@hapi/hapi');
const got = require('got');

const {
  BOAT_SERVICE_PORT,
  BRAND_SERVICE_PORT,
} = process.env;

const boatService = `http://localhost:${BOAT_SERVICE_PORT}`;
const brandService = `http://localhost:${BRAND_SERVICE_PORT}`;

const gotOptions = {
  timeout: 500,
  retry: 0,
};

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
          const boat = await got(`${boatService}/${id}`, gotOptions).json();
          const brand = await got(`${brandService}/${boat.brand}`, gotOptions).json();

          return {
            id: boat.id,
            color: boat.color,
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
