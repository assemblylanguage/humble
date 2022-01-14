"use strict";
/**
 * The logger used to log actions that occur during the archiving process.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk = require("chalk");
const winston = require("winston");
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/**
 * A logger used throughout Humble to log messages.
 */
exports.logger = winston.createLogger({
    levels: {
        info: 0,
        ok: 1,
        warn: 2,
        error: 3,
        debug: 4,
    },
    level: 'ok',
    format: winston.format.combine(winston.format.timestamp(), winston.format.printf((info) => {
        var _a;
        // Getting all of the information passed into the logger.
        const level = info.level;
        const message = info.message;
        const timestamp = info.timestamp;
        const depth = (_a = info.depth) !== null && _a !== void 0 ? _a : 0;
        // Creating the log from the information.
        const log = `${depth === 0 ? '' : '  '.repeat(depth) + '└──'}[ ${level.toUpperCase()} ] ${timestamp}: ${message}`;
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
    })),
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
//# sourceMappingURL=logger.js.map