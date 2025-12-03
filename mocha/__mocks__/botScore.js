const sinon = require("sinon");

class ResponseSegment {
    constructor() {
        this.isHuman = sinon.stub();
        this.isCautiousResponse = sinon.stub();
        this.isStrictResponse = sinon.stub();
        this.isSafeguardResponse = sinon.stub();
        this.isAggressiveResponse = sinon.stub();
    }
}

export default class BotScore {
    constructor() {
        this.responseSegment = new ResponseSegment();
    }
}
