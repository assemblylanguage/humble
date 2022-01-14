/**
 * The logger used to log actions that occur during the archiving process.
 */

import * as chalk from 'chalk';
import * as winston from 'winston';

/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-inferrable-types */

/**
 * A logger used throughout Humble to log messages.
 */
export const logger = winston.createLogger({
  levels: {
    info: 0,
    ok: 1,
    warn: 2,
    error: 3,
    debug: 4,
  },
  level: 'ok',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf((info) => {
      // Getting all of the information passed into the logger.
      const level: string = info.level;
      const message: string = info.message;
      const timestamp: string = info.timestamp;
      const depth: number = info.depth ?? 0;

      // Creating the log from the information.
      const log: string = `${depth === 0 ? '' : '  '.repeat(depth) + '└──'}[ ${level.toUpperCase()} ] ${timestamp}: ${message}`;

      // Displaying the log in different colors to the console depending on the
      // log level.
      switch (level) {
        case 'info': {
          return log;
        }

        case 'ok': {
          return chalk.stderr.greenBright(log);
        }

        case 'warn': {
          return chalk.stderr.yellowBright(log);
        }

        case 'error': {
          return chalk.stderr.redBright(log);
        }

        default: {
          return log;
        }
      }
    }),
  ),
  transports: [
    new winston.transports.Console({
      level: 'ok',
      stderrLevels: [
        'info',
        'ok',
        'warn',
        'error',
        'debug',
      ],
    }),
  ],
});
