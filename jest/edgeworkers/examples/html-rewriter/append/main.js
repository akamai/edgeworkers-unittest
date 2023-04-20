import { HtmlRewritingStream } from "html-rewriter";
import { httpRequest } from "http-request";
import { createResponse } from "create-response";

export function responseProvider(request) {
  return httpRequest("http://example.org/").then(response => {
    let rewriter = new HtmlRewritingStream();
    rewriter.onElement("b", tag => tag.append(" World!"));
    return createResponse(200, {}, response.body.pipeThrough(rewriter));
  });
}
