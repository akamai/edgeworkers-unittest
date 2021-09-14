const sinon = require("sinon");

import Device from './device';
import UserLocation from './userLocation';
import CacheKey from './cacheKey';

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
    this.cacheKey = new CacheKey();
    this.respondWith = sinon.stub();
    this.getHeader = sinon.stub();
    this.setHeader = sinon.stub();
    this.addHeader = sinon.stub();
    this.removeHeader = sinon.stub();
    this.getHeaders = sinon.stub();
    this.getVariable = sinon.stub();
    this.setVariable = sinon.stub();
    this.route = sinon.stub();
  }
}