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

module.exports = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    reply.type('text/html');
    return hello;
  });
};
