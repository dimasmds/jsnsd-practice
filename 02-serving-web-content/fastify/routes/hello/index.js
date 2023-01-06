module.exports = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    const { greeting = 'Hello ' } = request.query;
    return reply.view('hello.hbs', { greeting });
  });
};
