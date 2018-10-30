var express = require('express');
var router = express.Router();

const handlers = require('../src/list-handlers');
const { NOT_FOUND, GET_SUCCESS } = require('../src/constants');


/* GET lists */
router.get('/', function(req, res) {
  const list = handlers.getList();
  list ? res.status(GET_SUCCESS).send(list) : res.status(NOT_FOUND).send({error: 'Data list is not available'});
});

router.get('/:id', function(req, res) {
  const { id } = req.params;
  const item = handlers.getListItemById(id);
  console.log(id, item, req.params);
  const isItemValid = item && item.length > 0;
  isItemValid ? res.status(GET_SUCCESS).send(item[0]) : res.status(NOT_FOUND).send({error: `There is no list item with id: ${id}`});
});

module.exports = router;
