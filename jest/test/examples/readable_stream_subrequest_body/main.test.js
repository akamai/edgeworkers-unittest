import { onClientRequest } from "../../../edgeworkers/examples/respond-from-edgeworkers/respondwith/readable_stream_subrequest_body/main";
import Request from "request";

test("onClientRequest calling respondWith", () => {
  let requestMock = new Request();
  requestMock.host = "www.example.com";
  onClientRequest(requestMock);
  expect(requestMock.respondWith).toHaveBeenCalled();
  expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
  expect(requestMock.respondWith).toHaveBeenCalledWith(
    200,
    {
      foo: "bar"
    },
    "should pass"
  );
});
