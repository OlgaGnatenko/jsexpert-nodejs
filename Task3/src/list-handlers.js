const data = require('../assets/list.json');

const getList = () => {
    return data;    
};

const getListItemById = (id) => {
    return data.filter((item) => { return item.id === parseInt(id); });
};

module.exports = {
    getList,
    getListItemById
};

