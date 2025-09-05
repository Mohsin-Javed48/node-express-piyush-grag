const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8000;

const users = fs.readFileSync('MOCK_DATA.json', 'utf8');
app.get('/users', (req, res) => {
  return res.json(users);
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
