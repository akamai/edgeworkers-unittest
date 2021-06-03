
export default class Device{
    constructor(
        brandName="Chrome",
        modelName="90",
        marketingName="Chrome 90",
        isWireless=false,
        isTablet=false,
        os="Mac OS X",
        osVersion="10.15",
        mobileBrowser="Chrome",
        mobileBrowserVersion="90",
        resolutionWidth=1280,
        resolutionHeight=800,
        physicalScreenHeight=175,
        physicalScreenWidth=280,
        hasCookieSupport=true,
        hasAjaxSupport=true,
        hasFlashSupport=false,
        acceptsThirdPartyCookie=true,
        xhtmlSupportLevel=4,
        isMobile=false
        ){
            this.brandName = brandName;
            this.modelName = modelName;
            this.marketingName = marketingName;
            this.isWireless = isWireless;
            this.isTablet = isTablet;
            this.os = os;
            this.osVersion = osVersion;
            this.mobileBrowser = mobileBrowser;
            this.mobileBrowserVersion = mobileBrowserVersion;
            this.resolutionWidth = resolutionWidth;
            this.resolutionHeight = resolutionHeight;
            this.physicalScreenHeight = physicalScreenHeight;
            this.physicalScreenWidth = physicalScreenWidth;
            this.hasCookieSupport = hasCookieSupport;
            this.hasAjaxSupport = hasAjaxSupport;
            this.hasFlashSupport = hasFlashSupport;
            this.acceptsThirdPartyCookie = acceptsThirdPartyCookie;
            this.xhtmlSupportLevel = xhtmlSupportLevel;
            this.isMobile = isMobile;
        }
}
