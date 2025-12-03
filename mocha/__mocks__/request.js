const sinon = require("sinon");

import Device from './device';
import UserLocation from './userLocation';
import CacheKey from './cacheKey';
import { ReadableStream } from './streams';
import BotScore from "./botScore";

export const mockRespondWith = sinon.stub();
export const mockWasTerminated = sinon.stub();
export const mockGetHeader = sinon.stub();
export const mockSetHeader = sinon.stub();
export const mockAddHeader = sinon.stub();
export const mockRemoveHeader = sinon.stub();
export const mockGetHeaders = sinon.stub();
export const mockGetVariable = sinon.stub();
export const mockSetVariable = sinon.stub();
export const mockRoute = sinon.stub();
export const mockJson = sinon.stub();
export const mockText = sinon.stub();
export const mockArrayBuffer = sinon.stub();

export default class Request {
  constructor() {
    this.host = "www.example.com";
    this.method = "GET";
    this.path = "/helloworld";
    this.scheme = "https";
    this.query = "param1=value1&param2=value2";
    this.url = "/helloworld?param1=value1&param2=value2";
    this.userLocation = new UserLocation();
    this.device = new Device();
    this.cpCode = 1191398;
    this.clientIp = "1.1.1.1";
    this.cacheKey = new CacheKey();
    this.respondWith = mockRespondWith;
    this.wasTerminated = mockWasTerminated;
    this.getHeader = mockGetHeader;
    this.setHeader = mockSetHeader;
    this.addHeader = mockAddHeader;
    this.removeHeader = mockRemoveHeader;
    this.getHeaders = mockGetHeaders;
    this.getVariable = mockGetVariable;
    this.setVariable = mockSetVariable;
    this.route = mockRoute;
    this.json = mockJson;
    this.text = mockText;
    this.arrayBuffer = mockArrayBuffer;
    this.body = new ReadableStream();
    this.botScore = new BotScore();
  }
}
