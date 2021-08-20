let uc_data = document.getElementById("btn-uc-data");
let uc_scripts = document.getElementById("btn-scripts");
let uc_consents = document.getElementById("btn-consents");
let uc_data_layer = document.getElementById("btn-data-layer");
let div = document.getElementById('config-data');
let count = 0;

uc_data.onclick = function() {
    let queryOptions = { active: true, currentWindow: true };
    chrome.tabs.query(queryOptions, (tabs) => {

        chrome.tabs.executeScript(
            tabs[0].id, { file: 'js/get_config_data.js' }
        );
    });

    /* if (count === 0) {
        insertSettingsIdOnPopup(count);
        count = 1;
    } */
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

/* function insertSettingsIdOnPopup(count) {
    var table = document.createElement('table');
    table.setAttribute('class', 'table table-bordered');
    table.setAttribute('id', 'config-table');
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.innerHTML = "SettingsId"
    tr.appendChild(th);
    var td = document.createElement('td');
    td.innerHTML = "TEST";
    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    div.appendChild(table);
} */