getConsents()

function getConsents() {
    var script = document.createElement('script');
    script.setAttribute('id', 'get-consents')
    script.innerHTML = `/////  Usercentrics Assistant Code /////
    getConsents()
    function getConsents() {
        let consentsLabel = "%cConsents Data";
        let styles = "color: white; font-size: 1.5em;background-color: darkblue; border: 5px solid cyan;padding: 5px; padding-left: 30px; padding-right: 30px;";
        let eventStyles = "color: white; font-size: 1.5em;background-color: darkblue; border: 5px solid cyan; padding: 5px; padding-left: 30px; padding-right: 30px;";
        let errorStyles = "color: white; font-size: 1.5em; background-color: red; border: 5px solid violet; padding: 5px; padding-left: 10px; padding-right: 10px;";
    
        // cleaning up
        console.clear();

        // Get Consents
        var consents = UC_UI.getServices()
        var consentData = {}

        consents.forEach((consent) => {
            consentData[consent.name] = consent.consent.status;
        })
    
        if (!consents) {
            console.log("%cNo Consents present!", errorStyles);
        } else {
            console.group(consentsLabel, eventStyles);
            console.table(consentData);
            console.groupEnd(consentsLabel, eventStyles);
        }

    }`
    document.body.append(script);
}