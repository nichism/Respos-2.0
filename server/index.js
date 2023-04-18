require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Connected to database"));

app.use(express.json());

const taskRouter = require('../routes/tasks')
const userRouter = require('../routes/users')
const supplyRouter = require('../routes/supplies');
app.use('/tasks', taskRouter);
app.use('/users', userRouter);
app.use('/users', supplyRouter);

app.listen(3000, () => console.log('Server started'));

