/* eslint-disable */
module.exports = async function (fastify, opts) {
  fastify.get('/', async (request, reply) => ({ root: true }));
};
