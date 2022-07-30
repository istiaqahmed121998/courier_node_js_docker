const Models = require('../model/sequelize/index');

module.exports = (_client) => {
    const models = Models(_client);
    const client = _client;

    return { models, client };
};
