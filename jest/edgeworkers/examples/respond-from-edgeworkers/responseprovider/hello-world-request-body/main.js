
import { createResponse } from 'create-response';

export function responseProvider(request) {
  const requestBodyText =  request.text();

  return createResponse(
    200,
    {
      'request-body': [requestBodyText]
    },
    '<html><body><p>Hello World</p></body></html>'
  );
}
