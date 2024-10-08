import Request from "request";
import { onClientRequest } from "../../../edgeworkers/examples/respond-from-edgeworkers/respondwith/true-client-ip/main";

const sinon = require("sinon");
const expect = require('expect.js');

describe("Returns the original Client IP address (True-Client-IP) from request object", () => {
  afterEach(() => {
    sinon.reset();
  });

  it("should return True-Client-IP address", async () => {
    let requestMock = new Request();
    requestMock.clientIp = "1.1.1.1";
    await onClientRequest(requestMock);
    expect(requestMock).to.have.property("clientIp");
    expect(requestMock.respondWith.callCount).to.be(1);
    expect(requestMock.respondWith.calledWith(
      200,
      {},
      "Client IP: 1.1.1.1"
    ));
  });
});
