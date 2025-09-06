const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8000;
const users = require('./MOCK_DATA.json');

// Middlewares
app.use((req, res, next) => {
  fs.appendFile(
    'log.txt',
    `\n${Date.now()}: ${req.ip} ${req.method} :  ${req.path}\n`,
    (err) => {
      if (err) {
        console.log(err);
      }
      next();
    }
  );
});

app.use(express.urlencoded({ extended: true })); //built in middleware
app.get('/users', (req, res) => {
  res.setHeader('X-MyName', 'Mohsin Javed');
  return res.json(users);
});

app.get('/api/users', (req, res) => {
  const html = `
  <ul>
    ${users.map((user) => `<li>${user.first_name}: ${user.email}</li>`)}
</ul>`;

  return res.send(html);
});

app
  .route('/api/users/:id')
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

app.post('/api/users', (req, res) => {
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

// NO NEED AFTER app.route("/api/users/:id")
// app.patch('api/users', (req, res) => {
//   res.json({ status: 'pending' });
// });
//
// app.delete('api/users', (req, res) => {
//   res.json({ status: 'pending' });
// });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
