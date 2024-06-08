const User = require('../model/user');

const showLoginPage = (req, res) => {
  res.render('login');
};

const login = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.getByLogin(login);
    if (user && user.password === password) {
      req.session.user = user;
      res.redirect('/');
    } else {
      res.status(401).render('login', { error: 'Invalid login or password' });
    }
  } catch (error) {
    res.status(500).render('login', { error: error.message });
  }
};

const showRegisterPage = (req, res) => {
  res.render('register');
};

const register = async (req, res) => {
  try {
    const { login, password } = req.body;
    await User.create({ login, password });
    res.redirect('/auth/login');
  } catch (error) {
    res.status(500).render('register', { error: error.message });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

module.exports = {
  showLoginPage,
  login,
  showRegisterPage,
  register,
  logout
};