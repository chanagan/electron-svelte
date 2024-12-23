const { ipcRenderer, contextBridge } = require('electron')

const WINDOW_API = {
    getVersion: () => ipcRenderer.invoke('get/version'),
    getDashboard: () => ipcRenderer.invoke('get/dashboard'),
    send: (channel, data) => {
        ipcRenderer.send(channel, data)
    }
}

contextBridge.exposeInMainWorld('api', WINDOW_API)

ipcRenderer.on('dashboard', (event, dashboard) => {
    // console.log('preload dashboard:', dashboard)
    window.postMessage({ type: 'dashboard', dashboard }, '*')
    // window.dispatchEvent(new CustomEvent('dashboard', { detail: dashboard }))

})