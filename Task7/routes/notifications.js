var express = require('express');
var router = express.Router();

/* GET notifications */
router.get('/', function (req, res, next) {
  res.render('notifications', { pageTitle: 'Notifications', activePage: 'notifications' });
});

module.exports = router;
