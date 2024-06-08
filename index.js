const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const knex = require('./configuration/database');

const personRoutes = require('./route/people');
const carRoutes = require('./route/cars');
const userRoutes = require('./route/users');
const authRoutes = require('./route/auth');

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { auth, authorize } = require('./middlewares/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/people', auth, personRoutes);
app.use('/cars', auth, carRoutes);
app.use('/users', auth, authorize('admin'), userRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});