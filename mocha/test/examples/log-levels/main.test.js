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

const sinon = require("sinon");
const expect = require("expect.js");

describe("Logger EW", () => {
  afterEach(() => {
    sinon.reset();
  });

  it("onClientRequest log(), info(), trace(), error(), debug()", () => {
    let requestMock = new Request();
    onClientRequest(requestMock);

    expect(mockLoggerDebug.callCount).to.be(1);
    expect(mockLoggerDebug.calledWith("b", "c", "d")).to.be(true);
    expect(mockLoggerError.callCount).to.be(1);
    expect(mockLoggerError.calledWith("%s %s %s", "boop")).to.be(true);
    expect(mockLoggerInfo.callCount).to.be(1);
    expect(mockLoggerInfo.calledWith("")).to.be(true);
    expect(mockLoggerLog.callCount).to.be(1);
    expect(mockLoggerLog.calledWith("%s %s %s", "hi", 1, {
      helloObj: "Hello"
    })).to.be(true);
    expect(mockLoggerTrace.callCount).to.be(1);
    expect(mockLoggerTrace.calledWith("%s %s %s", "hi", 1, {
      trace: 1
    })).to.be(true);
    expect(mockLoggerWarn.callCount).to.be(1);
    expect(mockLoggerWarn.calledWith("%s %s %s", "hi", 1, {})).to.be(true);
  });
});
