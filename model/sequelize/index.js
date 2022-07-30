/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const db = {};
    fs.readdirSync(__dirname)
        // eslint-disable-next-line implicit-arrow-linebreak
        .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
        .forEach((file) => {
            // eslint-disable-next-line global-require
            const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        });

    Object.keys(db).forEach((modelName) => {
        if ('associate' in db[modelName]) {
            db[modelName].associate(db);
        }
    });

    // Is asynchronous but we won't wait here
    sequelize.sync();

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
};
