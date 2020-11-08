const app = require('./app');
require('dotenv').config();
let port;
let host;

process.env.NODE_ENV === 'production'
  ? ((port = process.env.PORT), (host = process.env.DOMAIN))
  : ((port = 4000), (host = 'http://localhost'));

app.listen(port, () => {
  console.log(`Listening at ${host}:${port}`);
});
