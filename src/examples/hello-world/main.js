// Import logging module
import { logger } from 'log';

export function onClientRequest (request) {
  // Outputs a message to the X-Akamai-EdgeWorker-onClientRequest-Log header.
  logger.log('Responding with hello world from the path: %s', request.path);
  request.respondWith(
    200, {},
    '<html><body><h1>Hello World From Akamai EdgeWorkers</h1></body></html>');
}

export function onClientResponse (request, response) {
  // Outputs a message to the X-Akamai-EdgeWorker-onClientResponse-Log header.
  logger.log('Adding a header in ClientResponse');

  response.setHeader('X-Hello-World', 'From Akamai EdgeWorkers');
}