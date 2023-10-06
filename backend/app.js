require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const router = require('./routers/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());
app.use(limiter);
app.use(helmet());

app.use(requestLogger);

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use((req, res, next) => {
  if (req.cookies.jwt) {
    req.headers.authorization = `Bearer ${req.cookies.jwt}`;
  }
  next();
});
app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Полёт нормальный');
});
