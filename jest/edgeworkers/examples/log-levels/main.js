import { logger } from "../../../__mocks__/log";

export function onClientRequest(request) {
  logger.debug("b", "c", "d");
  logger.error("%s %s %s", "boop");
  logger.info("");
  logger.log("%s %s %s", "hi", 1, { helloObj: "Hello" });
  logger.trace("%s %s %s", "hi", 1, { trace: 1 });
  logger.warn("%s %s %s", "hi", 1, {});
}
