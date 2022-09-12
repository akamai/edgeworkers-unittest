import {TextDecoder } from 'encoding';

export function onClientRequest(request) {
  let decoder = new TextDecoder();

  let data = new Uint8Array([84,104,105,115,32,105,115,32,97,32,115,97,109,112,108,101,32,112,97,114,97,103,114,97,112,104,46]);
  let text = decoder.decode(data); // decodes to the string "This is a sample paragraph."

  request.respondWith(231, {}, decoder.fatal);
}
