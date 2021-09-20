const sinon = require("sinon");

export default class Device {
  constructor() {
    this.brandName = "Chrome";
    this.modelName = "90";
    this.marketingName = "Chrome 90";
    this.isWireless = false;
    this.isTablet = false;
    this.os = "Mac OS X";
    this.osVersion = "10.15";
    this.mobileBrowser = "Chrome";
    this.mobileBrowserVersion = "90";
    this.resolutionWidth = 1280;
    this.resolutionHeight = 800;
    this.physicalScreenHeight = 175;
    this.physicalScreenWidth = 280;
    this.hasCookieSupport = true;
    this.hasAjaxSupport = true;
    this.hasFlashSupport = false;
    this.acceptsThirdPartyCookie = true;
    this.xhtmlSupportLevel = 4;
    this.isMobile = false;
  }
}