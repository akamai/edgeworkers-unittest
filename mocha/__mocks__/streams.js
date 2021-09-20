const sinon = require("sinon");

export const TransformStream = sinon.stub().callsFake(() => {
    return {};
});

export const ByteLengthQueuingStrategy = sinon.stub().callsFake(() => {
    return {};
});

export const CountQueuingStrategy = sinon.stub().callsFake(() => {
    return {};
});

export const mock_ReadableStream_cancel = sinon.stub();
export const mock_ReadableStream_getReader = sinon.stub();
// needs to be under ReadableStream
//export const mock_ReadableStream_pipeThrough = sinon.stub(() => {return this});
export const mock_ReadableStream_pipeTo = sinon.stub();
export const mock_ReadableStream_tee = sinon.stub();

export class ReadableStream {    
    // default to stubbed data; can be overriden by developers
    constructor() {
        this.locked = false;
        this.cancel = mock_ReadableStream_cancel;
        this.getReader = mock_ReadableStream_getReader;
        this.pipeThrough = sinon.stub(() => {return this});
        this.pipeTo = mock_ReadableStream_pipeTo;
        this.tee = mock_ReadableStream_tee;
    }
}

export const WritableStream = sinon.stub().callsFake(() => {
    return {};
});
