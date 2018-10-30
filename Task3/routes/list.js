var express = require('express');
var router = express.Router();

const { getList, getListItemById } = require('../src/list-handlers');
const { rndIntInRange } = require('../src/helpers');

const { NOT_FOUND, GET_SUCCESS, MAX_DELAY, MIN_DELAY } = require('../src/constants');

/* DELAY */
router.use((req, res, next) => {
  const delay = rndIntInRange(MIN_DELAY, MAX_DELAY);
  // console.log("running middleware to delay", delay);
  setTimeout(next, delay);
});

// start measuring time
router.use((req, res, next) => {
  req.start = process.hrtime();
  console.log("Applied middleware1: ", req.originalUrl, req.start);
  next();
});

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
router.use((req, res, next) => {
  console.log("Applied middleware2: ", req.originalUrl, req.start);
  const elapsed = process.hrtime(req.start);
  const elapsedMs = elapsed[0] * 1000 + elapsed[1] / 1000000;
  console.log(`Request: ${req.originalUrl} took ${elapsedMs} ms`);
  next();
});

module.exports = router;
