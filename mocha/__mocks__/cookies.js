const sinon = require("sinon");

export class Cookies {
  constructor() {
    this.toHeader = sinon.stub();
    this.get = sinon.stub();
    this.getAll = sinon.stub();
    this.names = sinon.stub();
    this.add = sinon.stub();
    this.delete = sinon.stub();
  }
}

export class SetCookie {
  constructor() {
    this.name = 'c';
    this.value = '';
    this.maxAge = 100;
    this.domain = '';
    this.path = 'c';
    this.expires = '';
    this.httpOnly = false;
    this.secure = false;
    this.sameSite = '';
    this.toHeader = sinon.stub();
  }
}
