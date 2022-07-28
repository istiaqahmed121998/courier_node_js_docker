const { Sequelize } = require('sequelize');
const { HOST, USER, PASSWORD, DB, dialect, pool } = require('../config/db.config');

const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect,
    pool,
});
const connectWithRetry = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        setTimeout(connectWithRetry, 5000);
    }
};

module.exports = {
    sequelize,
    connectWithRetry,
};
