var express = require('express');
var router = express.Router();

/* GET docs*/
router.get('/', function (req, res, next) {
  res.render('login', { pageTitle: 'Login', activePage: 'login' });
});

module.exports = router;
