const sinon = require("sinon");

import {ReadableStream} from './streams'
export const httpRequest = sinon.stub();

export default class HttpResponse {
    constructor() {
        this.status = 200;
        this.ok = true;
        this.headers = {};
        this.body = new ReadableStream();
        this.text = sinon.stub();
        this.json = sinon.stub();
        this.getHeader = sinon.stub();
        this.getHeaders = sinon.stub();
        this.get = sinon.stub();
    }
}
