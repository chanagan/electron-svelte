const { app } = require("electron");
const { type } = require("os");
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

const computeNights = (startDate, endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let timeDiff = Math.abs(end.getTime() - start.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays
}
const computeDow = (startDate) => {
    let start = new Date(startDate).getDay();
    return daysOfWeek[start];
}
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const vipDays = 6


let vipResCount = 0;
let vipResDetailRecordsList = [];
let vipResDetailCount = 0;

let reservHdrs = []
reservHdrs["reservationID"] = true
reservHdrs["guestName"] = true
reservHdrs["nights"] = true
reservHdrs["startDate"] = true
reservHdrs["endDate"] = true
reservHdrs["adults"] = true
reservHdrs["dow"] = true

let detailHdrs = [
    'guestList'
    , 'isMainGuest'
    , 'assignedRoom'
    , 'rooms'
    , 'status'
]
let guestHdrs = [
    'guestID'
    , 'guestLastName'
    , 'guestFirstName'
    , 'isMainGuest'
    , 'guestStatus'
    , 'roomName'
]

let statusHdrs = {
    'checked_in': 'Chk/In'
    , 'checked_out': 'Chk/Out'
    , 'cancelled': 'Canx'
    , 'confirmed': 'Confrm'
    , 'in_house': 'In Hse'
    , 'not_checked_in': 'Not C/I'
    , 'vip': 'VIP'
}

let vipWin;
function getVipDetail(vipres) {
    // console.log("main: vipMainFuncs: getVipDetail: ", vipres);
    let isGood = (typeof vipres.reservationID !== 'undefined') ? true : false;
    console.log(`vipMainFuncs: getVipDetail: ${isGood}`);
    let params = new URLSearchParams({
        propertyID: cbPropertyID,
        reservationID: vipres.reservationID,
    });

    fetch(cbServer + cbApiGetReservation + params, cbOptions)
        .then(res => res.json())
        .then((data) => {
            vipResDetailCount++;
            // console.log("main: vipMainFuncs: getVipDetail: ", data);
            let resData = data.data;
            // console.log(`vipMainFuncs: getVipDetail: 
            //     ${resData.guestName}, ${resData.startDate}, ${resData.endDate}`);
            for (const [guestID, guestRecord] of Object.entries(resData.guestList)) {
                console.log(`vipMainFuncs: getVipDetail: 
                    ${guestID} ${guestRecord.roomName} `);
            }

            // for (const fld of detailHdrs) {
            //     vipres[fld] = resData[fld];
            // }

            let gstCount = Object.keys(resData.guestList).length;
            let gstSeparator = '';

            vipres.guestID = '';
            vipres.guestFirstName = '';
            vipres.guestLastName = '';
            vipres.isMainGuest = '';
            vipres.roomName = '';
            vipres.guestStatus = '';

            let status = '';

            console.log(`vipMainFuncs: getVipDetail: guests:
                ${gstCount}`);
            for (const [recGuestID, guestRecord] of Object.entries(resData.guestList)) {
                vipres.guestID += gstSeparator + guestRecord.guestID;
                vipres.guestFirstName += gstSeparator + guestRecord.guestFirstName;
                vipres.guestLastName += gstSeparator + guestRecord.guestLastName;
                if (guestRecord.isMainGuest) {
                    vipres.isMainGuest += gstSeparator + guestRecord.isMainGuest;
                    vipres.roomName += gstSeparator + guestRecord.roomName;
                    status = guestRecord.guestStatus;
                    vipres.guestStatus += gstSeparator + statusHdrs[status];
                }
                // vipres.guestList[guestID] = guestRecord;
                gstSeparator = " / ";
            }
            vipResDetailRecordsList.push(vipres);
            // console.log(`vipMainFuncs: getVipDetail:
            //     ${vipres}`);
            if (vipResCount == vipResDetailCount) {
                console.log(`vipMainFuncs: getVipDetail: 
                    vipResCount: ${vipResCount}, vipResDetailCount: ${vipResDetailCount}`);
                vipWin.webContents.send('vipResDetail', vipResDetailRecordsList);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getVIP(window, vipFrmDt, vipToDt) {
    vipWin = window;
    // clear the resevations data
    vipResCount = 0;
    vipResDetailCount = 0;
    vipResDetailRecordsList = [];

    let params = new URLSearchParams({
        propertyID: cbPropertyID,
        checkInFrom: vipFrmDt,
        checkInTo: vipToDt,
    });

    fetch(cbServer + cbApiGetReservations + params, cbOptions)
        .then(res => res.json())
        .then((data) => {
            let vipCnt = 0;
            let vipResRecordsList = [];
            let resData;
            resData = data.data;
            // if (isDev) console.log("main: vipMainFuncs: getResList: ", resData);
            for (const res of resData) {
                if (res.status == 'canceled') {
                    continue
                }
                let resNights = computeNights(res.startDate, res.endDate);
                if (resNights < vipDays) {
                    continue
                }
                vipResCount++;
                res.nights = resNights;
                res.dow = computeDow(res.startDate);
                let tmpRecord = {}
                for (let key in reservHdrs) {
                    tmpRecord[key] = res[key];
                }
                tmpRecord.id = res.reservationID;
                vipResRecordsList.push(tmpRecord);
            }
            // vipResRecordsList.push('done');
            // vipResRecordsList.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
            // console.log("main: vipMainFuncs: getResList: ", vipResRecordsList);
            for (const vipres of vipResRecordsList) {
                vipCnt++;
                getVipDetail(vipres);
            }

            console.log("main: vipMainFuncs: getResList: --done--", vipCnt);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

module.exports = {
    getVIP
};