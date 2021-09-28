const sinon = require("sinon");

export const mock_Cookies_toHeader = sinon.stub();
export const mock_Cookies_get = sinon.stub();
export const mock_Cookies_getAll = sinon.stub();
export const mock_Cookies_names = sinon.stub();
export const mock_Cookies_add = sinon.stub();
export const mock_Cookies_delete = sinon.stub();

export class Cookies {
  constructor() {
    this.toHeader = mock_Cookies_toHeader;
    this.get = mock_Cookies_get;
    this.getAll = mock_Cookies_getAll;
    this.names = mock_Cookies_names;
    this.add = mock_Cookies_add;
    this.delete = mock_Cookies_delete;
  }
}

export const mock_SetCookie_toHeader = sinon.stub();

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
    this.toHeader = mock_SetCookie_toHeader;
  }
}
