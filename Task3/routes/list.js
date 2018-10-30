var express = require('express');
var router = express.Router();

const { getList, getListItemById } = require('../src/list-handlers');
const { startTimeTracking, endTimeTracking } = require('../middlewares/trackTime');
const { delay } = require('../middlewares/delay');

const { NOT_FOUND, GET_SUCCESS } = require('../src/constants');

/* DELAY */
router.use(delay);

// start measuring time
router.use(startTimeTracking);

/* GET lists */
router.get('/', function (req, res, next) {
  const list = getList();
  list ? res.status(GET_SUCCESS).send(list) : res.status(NOT_FOUND).send({ error: 'Data list is not available' });
  next();
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  const item = getListItemById(id);
  const isItemValid = item && item.length > 0;
  isItemValid ? res.status(GET_SUCCESS).send(item[0]) : res.status(NOT_FOUND).send({ error: `There is no list item with id: ${id}` });
  next();
});

// end measuring time
router.use(endTimeTracking);

module.exports = router;
