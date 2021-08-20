getDataLayer()

function getDataLayer() {
    var script = document.createElement('script');
    script.setAttribute('id', 'get-data-layer')
    script.innerHTML = `/////  Usercentrics Assistant Code /////
    getDataLayer()
    function getDataLayer() {
        let dataLayerLabel = "%cDataLayer Data";
        let dataLabel = "%cConsents Data";
        let eventLabel = "%cEvent Data";
        let styles = "color: white; font-size: 1.5em;background-color: darkblue; border: 5px solid cyan; padding: 5px; padding-left: 30px; padding-right: 30px;";
        let eventStyles = "color: white; font-size: 1.5em; background-color: purple; border: 5px solid violet; padding: 5px; padding-left: 10px; padding-right: 10px;";
        let errorStyles = "color: white; font-size: 1.5em; background-color: red; border: 5px solid violet; padding: 5px; padding-left: 10px; padding-right: 10px;";
    
        // cleaning up
        console.clear();

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

    document.body.append(script);

}