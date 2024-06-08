const User = require('../model/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.render('users', { users, user: req.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    res.render('editUser', { user, user: req.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCreateUserPage = (req, res) => {
  res.render('createUser', { user: req.user });
};

const getEditUserPage = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    res.render('editUser', { user, user: req.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { login, password, role } = req.body;
    await User.create({ login, password, role });
    res.redirect('/users');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    await User.create({ login, password, role: 'user' });
    res.redirect('/auth/login');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { login, password, role } = req.body;
    await User.update(req.params.id, { login, password, role });
    res.redirect('/users');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.redirect('/users');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
};

const getLoginPage = (req, res) => {
  res.render('login');
};

const getRegisterPage = (req, res) => {
  res.render('register');
};

const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/auth/login');
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  getCreateUserPage,
  getEditUserPage,
  createUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getLoginPage,
  getRegisterPage,
  logoutUser
};