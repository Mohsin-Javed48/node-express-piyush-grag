const User = require('../models/user');
async function handleAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

module.exports = handleAllUsers;
