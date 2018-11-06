const { rndIntInRange } = require('../src/helpers');
const { MAX_DELAY, MIN_DELAY } = require('../src/constants');

const delay = (req, res, next) => {
    const delay = rndIntInRange(MIN_DELAY, MAX_DELAY);
    console.log("running middleware to delay", delay);
    setTimeout(next, delay);
};

module.exports = {
    delay
};
