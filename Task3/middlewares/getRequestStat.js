const getRequestStat = (req, res, next) => {
    const reqStat = {};
    reqStat.queryString = { ...req.query };
    reqStat.pathVariables = { ...req.params };
    console.log(`Request ${req.originalUrl} details: ${JSON.stringify(reqStat)}`);
    next();
}

module.exports = {
    getRequestStat
};
