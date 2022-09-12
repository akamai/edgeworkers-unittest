const sinon = require("sinon");

export const mock_TextEncoder_encode = sinon.stub();
export class TextEncoder {
    constructor() {
        this.encoding =  "utf-8";
        this.encode = mock_TextEncoder_encode;
    }
}

export const mock_TextDecoder_decode = sinon.stub();
export class TextDecoder {
    constructor() {
        this.fatal = false;
        this.ignoreBOM = false;
        this.encoding = "utf-8";
        this.decode = mock_TextDecoder_decode;
    }
}

export const atob = sinon.stub();
export const btoa = sinon.stub();

export const mock_base64_decode = sinon.stub();
class Base64 {
    constructor() {
        this.decode = mock_base64_decode;
    }
}
export const base64 = new Base64();


export const mock_base64url_decode = sinon.stub();
class Base64url {
    constructor() {
        this.decode =  mock_base64url_decode;
    }
}
export const base64url = new Base64url();

export const mock_base16_decode = sinon.stub();
class Base16 {
    constructor() {
        this.decode =  mock_base16_decode;
    }
}
export const base16 = new Base16();