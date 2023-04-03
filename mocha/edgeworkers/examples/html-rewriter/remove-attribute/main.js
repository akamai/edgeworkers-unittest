import { HtmlRewritingStream } from "html-rewriter";
import { httpRequest } from "http-request";
import { createResponse } from "create-response";

export function responseProvider(request) {
  return httpRequest("http://example.org/").then(response => {
    let rewriter = new HtmlRewritingStream();
    rewriter.onElement("b", handler); // Handler function
    return createResponse(200, {}, response.body.pipeThrough(rewriter));
  });
}

export function handler(tag) {
  if (tag.getAttribute("href") !== undefined) {
    tag.removeAttribute("href");
  }
}
