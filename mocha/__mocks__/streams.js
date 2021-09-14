const sinon = require("sinon");

export class TransformStream {
}

export class ByteLengthQueuingStrategy {
}

export class CountQueuingStrategy {
}

export class ReadableStream {    
    // default to stubbed data; can be overriden by developers
    constructor() {
        this.locked = false;
        this.cancel = sinon.stub();
        this.getReader = sinon.stub();
        this.pipeThrough = sinon.stub();
        this.pipeTo = sinon.stub();
        this.tee = sinon.stub();
    }
}

export class WritableStream {
}
