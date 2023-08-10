export function onClientResponse(request, response) {
  request.respondWith(333, {}, "");
  request.wasTerminated();
  request.respondWith(222, {}, "GOOD: wasTerminated worked!");
}
