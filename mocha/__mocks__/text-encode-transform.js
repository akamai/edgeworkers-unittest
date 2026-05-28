const sinon = require("sinon");

export const TextEncoderStream = sinon.stub().callsFake(() => {
    return {};
});

export const TextDecoderStream = sinon.stub().callsFake(() => {
    return {};
});