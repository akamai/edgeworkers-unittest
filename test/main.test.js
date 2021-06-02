import * as edgeworker from "../src/main.js";

test("onClientRequest does nothing", () => {
  let request = { host: "https://www.akamai.com" };
  edgeworker.onClientRequest(request);
  expect(request.host).toBe("https://www.akamai.com");
});

test("onOriginRequest does nothing", () => {
  expect(3).toBe(3);
});

test("onClientResponse does nothing", () => {
  expect(3).toBe(3);
});

test("onOriginResponse does nothing", () => {
  expect(3).toBe(3);
});

test("responseProvider does something", () => {
  let request = { host: "https://www.superfamicom.ca/" };
  let response = edgeworker.responseProvider(request);

  console.log("testing");
});
