const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const connectMongoDb = require('./connection');
const logReqRes = require('./middlewares');

app.use(logReqRes('log.txt'));

connectMongoDb('mongodb://localhost:27017/piyush-garg-Mongodb-app').then(() => {
  console.log('MongoDB Connected');
});

const userRouter = require('./routes/user');

app.use('/api/users', userRouter);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
