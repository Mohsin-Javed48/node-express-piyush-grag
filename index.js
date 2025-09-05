const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8000;
const users = require('./MOCK_DATA.json');

app.use(express.urlencoded({ extended: true }));
app.get('/users', (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
    console.log(err);
  });
  console.log(req.body);
  res.json({ status: 'pending', id:  });
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


<h1 className=" flex justify-content"></h1>
