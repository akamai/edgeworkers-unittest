import {onClientRequest} from "../../../src/edgeworkers/examples/respond-from-edgeworkers/respondWith/conference-details/main";
import Request from "request";

const sinon = require("sinon");
const expect = require('expect.js');

describe('Conference Attendance Code API call that returns the meeting details of a conference as HTML if the user provides the correct code', () => {

    afterEach(() => {
        sinon.restore();
    });
  
    it("return conference details when the code is correct", () => {
        let requestMock = new Request();
        requestMock.query = "key=abc123";
        onClientRequest(requestMock);
        expect((requestMock.respondWith).callcount).to.be((requestMock.respondWith));
                expect(requestMock.respondWith.calledWith(200, { 'Content-Type': ['text/html'] }, '<html>Welcome to the conference.<br>Here are the venue details:<br><b>123 Main Street, San Francisco, CA<br>Dec, 6th 2019 10pm sharp</b></html>')).to.be(true);

        
    });

    it("return error message when the code is incorrect", () => {
        let requestMock = new Request();
        requestMock.query = "key=abc1";
        onClientRequest(requestMock);
        expect((requestMock.respondWith).callcount).to.be((requestMock.respondWith));
                expect(requestMock.respondWith.calledWith(200, { 'Content-Type': ['text/html'] }, '<html>You have entered an incorrect code.</html>')).to.be(true);

        
    });

});

