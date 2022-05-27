import {createResponse} from "create-response";
import {responseProvider} from "../../../edgeworkers/examples/respond-from-edgeworkers/responseprovider/hello-world-request-body/main";
import Request from "request";

const expect = require('expect.js');

describe('EdgeWorker that generates a simple html page at the Edge and adds the request body to the response header', () => {
  
    it('responseProvider should retrieve the body of the request', () => {
        const requestMock = new Request();
        
        responseProvider(requestMock);

        expect((requestMock.text).callCount).to.be(1);
        expect(createResponse.calledWith(200, {'request-body': [requestMock.text()]}, '<html><body><p>Hello World</p></body></html>')).to.be(true);
    });
});