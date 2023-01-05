const Fastify = require('fastify');

(async () => {
  const app = Fastify();

  app.route({
    method: 'GET',
    url: '/',
    handler: async (request, reply) => {
      const root = `
          <html lang="en">
            <head>
              <title>Root</title>
              <style>
                body { background: #333; margin: 1.25rem }
                a { color: yellow; font-size: 2rem; font-family: sans-serif }
              </style>
            </head>
            <body>
              <a href="/hello">Hello</a>
            </body>
          </html>
      `;

      reply.type('text/html');
      return root;
    },
  });

  app.route({
    method: 'GET',
    url: '/hello',
    handler: async (request, reply) => {
      const hello = `
        <html lang="en">
          <head>
            <title>Hello World</title>
            <style>
              body { background: #333; margin: 1.25rem }
              h1 { color: #EEE; font-family: sans-serif }
            </style>
          </head>
          <body>
            <h1>Hello World</h1>
          </body>
        </html>
      `;

      reply.type('text/html');
      return hello;
    },
  });

  app.setNotFoundHandler((request, reply) => {
    if (request.method !== 'GET') {
      reply.code(405);
      reply.send('Method Not Allowed');
      return;
    }

    reply.code(404);
    reply.send('Not Found');
  });

  try {
    await app.listen({ port: 3000 });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
})();
