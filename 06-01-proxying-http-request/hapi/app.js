const Hapi = require('@hapi/hapi');
const H2o2 = require('@hapi/h2o2');
const { Readable } = require('stream');

async function* upper(response) {
  // eslint-disable-next-line no-restricted-syntax
  for await (const chunk of response) {
    yield chunk.toString().toUpperCase();
  }
}

(async () => {
  const server = Hapi.server({
    port: 3000,
  });

  await server.register(H2o2);

  // multiple route proxy
  server.route({
    method: 'GET',
    path: '/{params*}',
    handler: (request, h) => {
      const { params } = request.params;
      const { token } = request.query;

      if (!token) {
        return h.response({ message: 'Unauthorized' }).code(401);
      }

      if (token !== 'abc') {
        return h.response({ message: 'Unauthorized' }).code(401);
      }

      const uri = `https://news.ycombinator.com/${params}`;

      return h.proxy({
        uri,
        passThrough: true,
      });
    },
  });

  // single route proxy
  // server.route({
  //   method: 'GET',
  //   path: '/',
  //   handler: async (request, h) => {
  //     const { url } = request.query;
  //
  //     try {
  //       const parsedUrlString = new URL(url).toString();
  //       return h.proxy({
  //         uri: parsedUrlString,
  //         onResponse: (
  //           _,
  //           originalResponse,
  //           originalRequest,
  //           _h,
  //         ) => {
  //           const response = _h.response(
  //             Readable.from(upper(originalResponse), { objectMode: false }),
  //           );
  //           response.headers = originalResponse.headers;
  //           return response;
  //         },
  //       });
  //     } catch (error) {
  //       return h.response({ message: 'bad request' }).code(400);
  //     }
  //   },
  // });

  await server.start();
  console.log(`server start at ${server.info.uri}`);
})();
