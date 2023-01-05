/* eslint-disable */
const { test } = require('tap');
const { build } = require('../helper');

test('hello is loaded', async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: '/example',
  });
  t.equal(res.payload, 'this is an hello');
});

// inject callback style:
//
// test('hello is loaded', (t) => {
//   t.plan(2)
//   const app = build(t)
//
//   app.inject({
//     url: '/hello'
//   }, (err, res) => {
//     t.error(err)
//     t.equal(res.payload, 'this is an hello')
//   })
// })
