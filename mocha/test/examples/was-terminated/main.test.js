import { onClientResponse } from "../../../edgeworkers/examples/respond-from-edgeworkers/respondwith/was-terminated/main";
import Request from "request";

const sinon = require("sinon");
const expect = require('expect.js');

describe("demonstrates how an EdgeWorker can be used to see if respondWith() has been called.", () => {
  afterEach(function () {
    sinon.reset();
  });

  it("Simple onClientResponse call to check that wasTerminated() was called", () => {
    let requestMock = new Request();
    requestMock.mockWasTerminated = true;

    onClientResponse(requestMock);
    expect(requestMock.respondWith.callCount).to.be(2);
    expect(requestMock.wasTerminated.callCount).to.be(1);
    expect(requestMock.mockWasTerminated).to.be.true;
  });

  it("Simple onClientResponse call to check that wasTerminated() was not called", () => {
    let requestMock = new Request();
    requestMock.mockWasTerminated = false;

    onClientResponse(requestMock);
    expect(requestMock.respondWith.callCount).to.be(2);
    expect(requestMock.wasTerminated.callCount).to.be(1);
    expect(requestMock.mockWasTerminated).to.be.false;
  });
});
