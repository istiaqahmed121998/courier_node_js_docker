const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = async (sequelize) => {
    const db = {};
    fs.readdirSync(__dirname)
        // eslint-disable-next-line implicit-arrow-linebreak
        .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
        .forEach((file) => {
            const model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        });

    Object.keys(db).forEach((modelName) => {
        if ('associate' in db[modelName]) {
            db[modelName].associate(db);
        }
    });

    // Is asynchronous but we won't wait here
    await sequelize.sync();

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
};
