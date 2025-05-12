const { User } = require('../models');

const createUser = async (req, res) => {
  try {
    const user = new User({ username: req.body.username });
    await user.save();
    res.status(201).send(user.getSpecificFields());
  } catch (error) {
    console.log('err', error);
    res.status(400).send(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select(['_id', 'username']);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  getUsers
};
