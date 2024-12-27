const { app } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;
const appData = app.getPath("userData");
let configFile = path.join(appData, "ih-ap-config.json");
const cbConfig = require(configFile);

const cbPropertyID = cbConfig.cbPropertyID;
const cbServer = cbConfig.cbServer;
const cbOptions = cbConfig.cbOptions;

const cbApiHA_Details = "getHouseAccountDetails?";
const cbApiHA_List = "getHouseAccountList?";
const cbApiGetReservations = "getReservations?";
const cbApiGetReservation = "getReservation?";
const cbApiGetDashboard = "getDashboard?";

function getDashboard(window, dashDate) {
    let dashboard;
    let params = new URLSearchParams({
        propertyID: cbPropertyID,
        date: dashDate,
    });

    fetch(cbServer + cbApiGetDashboard + params, cbOptions)
        .then(res => res.json())
        .then((data) => {
            dashboard = data.data;
            window.webContents.send('dashboard', dashboard);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    // return dashboard;
}

module.exports = { 
    getDashboard 
};