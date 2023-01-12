const Hapi = require('@hapi/hapi');
const hnLatestStream = require('hn-latest-stream');
const { Readable } = require('stream');

class ResponseStream extends Readable {
  // eslint-disable-next-line class-methods-use-this,no-underscore-dangle,no-unused-vars
  _read(size) {}
}

(async () => {
  const server = Hapi.server({
    port: 3000,
    debug: {
      request: ['error'],
    },
  });

  server.route({
    method: 'GET',
    path: '/articles',
    handler: (request, h) => {
      const { amount = 10, type = 'html' } = request.query;
      const stream = hnLatestStream(amount, type);
      const readable = new ResponseStream();

      stream.on('data', (chunk) => {
        readable.push(chunk, 'binary');
      });

      stream.on('end', () => {
        readable.push(null);
      });

      const response = h.response(readable);
      response.header('Content-Type', type === 'json' ? 'application/json' : 'text/html');
      return response;
    },
  });

  await server.start();
})();
