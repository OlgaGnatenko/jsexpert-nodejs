const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const notificationsRouter = require('./routes/notifications');
const loginRouter = require('./routes/login');
// const apiRouter = require('./routes/api');
const postsRouter = require('./routes/posts');
const mongoose = require('./configs/mongo');


const app = express();

app.set(path.join(__dirname, 'views'));
app.set("view engine", "hbs");
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/notifications', notificationsRouter);
app.use('/login', loginRouter);
// app.use('/api', apiRouter);
app.use('/posts', postsRouter);

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.reror = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
