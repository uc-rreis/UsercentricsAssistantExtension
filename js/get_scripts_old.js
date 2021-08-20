const bundle = "bundle.js";
const legacy = "bundle_legacy.js";
const latest = "latest";
const tcfEnabled = "data-tcf-enabled";
const settingsIdV2Att = "data-settings-id"; //use this to distinguish v2 from v1 
const ucV1Src = "https://app.usercentrics.eu/latest/main.js";
const sdpScr = "https://privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js";
const dataLabel = "%cUsercentrics Data";
const styles = `color: white; font-size: 1.5em;background-color: darkblue; border: 5px solid cyan; 
        padding: 5px; padding-left: 30px; padding-right: 30px;`;
// Variables
var ucData = {};
var script = "";
var isV1 = false;
var isV2 = false;
var isSDP = false;
var scripts = document.getElementsByTagName("script");

// cleaning up
console.clear();

for (var i = 0; i < scripts.length; i++) {
    script = scripts[i];

    // V2
    if (script.hasAttribute(settingsIdV2Att)) {
        isV2 = true;
        // Check Legacy script -- CMP Version
        if (script.src.includes(bundle)) {
            ucData.Version = "V2 - Not Legacy";
        } else if (script.src.includes(legacy)) {
            ucData.Version = "V2 - Legacy";
        }

        // check script latest version
        ucData.Latest = script.src.includes(latest).toString();

        // check if TFC2
        ucData.TCF2 = script.hasAttribute(tcfEnabled) ? "Yes" : "No";

        // SettingsId
        ucData.SettingsId = script.getAttribute("data-settings-id");


        // V1
    } else if (script.src.includes(ucV1Src)) {
        isV1 = true;
        // CMP Version
        ucData.Version = "V1";
        //Script Version
        ucData.Latest = scripts[i].src.includes(latest).toString();
        // SettingsId
        ucData.SettingsId = script.id;
        //SDP used
        if (script.src === sdpScr && !isSDP) {
            isSDP = true;
        }

    }

    //SDP used
    if (script.src === sdpScr && !isSDP) {
        isSDP = true;
    }

}

ucData.UsercentricsScriptPresent = isV1 || isV2 ? "Yes" : "No";
ucData.SmartDataProtector = isSDP ? "SDP installed." : "SDP not installed.";

console.group(dataLabel, styles);
console.table(ucData);
console.groupEnd(dataLabel);