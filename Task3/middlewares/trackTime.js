const startTimeTracking = (req, res, next) => {
    req.start = process.hrtime();
    next();
};

const endTimeTracking = (req, res, next) => {
    const elapsed = process.hrtime(req.start);
    const elapsedMs = elapsed[0] * 1000 + (elapsed[1] / 1000000).toFixed(2);
    console.log(`Request: ${req.originalUrl} took ${elapsedMs} ms`);
};

module.exports = {
    startTimeTracking,
    endTimeTracking
};

