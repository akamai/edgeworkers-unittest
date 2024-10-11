export async function onClientRequest(request) {
  return request.respondWith(200, {}, "Client IP: " + request.clientIp);
}
