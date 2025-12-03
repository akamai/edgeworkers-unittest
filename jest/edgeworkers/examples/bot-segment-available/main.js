// Import logging module
import { logger } from 'log';

export function onBotSegmentAvailable (request) {
  var botSegment = request.botScore.responseSegment;
  var message = "<html><body>" +
      "<h1>Is Human: " + botSegment.isHuman() + "</h1>" +
      "<h1>Is Aggressive: " + botSegment.isAggressiveResponse() + "</h1>" +
      "<h1>Is CautiousResp: " + botSegment.isCautiousResponse() + "</h1>" +
      "<h1>Is SafeguardResp: " + botSegment.isSafeguardResponse() + "</h1>" +
      "<h1>Is StrictResp: " + botSegment.isStrictResponse() + "</h1>" +
      "</body></html>";

  request.respondWith(200, { 'Content-Type': ['text/html'] }, message);
}
