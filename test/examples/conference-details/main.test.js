import {mock_URLSearchParams_get} from "../../../__mocks__/url-search-params";
import {onClientRequest} from "../../../src/examples/conference-details/main";
import Request from "../../../__mocks__/object/request";

describe('Conference Attendance Code API call that returns the meeting details of a conference as HTML if the user provides the correct code', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("return conference details when the code is correct", () => {
        let requestMock = new Request();
        mock_URLSearchParams_get.mockReturnValue('abc123');
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['text/html'] }, '<html>Welcome to the conference.<br>Here are the venue details:<br><b>123 Main Street, San Francisco, CA<br>Dec, 6th 2019 10pm sharp</b></html>');
        
    });

    test("return error message when the code is incorrect", () => {
        let requestMock = new Request();
        mock_URLSearchParams_get.mockReturnValue('abc1');
        onClientRequest(requestMock);
        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, { 'Content-Type': ['text/html'] }, '<html>You have entered an incorrect code.</html>');
        
    });

});

