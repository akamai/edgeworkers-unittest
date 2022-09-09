import { TextEncoderStream } from "text-encode-transform";
import { ReadableStream } from "streams";
import { httpRequest } from "http-request";

export async function onClientRequest(request) {
  try {
    const requestBody = new ReadableStream({
      start(controller) {
        controller.enqueue("hello ");
        controller.enqueue("world");
        controller.close();
      }
    });

    httpRequest("http://example.org/", {
      method: "POST",
      body: requestBody.pipeThrough(new TextEncoderStream())
    });

    return request.respondWith(200, { foo: "bar" }, "should pass");
  } catch {
    throw new Error("Error in ReadableStream");
  }
}
