const { Router } = require('express');

const router = Router();

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

router.get('/', (request, response) => {
  response.send(hello);
});

module.exports = router;
