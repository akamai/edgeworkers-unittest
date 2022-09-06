
import { createResponse } from 'create-response';

export function responseProvider(request) {
  const requestBody =  request.body;

  return createResponse(
    200,
    {
      'request-body': [requestBody]
    },
    '<html><body><p>Hello World</p></body></html>'
  );
}
