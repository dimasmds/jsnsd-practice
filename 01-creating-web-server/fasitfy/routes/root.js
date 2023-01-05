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

module.exports = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    reply.type('text/html');
    return root;
  });
};
