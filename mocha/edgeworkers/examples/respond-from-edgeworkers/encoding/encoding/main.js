import { atob, btoa, base64, base64url, base16 } from "encoding";

export function onClientRequest(request) {
  let encoded = base64.encode(
    new Uint8Array([
      72,
      101,
      108,
      108,
      111,
      44,
      32,
      119,
      111,
      114,
      108,
      100,
      33
    ])
  );
  let result = base64.decode("SGVsbG8=", "String"); //decodes to "Hello"
  let dec = atob("V29ybGQ="); //decodes to "World"
}

export function onOriginRequest(request) {
  let enc = btoa("Hello");
  let encoded = base64url.encode(
    new Uint8Array([72, 101, 108, 108, 111, 32, 116, 104, 101, 114, 101])
  );
  let result1 = base64url.decode(enc, "String");
  let result2 = base16.decode("576F726C64", "String"); //decodes to "World"
  let enc3 = base16.encode(new Uint8Array([72, 101, 108, 108, 111])); // "Hello"
}

export function onOriginResponse(request, response) {
  let result = base64.decode("SGVsbG8sIHdvcmxk", "Uint8Array"); //decodes to "[72,101,108,108,111,44,32,119,111,114,108,100]"
}