const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors')
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const createGame = require('./gameLogic');

require('dotenv').config();

const errors = require('./error');

const app = express();

app.enable('trust proxy');
app.use(helmet());
app.use(cors());

app.use(morgan('tiny'));
app.use(express.json());

app.options('*', cors())

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50,
  delayMs: 500,
});

app.use(speedLimiter);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.set('Access-Control-Allow-Credentials', 'true')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.set('Access-Control-Allow-Origin', '*')
  next();
})

app.post('/', async (req, res, next) => {
  const games = await createGame(req.body);
  console.log(games);
  res.json(games);
});

app.use(errors.notFound);
app.use(errors.errorHandler);

module.exports = app;
