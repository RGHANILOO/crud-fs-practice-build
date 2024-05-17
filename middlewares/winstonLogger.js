const winston = require('winston');
// const expressWinston = require('express-winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
})

logger.info('Logger initialized');

