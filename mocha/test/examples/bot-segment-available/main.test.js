import { onBotSegmentAvailable } from "../../../edgeworkers/examples/bot-segment-available/main.js";
import Request from "request";

import sinon from "sinon";
const expect = require('expect.js');

describe("BotScore", () => {
  afterEach(() => {
    sinon.reset();
  });

  it("onBotSegmentAvailable isHuman()", () => {
    let requestMock = new Request();
    onBotSegmentAvailable(requestMock);

    expect(requestMock.botScore.responseSegment.isHuman.callCount).to.be(1);
    expect(
      requestMock.botScore.responseSegment.isStrictResponse.callCount
    ).to.be(1)
    expect(
      requestMock.botScore.responseSegment.isCautiousResponse.callCount
    ).to.be(1)
    expect(
      requestMock.botScore.responseSegment.isSafeguardResponse.callCount
    ).to.be(1)
    expect(
      requestMock.botScore.responseSegment.isAggressiveResponse.callCount
    ).to.be(1)
  });
});
