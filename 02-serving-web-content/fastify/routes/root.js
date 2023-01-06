module.exports = async (fastify) => {
  fastify.get('/', async (request, reply) => reply.view('index.hbs'));
};
