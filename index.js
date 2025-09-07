const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8000;
const users = require('./MOCK_DATA.json');
const { connectMongoDb } = require('./connection');
const { logReqRes } = require('./middlewares');

app.use(logReqRes('log.txt'));
connectMongoDb('mongodb://localhost:27017/piyush-garg-Mongodb-app');

const userRouter = require('./routes/user');
const mongoose = require('mongoose');
// NO NEED AFTER app.route("/api/users/:id")
// app.patch('api/users', (req, res) => {
//   res.json({ status: 'pending' });
// });
//
// app.delete('api/users', (req, res) => {
//   res.json({ status: 'pending' });
// });

app.use('/user', userRouter);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
