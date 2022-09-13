import { onClientRequest } from "../../../edgeworkers/examples/respond-from-edgeworkers/respondwith/readable_stream_subrequest_body/main";
import Request from "request";

const sinon = require("sinon");
const expect = require('expect.js');

describe('demonstrates ReadableStream instead of a string in request body.', () => {
  afterEach(() => {
    sinon.reset();
  });

  it("Simple mock call to parse ReadableStream", async () => {
    let requestMock = new Request();
    onClientRequest(requestMock);
    expect((requestMock.respondWith).callCount).to.be(1);
    expect(requestMock.respondWith.calledWith(
        200,
        {
          foo: "bar"
        },
        "should pass"
    ));
  });
});