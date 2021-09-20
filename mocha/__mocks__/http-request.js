const sinon = require("sinon");

import {ReadableStream} from './streams'

export const httpRequest = sinon.stub();

export const mock_HttpResponse_text = sinon.stub();
export const mock_HttpResponse_json = sinon.stub();
export const mock_HttpResponse_getHeader = sinon.stub();
export const mock_HttpResponse_getHeaders = sinon.stub();
export const mock_HttpResponse_get = sinon.stub();

export class HttpResponse {
    constructor() {
        this.status = 200;
        this.ok = true;
        this.headers = {};
        this.body = new ReadableStream();
        this.text = mock_HttpResponse_text;
        this.json = mock_HttpResponse_json;
        this.getHeader = mock_HttpResponse_getHeader;
        this.getHeaders = mock_HttpResponse_getHeaders;
        this.get = mock_HttpResponse_get;
    }
}
