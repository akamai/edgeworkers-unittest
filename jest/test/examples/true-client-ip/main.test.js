import Request from "request";
import { onClientRequest } from "../../../edgeworkers/examples/respond-from-edgeworkers/respondwith/true-client-ip/main";

describe("Returns the original Client IP address (True-Client-IP) from request object", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return True-Client-IP address", async () => {
    let requestMock = new Request();
    requestMock.clientIp = "1.1.1.1";
    await onClientRequest(requestMock);
    expect(requestMock).toHaveProperty("clientIp");
    expect(requestMock.respondWith).toHaveBeenCalled();
    expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
    expect(requestMock.respondWith).toHaveBeenCalledWith(
      200,
      {},
      "Client IP: 1.1.1.1"
    );
  });
});
