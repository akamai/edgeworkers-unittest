import {TextEncoder} from 'encoding';

export function onClientRequest(request) {

  let encoder = new TextEncoder();
  let encoded = encoder.encode("This is a sample paragraph."); // produces Uint8Array[84,104,105,115,32,105,115,32,97,32,115,97,109,112,108,101,32,112,97,114,97,103,114,97,112,104,46]

  request.respondWith(200, {}, encoder.encoding);
}
