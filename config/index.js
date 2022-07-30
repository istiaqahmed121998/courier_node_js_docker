require('dotenv').config();
const bunyan = require('bunyan');
// Load package.json
const pjs = require('../package.json');

// Get some meta info from the package.json
const { name, version } = pjs;

// Set up a logger
const getLogger = (serviceName, serviceVersion, level) =>
    bunyan.createLogger({
        name: `${serviceName}:${serviceVersion}`,
        level,
        streams: [
            {
                type: 'rotating-file',
                path: 'logs/app.log',
                period: '1d', // daily rotation
                count: 3, // keep 3 back copies
            },
        ],
    });
module.exports = {
    development: {
        name,
        version,
        serviceTimeout: 30,
        // eslint-disable-next-line implicit-arrow-linebreak
        log: () => getLogger(name, version, 'debug'),
        database: {
            HOST: 'mysql',
            USER: 'root',
            PASSWORD: 'mypassword',
            DB: 'testdb',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        },
    },
};
