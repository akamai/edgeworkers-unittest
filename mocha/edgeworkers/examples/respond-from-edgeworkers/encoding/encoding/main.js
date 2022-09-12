import { atob, btoa, base64, base64url, base16 } from "encoding";

export function onClientRequest(request) {
  let result = base64.decode("SGVsbG8=", "String"); //decodes to "Hello"
  let dec = atob("V29ybGQ="); //decodes to "World"
}

export function onOriginRequest(request) {
  let enc = btoa("Hello");
  let result1 = base64url.decode(enc, "String");
  let result2 = base16.decode("576F726C64", "String"); //decodes to "World"
}

export function onOriginResponse(request, response) {
  let result = base64.decode("SGVsbG8sIHdvcmxk", "Uint8Array"); //decodes to "[72,101,108,108,111,44,32,119,111,114,108,100]"
}