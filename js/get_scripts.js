/* const scriptsLabel = "%cScript Tags";
const scriptStyles = `color: white; font-size: 1.5em;background-color: darkblue; border: 5px solid cyan; 
    padding: 5px; padding-left: 30px; padding-right: 30px;`; */

// cleaning up
console.clear();

var srcData = {};
var scripts = document.getElementsByTagName("script");

for (var i = 0; i < scripts.length; i++) {
    script = scripts[i];

    // Does script have type="text/plain"
    adjusted = script.type === "text/plain" ? i + ": Adjusted - Yes" : i + ": Adjusted - No";
    dataUC = script.getAttribute('data-usercentrics') ?
        "'data-usercentrics'=  " + script.getAttribute('data-usercentrics') : "No 'data-usercentrics' attribute";
    src = script.src === "" ? "" : " -- " + script.src;
    scriptContent = script.innerHTML === "" ? "" : " -- " + script.innerHTML;

    srcData[adjusted] = dataUC + src + scriptContent;

}


console.group("%cScript Tags", `color: white; font-size: 1.5em;background-color: darkblue; border: 5px solid cyan; 
padding: 5px; padding-left: 30px; padding-right: 30px;`);
console.table(srcData);
console.groupEnd("%cScript Tags");