const express = require('express');
const { handleAllUsers } = require('../controllers/user');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.get('/', handleAllUsers);

router
  .route('/:id')
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //Update user with Id
    return res.status({ status: 200 });
  })
  .delete((req, res) => {
    //Delete user with Id
  });

router.post('/api', (req, res) => {
  const body = req.body;
  if (!body.email) {
    res.status(404).json({ message: 'User not Found' });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
    if (err) {
      console.log('ERROR', err);
    }
  });
  // console.log(req.body);
  res.json({ status: 'pending', users });
});

module.exports = router;

// Middlewares
