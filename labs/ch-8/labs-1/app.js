const Hapi = require('@hapi/hapi');
const H2o2 = require('@hapi/h2o2');

(async () => {
  const server = Hapi.server({
    port: process.env.PORT,
  });

  await server.register(H2o2);

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      const { url } = request.query;

      if (!url) {
        return h.response({ message: 'bad request' }).code(400);
      }

      try {
        const parsedUrl = new URL(url).toString();
        return h.proxy({ uri: parsedUrl, passThrough: true });
      } catch (error) {
        return h.response({ message: 'bad request ' }).code(400);
      }
    },
  });

  await server.start();
})();
