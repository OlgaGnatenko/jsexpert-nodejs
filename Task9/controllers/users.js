const currentUser = require('../mock/user');

const getCurrentUser = (req, res) => {
    currentUser ? res.status(200).send(currentUser) : res.status('500').json(new Error('User not found'));
}; 

const getLoginPage = function(req, res) {
    res.render('login');
};

module.exports = {
    getCurrentUser,
    getLoginPage
}


