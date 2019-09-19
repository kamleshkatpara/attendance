const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./routes/user.route');
const attendance = require('./routes/attendance.route');
const port = 3000;
const mongoose = require('mongoose');
const chalk = require('chalk');
const dburl = 'mongodb://root:test123@ds135107.mlab.com:35107/mydemodb';
const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const server = chalk.bold.red;

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(connected(`Mongoose connection is open to  ${dburl}`)))
    .catch((err) => console.log(error(`Mongoose connection has occured ${err} error`)));

mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/user', user);
app.use('/attendance', attendance);
app.get('/', (req, res) => res.send('Welcome to Attendance Application'));

app.listen(port, () => {
    console.log(server(`Server is running on ${port}`));
});