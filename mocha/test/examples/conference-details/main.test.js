import {onClientRequest} from "respond-from-edgeworkers/respondWith/conference-details/main";
import Request from "request";

describe('Conference Attendance Code API call that returns the meeting details of a conference as HTML if the user provides the correct code', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("return conference details when the code is correct", () => {
        let requestMock = new Request();
        requestMock.query = "key=abc123";
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['text/html'] }, '<html>Welcome to the conference.<br>Here are the venue details:<br><b>123 Main Street, San Francisco, CA<br>Dec, 6th 2019 10pm sharp</b></html>');
        
    });

    test("return error message when the code is incorrect", () => {
        let requestMock = new Request();
        requestMock.query = "key=abc1";
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['text/html'] }, '<html>You have entered an incorrect code.</html>');
        
    });

});

