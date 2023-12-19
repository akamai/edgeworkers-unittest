import { onClientRequest } from "../../../edgeworkers/examples/log-levels/main";
import Request from "request";
import {
  mockLoggerDebug,
  mockLoggerError,
  mockLoggerInfo,
  mockLoggerLog,
  mockLoggerTrace,
  mockLoggerWarn
} from "../../../__mocks__/log";

describe("Logger EW", () => {
  test("onClientRequest log(), info(), trace(), error(), debug()", () => {
    let requestMock = new Request();
    onClientRequest(requestMock);

    expect(mockLoggerDebug).toHaveBeenCalledTimes(1);
    expect(mockLoggerDebug).toHaveBeenCalledWith("b", "c", "d");
    expect(mockLoggerError).toHaveBeenCalledTimes(1);
    expect(mockLoggerError).toHaveBeenCalledWith("%s %s %s", "boop");
    expect(mockLoggerInfo).toHaveBeenCalledTimes(1);
    expect(mockLoggerInfo).toHaveBeenCalledWith("");
    expect(mockLoggerLog).toHaveBeenCalledTimes(1);
    expect(mockLoggerLog).toHaveBeenCalledWith("%s %s %s", "hi", 1, {
      helloObj: "Hello"
    });
    expect(mockLoggerTrace).toHaveBeenCalledTimes(1);
    expect(mockLoggerTrace).toHaveBeenCalledWith("%s %s %s", "hi", 1, {
      trace: 1
    });
    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
    expect(mockLoggerWarn).toHaveBeenCalledWith("%s %s %s", "hi", 1, {});
  });
});
