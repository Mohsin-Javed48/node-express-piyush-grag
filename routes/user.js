const express = require('express');
const {
  handleAllUsers,
  getUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require('../controllers/user');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.route('/').get(handleAllUsers).post(handleCreateNewUser);

router
  .route('/:id')
  .get(getUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;

// Middlewares
