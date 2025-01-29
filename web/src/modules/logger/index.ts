import winston from "winston";

export const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

type LoggerFactory = (className: string) => winston.Logger;

export function getLogger(): LoggerFactory {
  return (className: string) => logger.child({ className });
}
