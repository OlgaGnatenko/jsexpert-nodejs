const rndIntInRange = (min, max) => {
    const range = max - min;
    return Math.floor(Math.random() * range) + min;
};

module.exports = {
    rndIntInRange
};
