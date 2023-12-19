export const mockLoggerDebug = jest.fn();
export const mockLoggerError = jest.fn();
export const mockLoggerInfo = jest.fn();
export const mockLoggerLog = jest.fn();
export const mockLoggerTrace = jest.fn();
export const mockLoggerWarn = jest.fn();

export const Logger = jest.fn().mockImplementation(() => {
  return {
    debug: mockLoggerDebug,
    error: mockLoggerError,
    info: mockLoggerInfo,
    log: mockLoggerLog,
    trace: mockLoggerTrace,
    warn: mockLoggerWarn
  };
});

export const logger = new Logger();
