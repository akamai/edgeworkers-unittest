import {createResponse} from "create-response";
import {responseProvider} from "../../../edgeworkers/examples/respond-from-edgeworkers/responseprovider/hello-world-request-arrayBuffer/main";
import Request from "request";
import {mockArrayBuffer} from "request";

const sinon = require("sinon");
const expect = require('expect.js');

describe('EdgeWorker that generates a simple html page at the Edge and adds the request body to the response header', () => {
  
    afterEach(() => {
        sinon.reset();
    });

    it('responseProvider should retrieve the body of the request', async () => {
        const requestMock = new Request();
        
        mockArrayBuffer.returns(new Promise(function(resolve) {
            const encoder = new TextEncoder();
            resolve(encoder.encode("Hello World").buffer);
        }));

        await responseProvider(requestMock);

        expect(requestMock.arrayBuffer.callCount).to.be(1);
        expect(createResponse.calledWith(200, {}, '<html><body><p>Hello World</p></body></html>'));
    });
});