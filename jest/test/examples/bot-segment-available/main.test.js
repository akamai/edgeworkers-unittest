import { onBotSegmentAvailable } from "examples/bot-segment-available/main.js";
import Request from "request";

describe("BotScore", () => {
  test("onBotSegmentAvailable isHuman()", () => {
    let requestMock = new Request();
    onBotSegmentAvailable(requestMock);

    expect(requestMock.botScore.responseSegment.isHuman).toHaveBeenCalledTimes(
      1
    );
    expect(
      requestMock.botScore.responseSegment.isStrictResponse
    ).toHaveBeenCalledTimes(1);
    expect(
      requestMock.botScore.responseSegment.isCautiousResponse
    ).toHaveBeenCalledTimes(1);
    expect(
      requestMock.botScore.responseSegment.isSafeguardResponse
    ).toHaveBeenCalledTimes(1);
    expect(
      requestMock.botScore.responseSegment.isAggressiveResponse
    ).toHaveBeenCalledTimes(1);
  });
});
