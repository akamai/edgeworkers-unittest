
import { createResponse } from 'create-response';

export function responseProvider(request) {
  return request.arrayBuffer().then(function(ab) {
    const decoder = new TextDecoder();

    var html = '<html><body><p>' + decoder.decode( new Uint8Array(ab)) + '</p></body></html>';
    return createResponse(200, {}, html);
  });
}
