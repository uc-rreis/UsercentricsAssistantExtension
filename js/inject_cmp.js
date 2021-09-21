let settingsId = 'egLMgjg9j'
let ucscript = 'https://app.usercentrics.eu/browser-ui/latest/loader.js'
let id = 'usercentrics-cmp'

var script = document.createElement('script')
script.setAttribute('id', id)
script.setAttribute('src', ucscript)
script.setAttribute('data-settings-id', settingsId)
script.setAttribute('async', '')

document.head.append(script)