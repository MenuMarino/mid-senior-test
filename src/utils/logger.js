const winston = require('winston');
const { getId } = require('express-correlation-id');

class Logger {
  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          const correlationId = getId() || 'N/A';
          return `[${timestamp}] [${level.toUpperCase()}] [CID: ${correlationId}] ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console({
          silent: process.env.NODE_ENV === 'test',
        }),
      ],
    });

    // Ideally the logs should be stored in something like AWS Cloudwatch for easier filters/debugging
    if (process.env.NODE_ENV === 'production') {
      this.logger.add(
        new winston.transports.File({ filename: 'logs/app.log' })
      );
    }
  }

  log(level, message) {
    this.logger.log(level, message);
  }

  info(message) {
    this.log('info', message);
  }

  warn(message) {
    this.log('warn', message);
  }

  error(message) {
    this.log('error', message);
  }
}

module.exports = new Logger();
