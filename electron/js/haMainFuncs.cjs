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

const computeCharges = (accountName, haData) => {
    const flTax = 0.075
    const ccFee = 0.03
    let credit = haData.total.credit.slice(4).replaceAll(',', '')
    let debit = haData.total.debit.slice(4).replaceAll(',', '')
    let balance = credit - debit
    let monMin = ''
    let minDelta = ''
    let minTax = ''
    let subTot = ''
    let creChg = ''
    let totChg = ''

    if (balance >= 0) {
        monMin = accountName.includes("&") ? 200 : 100
        minDelta = balance < monMin ? monMin - balance : 0
        minTax = minDelta * flTax
        subTot = balance + minDelta + minTax
        creChg = subTot * ccFee
        totChg = subTot + creChg
    }

    return {
        balance: balance,
        monMin: monMin,
        minDelta: minDelta,
        minTax: minTax,
        subTot: subTot,
        creChg: creChg,
        totChg: totChg
    }
}


let haWin;
const getHADetails = (window, parms) => {
    let { rowID, actName, accountStatus } = parms;
    console.log('ipcMain main: getHaBalance: ', rowID, actName, accountStatus)
    let keyID = rowID;
    // console.log('ipcMain main: getHaBalance: ', keyID)
    let params = new URLSearchParams({
        propertyID: cbPropertyID,
        houseAccountID: keyID,
        resultsFrom: '2024-07-08',
        resultsTo: '2025-12-31',
    })
    fetch(cbServer + cbApiHA_Details + params, cbOptions)
        .then(res => res.json())
        .then((data) => {
            let haData = data.data;
            let haRecord = {};
            haRecord.accountID = keyID;
            haRecord.accountName = actName;
            haRecord.accountStatus = accountStatus;

            let charges = computeCharges(haRecord.accountName, haData)
            haRecord.charges = charges
            haRecord.records = haData.records
            // console.log(`credit: ${credit} - debit: ${debit} = balance: ${balance}`) // console.log('credit: ', credit) 
            // return resData
            window.webContents.send("haDetails", haRecord);
        })
        .catch(err => {
            // console.log(`main: getHaBalance: ${record} error: ${err}`) // console.log(err)
            window.webContents.send("haDetails", haRecord);
            // console.error(err)
        })
}
const getHA = (window) => {
    haWin = window;
    console.log('haMainFuncs: getHA');

    let params = new URLSearchParams({
        propertyID: cbPropertyID,
        accountStatus: "open",
        limit: 10,
    });

    fetch(cbServer + cbApiHA_List + params, cbOptions)
        .then(res => res.json())
        .then((data) => {
            let haAcctRecordsList = [];
            let haData = data.data;
            for (let i = 0; i < haData.length; i++) {
                let dtRecord = haData[i];
                // want only house accounts
                let isGC = dtRecord.accountName.startsWith("GC")
                let isEmp = dtRecord.accountName.startsWith("IH")
                if (isGC || isEmp) {
                    continue
                }
                let haRecord = {};
                haRecord.accountID = haData[i].accountID;
                haRecord.accountName = haData[i].accountName;
                haRecord.accountStatus = haData[i].accountStatus;
                haRecord.charges = {};
                haRecord.charges.balance = 0;
                haRecord.charges.monMin = 0;
                haRecord.charges.minDelta = 0;
                haRecord.charges.minTax = 0;
                haRecord.charges.subTot = 0;
                haRecord.charges.creChg = 0;
                haRecord.charges.totChg = 0;

                haAcctRecordsList.push(haRecord);
            }
            // log("main: getHA_List:");
            haAcctRecordsList.sort((a, b) => (a.accountName > b.accountName ? 1 : -1));
            console.log("main: getHA_List: ", haAcctRecordsList.length);
            haWin.webContents.send("haList", haAcctRecordsList); // send to preload
        })
        .catch(err => console.error(err))
        ;


}

module.exports = { getHA, getHADetails };