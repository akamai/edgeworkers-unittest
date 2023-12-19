import sinon from "sinon";

export const mockLoggerDebug = sinon.stub();
export const mockLoggerError = sinon.stub();
export const mockLoggerInfo = sinon.stub();
export const mockLoggerLog = sinon.stub();
export const mockLoggerTrace = sinon.stub();
export const mockLoggerWarn = sinon.stub();

class Logger {
  constructor() {
    this.debug = mockLoggerDebug;
    this.error = mockLoggerError;
    this.info = mockLoggerInfo;
    this.log = mockLoggerLog;
    this.trace = mockLoggerTrace;
    this.warn = mockLoggerWarn;
  }
}

export const logger = new Logger();
