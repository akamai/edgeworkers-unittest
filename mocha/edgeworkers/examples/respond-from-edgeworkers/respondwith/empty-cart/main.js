import { Cookies } from 'cookies';

export function onClientResponse (request, response) {
  const cookies = new Cookies(request.getHeader('Cookie'));
  var cartCookie = cookies.get('cart');

  if (!cartCookie) {
    request.respondWith(200, { 'Content-Type': ['application/json; charset=utf-8'] }, '{}');
  }
}
