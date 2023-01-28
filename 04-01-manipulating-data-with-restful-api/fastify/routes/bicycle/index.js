const { promisify } = require('util');
const { bicycle } = require('../../model');

const read = promisify(bicycle.read);
const create = promisify(bicycle.create);
const update = promisify(bicycle.update);
const del = promisify(bicycle.del);

const { uid } = bicycle;

module.exports = async (fastify) => {
  const { notFound } = fastify.httpErrors;

  fastify.post('/', async (request, reply) => {
    const { data } = request.body;
    const id = uid();
    await create(id, data);
    reply.code(201);
    return { id };
  });

  fastify.post('/:id/update', async (request, reply) => {
    const { id } = request.params;
    const { data } = request.body;

    try {
      await update(id, data);
      reply.code(204);
    } catch (error) {
      if (error.message === 'not found') throw notFound();
      throw error;
    }
  });

  fastify.get('/:id', async (request) => {
    const { id } = request.params;

    try {
      return await read(id);
    } catch (error) {
      if (error.message === 'not found') {
        throw notFound();
      }
      throw error;
    }
  });

  // eslint-disable-next-line consistent-return
  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params;
    const { data } = request.body;

    try {
      await create(id, data);
      reply.code(201);
      return {};
    } catch (error) {
      if (error.message === 'resource exists') {
        await update(id, data);
        reply.code(204);
      } else {
        throw error;
      }
    }
  });

  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      await del(id);
      reply.code(204);
    } catch (error) {
      if (error.message === 'not found') throw notFound();
      throw error;
    }
  });
};
