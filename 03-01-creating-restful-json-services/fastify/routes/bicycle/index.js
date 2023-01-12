const { promisify } = require('util');
const { bicycle } = require('../../model');

const read = promisify(bicycle.read);

module.exports = async (fastify) => {
  fastify.get('/:id', async (request) => {
    const { id } = request.params;
    const { notFound } = fastify.httpErrors;

    try {
      return await read(id);
    } catch (error) {
      if (error.message === 'not found') {
        throw notFound();
      }
      throw error;
    }
  });
};
