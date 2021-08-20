let uc_data = document.getElementById("btn-uc-data");
let uc_scripts = document.getElementById("btn-scripts");
let uc_consents = document.getElementById("btn-consents");
let uc_data_layer = document.getElementById("btn-data-layer");

uc_data.onclick = function() {
    let queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query(queryOptions, (tabs) => {

        chrome.tabs.executeScript(
            tabs[0].id, { file: 'js/get_config_data.js' }
        );
    });
}

uc_scripts.onclick = function() {
    let queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query(queryOptions, (tabs) => {

        chrome.tabs.executeScript(
            tabs[0].id, { file: 'js/get_scripts.js' }
        );
    });
}

uc_data_layer.onclick = function() {
    let queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query(queryOptions, (tabs) => {

        chrome.tabs.executeScript(
            tabs[0].id, { file: 'js/get_data_layer.js' }
        );
    });
}

uc_consents.onclick = function() {
    let queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query(queryOptions, (tabs) => {

        chrome.tabs.executeScript(
            tabs[0].id, { file: 'js/get_consents.js' }
        );
    });
}