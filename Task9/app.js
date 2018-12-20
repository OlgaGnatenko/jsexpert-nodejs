const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const mongoose = require('./configs/mongo');

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const notificationsRouter = require('./routes/notifications');
const loginRouter = require('./routes/login');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');

const app = express();

app.set(path.join(__dirname, 'views'));
app.set("view engine", "hbs");
app.use(fileUpload({safeFileNames: true, preserveExtension: 10}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/notifications', notificationsRouter);
app.use('/login', loginRouter);
app.use('/api/posts', postsRouter);
app.use('/api/user', userRouter);

module.exports = app;
