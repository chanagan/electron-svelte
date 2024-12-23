const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require('path');

const isDev = !app.isPackaged;

let win;

const cbConfig =
{
    "winWidth": 800,
    "winHeight": 600,
    "winX": 0,
    "winY": 0,
    "devTools": false,

    "cbPropertyID": "310046",
    "cbServer": "https://hotels.cloudbeds.com/api/v1.2/",
    "cbOptions": {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "x-api-key": "cbat_AVYJ4dezriaScXdXY9WJrVyjHl5PxxY5"
        }
    }
}
app.whenReady().then(main);

function main() {

    win = new BrowserWindow({
        width: cbConfig.winWidth,
        height: cbConfig.winHeight,
        x: cbConfig.winX,
        y: cbConfig.winY,
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, './preload.js'),
        },
    });

    win.loadFile(join(__dirname, '../public/index.html'));
    win.on('ready-to-show', win.show);

    if (isDev) win.webContents.openDevTools({mode: 'detach'});  
}

ipcMain.handle('get/version', () => app.getVersion());

const cbPropertyID = cbConfig.cbPropertyID;
const cbServer = cbConfig.cbServer;

const cbOptions = cbConfig.cbOptions;
const cbApiGetDashboard = "getDashboard?";

ipcMain.on('get/dashboard', async (event) => {
    let dashboard;
    let params = new URLSearchParams({
        propertyID: cbPropertyID,
        date: '2024-12-31',
    });

    fetch(cbServer + cbApiGetDashboard + params, cbOptions)
        .then(res => res.json())
        .then((data) => {
            console.log('then Success:', data.data);
            dashboard = data.data;
            win.webContents.send('dashboard', dashboard);   
            // return dashboard;    
        })
        .catch(error => {
            console.error('Error:', error);
        });
        // console.log('end Success:', dashboard);
        // return dashboard;
    // {
    // title: 'Dashboard',
    // items: [
    //     { name: 'Item 1', value: 100 },
    //     { name: 'Item 2', value: 200 },
    //     { name: 'Item 3', value: 300 },
    // ],
    // }
});

