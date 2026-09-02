
import { CompressionStream, DecompressionStream } from 'streams';
import { HtmlRewritingStream } from "html-rewriter";
import { httpRequest } from "http-request";
import { createResponse } from "create-response";

export function responseProvider(request) {
  let options = {
    headers: { 'accept-encoding': 'gzip' },
    preserveEncoding: true
  };

  return httpRequest("http://example.org/", options).then(response => {
    let rewriter = new HtmlRewritingStream();
    rewriter.onElement("b", tag => tag.append(" World!"));

    let stream = response.body.pipeThrough(new DecompressionStream("gzip"))
                    .pipeThrough(rewriter)
                    .pipeThrough(new CompressionStream("gzip"));
    return createResponse(200, {}, stream);
  });
}
