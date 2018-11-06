var express = require('express');
var router = express.Router();

/* GET docs*/
router.get('/', function (req, res, next) {
  res.render('docs', { pageTitle: 'Documentation', activePage: 'docs' });
});

module.exports = router;
