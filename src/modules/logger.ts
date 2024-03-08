//https://seohyun0120.tistory.com/entry/Winston-consolelog%EB%A7%90%EA%B3%A0-winston%EC%9C%BC%EB%A1%9C-log%EB%A5%BC-%EA%B8%B0%EB%A1%9D%ED%95%B4%EB%B3%B4%EC%9E%90
import winston, { format } from 'winston';
import morgan from 'morgan';
import DailyRotateFile from 'winston-daily-rotate-file';

function isFormatForConsole(identifier: boolean) {
  return format.combine(
    identifier ? format.colorize({ level: true }) : format.uncolorize(),
    format.label({ label: 'HealthKkanbu server' }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      (info) =>
        `${info.timestamp} __${info.level}__ [${info.label}]: ${info.message}`
    )
  );
}

export const logger: winston.Logger = winston.createLogger({
  transports: [
    // console logging setting
    new winston.transports.Console({
      level: 'silly',
      format: isFormatForConsole(true),
    }),
    // file logging setting
    // new winston.transports.File({
    //   level: 'debug',
    //   filename: 'debug.log',
    //   dirname: process.cwd() + '/log',
    //   format: isFormatForConsole(false),
    // }),
    new DailyRotateFile({
      level: 'debug',
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '14d',
      format: isFormatForConsole(false),
    }),
  ],
});

// first parameter is logging format
// 'combined' : data with request user's information - for publishing
// 'common' : simple data with request user's information
// 'dev' : simple data without request user's information
export const httpLogger = morgan('combined', {
  stream: {
    write: (message: string) => {
      logger.http(message);
    },
  },
});
