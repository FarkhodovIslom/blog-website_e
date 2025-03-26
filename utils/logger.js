const winston = require('winston');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);


const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: customFormat,
  transports: [
    
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),

    
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
      maxsize: 5242880, 
      maxFiles: 5
    }),

    
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
      maxsize: 5242880, 
      maxFiles: 5
    })
  ]
});

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../logs/access.log'), 
    { flags: 'a' }
);
  

const httpLogger = morgan('combined', { 
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400  
});
  
  
function loggerMiddleware(req, res, next) {
    logger.info(`[${req.method}] ${req.path}`, {
      method: req.method,
      path: req.path,
      body: req.body,
      query: req.query,
      ip: req.ip
    });
    next();
}
  
module.exports = {
    logger,
    httpLogger,
    loggerMiddleware
};