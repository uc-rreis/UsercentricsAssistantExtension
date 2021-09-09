let uc_data = document.getElementById("btn-uc-data");
let uc_scripts = document.getElementById("btn-scripts");
let uc_consents = document.getElementById("btn-consents");
let uc_data_layer = document.getElementById("btn-data-layer");
let configDataInput = document.getElementById('config-data-input')

uc_data.addEventListener("click", async() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id, { function: getUCData });
    });

    // configDataInput.textContent = localStorage.getItem("settingsId")
    // console.log(`SettingsId: ${configDataInput}`)
});

uc_data.addEventListener("click", async() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id, { function: getScripts });
    });
});

uc_data.addEventListener("click", async() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id, { function: getDataLayer });
    });

});

function getUCData() {
    // Constants
    const bundle = "bundle.js";
    const legacy = "bundle_legacy.js";
    const latest = "latest";
    const tcfEnabled = "data-tcf-enabled";
    const settingsIdV2Att = "data-settings-id"; //use this to distinguish v2 from v1
    const ucV1Src = "https://app.usercentrics.eu/latest/main.js";
    const sdpScr = "https://privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js";
    const dataLabel = "%cUsercentrics Data";
    const scriptsLabel = "%cScript Tags";
    const dataStyles = `color: white; font-size: 1.5em;background-color: darkblue; border: 5px solid cyan;
    padding: 5px; padding-left: 30px; padding-right: 30px;`;
    // Variables
    var ucData = {};
    var srcData = {};
    var script = "";
    var isV1 = false;
    var isV2 = false;
    var consents = "";
    var scripts = document.getElementsByTagName("script");
    ucData.SmartDataProtector = "SDP not installed.";

    for (var i = 0; i < scripts.length; i++) {
        script = scripts[i];

        // Does script have type="text/plain"
        adjusted = script.type === "text/plain" ? i + ": Adjusted - Yes" : i + ": Adjusted - No";
        dataUC = script.getAttribute('data-usercentrics') ?
            "'data-usercentrics'=  " + script.getAttribute('data-usercentrics') : "No 'data-usercentrics' attribute";
        src = script.src === "" ? "" : " -- " + script.src;
        scriptContent = script.innerHTML === "" ? "" : " -- " + script.innerHTML;

        srcData[adjusted] = dataUC + src + scriptContent;

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

            //SDP used
            if (script.src === sdpScr) {
                ucData.SmartDataProtector = "SDP installed.";
            }

            // get Consents
            consents = UC_UI.getServices();
            consents.forEach((data) => {
                ucData[data.name] = data.consent.status;
            })

            // V1
        } else if (script.src.includes(ucV1Src)) {
            isV1 = true;
            // CMP Version
            ucData.Version = "V1";
            //Script Version
            ucData.Latest = scripts[i].src.includes(latest).toString();
            // SettingsId
            ucData.SettingsId = script.id;

            consents = usercentrics.getConsents();
            consents.forEach((data) => {
                    ucData[data.dataProcessor] = data.consentStatus;
                })
                //SDP used
            if (script.src === sdpScr) {
                ucData.SmartDataProtector = "SDP installed.";
            }

        }
        ucData.UsercentricsScriptPresent = isV1 || isV2 ? "Yes" : "No";

        // include checks for SDP
    }
    console.group(dataLabel, dataStyles);
    console.table(ucData);
    console.groupEnd(dataLabel);
    console.group(scriptsLabel, dataStyles);
    console.table(srcData);
    console.groupEnd(scriptsLabel);
}

function getScripts() {
    var scripts = document.getElementsByTagName("script");
    var scriptsSrc = [];
    const styles = `color: white; font-size: 1.5em;background-color: darkblue; border: 5px solid cyan;
    padding: 5px; padding-left: 30px; padding-right: 30px;`;
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src) scriptsSrc[i] = scripts[i].src
        else scriptsSrc[i] = scripts[i].innerHTML

        if (scripts[i].type === "text/plain")
            scriptsSrc[i] += " - ADJUSTED: TRUE"
        else
            scriptsSrc[i] += " - ADJUSTED: FALSE"
    }

    const label = "%cSCRIPTS AND ADJUSTEMENT";
    console.group(label, styles);
    scriptsSrc.forEach((script) => console.log(script));
    console.groupEnd(label);
}

function getDataLayer() {
    var script = document.createElement('script');
    script.innerHTML = `getData()
    function getData() {
        let dataLayerLabel = "%cDataLayer Data";
        let dataLabel = "%cConsents Data";
        let eventLabel = "%cEvent Data";
        let settingsIdV2Att = "data-settings-id"; //use this to distinguish v2 from v1
        let ucV1Src = "https://app.usercentrics.eu/latest/main.js";
        var consents = "";
        var ucData = {};
        var scripts = document.getElementsByTagName("script");
        let styles = "color: white; font-size: 1.5em;background-color: darkblue; border: 5px solid cyan;padding: 5px; padding-left: 30px; padding-right: 30px;";
        let eventStyles = "color: white; font-size: 1.5em; background-color: purple; border: 5px solid violet; padding: 5px; padding-left: 10px; padding-right: 10px;";
        let errorStyles = "color: white; font-size: 1.5em; background-color: red; border: 5px solid violet; padding: 5px; padding-left: 10px; padding-right: 10px;";

        // Get Consents
        for (var i = 0; i < scripts.length; i++) {
            script = scripts[i];

            if (script.hasAttribute(settingsIdV2Att)) {
                consents = UC_UI.getServices();
                consents.forEach((data) => {
                    ucData[data.name] = data.consent.status;
                })
                break;
            } else if(script.src.includes(ucV1Src)){
                consents = usercentrics.getConsents();
                consents.forEach((data) => {
                    ucData[data.dataProcessor] = data.consentStatus;
                })
                break;
            }
        }

        console.group(dataLabel, styles);
        console.table(ucData);
        console.groupEnd(dataLabel);
    
        // Get DataLayer
        var dataLayer = window.dataLayer;
    
        if (!dataLayer) {
            console.log("%cThe dataLayer variable is not defined!", errorStyles);
        } else {
    
            console.group(dataLayerLabel, styles);
            for (var i = 0; i < dataLayer.length; i++) {
                console.group(eventLabel + " -- Event number: " + i, eventStyles);
                console.table(dataLayer[i]);
                console.groupEnd(eventLabel, eventStyles);
            }
        }

    }`


    document.body.appendChild(script);

}

function getConsents() {
    return
}