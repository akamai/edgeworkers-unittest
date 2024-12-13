import Response from "response";

const sinon = require("sinon");
const expect = require('expect.js');


function onOriginResponse(request, response) {
    response.getHeaders();
}

describe("Verify response.getHeaders()", () => {
    afterEach(() => {
        sinon.reset();
    });

    it("response.getHeaders is a mock", () => {
        let responseMock = new Response();

        onOriginResponse(undefined, responseMock);

        expect(responseMock.getHeaders.callCount).to.be(1);
    });
});
