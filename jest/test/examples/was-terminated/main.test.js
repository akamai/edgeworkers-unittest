import { onClientResponse } from "../../../edgeworkers/examples/respond-from-edgeworkers/respondwith/was-terminated/main";
import Request from "request";

describe("demonstrates how an EdgeWorker can be used to see if respondWith() has been called.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Simple onClientResponse call to check that wasTerminated was called", () => {
    let requestMock = new Request();
    requestMock.mockWasTerminated = true;

    onClientResponse(requestMock);
    expect(requestMock.respondWith).toHaveBeenCalledTimes(2);
    expect(requestMock.wasTerminated).toHaveBeenCalledTimes(1);
    expect(requestMock.mockWasTerminated).toBeTruthy();
  });

  test("Simple onClientResponse call to check that wasTerminated was not called", () => {
    let requestMock = new Request();
    requestMock.mockWasTerminated = false;

    onClientResponse(requestMock);
    expect(requestMock.respondWith).toHaveBeenCalledTimes(2);
    expect(requestMock.wasTerminated).toHaveBeenCalledTimes(1);
    expect(requestMock.mockWasTerminated).not.toBeTruthy();
  });
});
