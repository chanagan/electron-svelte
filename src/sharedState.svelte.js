import { writable } from "svelte/store";

export const haDetRecord = $state({ detail: {} });

export const haCount = writable(0);
export const haSelected = writable(false);

export const haStatusOpen = writable(true);
export const haStatusClosed = writable(true);

export const haDetails = writable([]);

export const haRecord = writable({
    accountID: "",
    accountName: "",
    accountStatus: "",
    charges: {
        balance: 0,
        monMin: 0,
        minDelta: 0,
        minTax: 0,
        subTot: 0,
        creChg: 0,
        totChg: 0,
    },
    records: [],
});

export const haBalRecord = $state({
    accountID: "",
    accountName: "",
    accountStatus: "",
    charges: {
        balance: 0,
        monMin: 0,
        minDelta: 0,
        minTax: 0,
        subTot: 0,
        creChg: 0,
        totChg: 0,
    },
});