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
    window.postMessage({ type: 'dashboard', dashboard }, '*')
})

ipcRenderer.on('vipResList', (event, vipResRecordsList) => {
    window.postMessage({ type: 'vipResList', vipResRecordsList }, '*')
})

ipcRenderer.on('vipResDetail', (event, vipResDetailRecordsList) => {
    window.postMessage({ type: 'vipResDetail', vipResDetailRecordsList }, '*')
})

ipcRenderer.on('haList', (event, haAcctRecordsList) => {
    window.postMessage({ type: 'haList', haAcctRecordsList }, '*')
})

ipcRenderer.on('haDetails', (event, haDetails) => {
    window.postMessage({ type: 'haDetails', haDetails }, '*')
})  