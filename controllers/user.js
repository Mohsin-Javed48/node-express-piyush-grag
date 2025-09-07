const User = require('../models/user');

async function handleAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function getUserById(req, res) {
  const user = await user.findById(req.params.id);
  if (!user) return res.status(404).send('No user found');
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: 'changed' });
  return res.json({ status: 'Success' });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: 'Success' });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  console.log(req.body);
  if (
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
  ) {
    res.status(404).json({ message: 'User not Found' });
  }

  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });

  return res
    .status(200)
    .json({ message: 'User created successfully', id: result._id });
}

module.exports = {
  handleAllUsers,
  getUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
