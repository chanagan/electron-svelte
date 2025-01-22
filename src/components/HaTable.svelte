<script>
    import { DataTable, Pagination } from "carbon-components-svelte";
    import { onMount, onDestroy } from "svelte";
    // import { Column, Table } from "@sveltestrap/sveltestrap";
    import SvelteTable from "svelte-table";
    const nFormat = new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD", 
        });
    const headers = [
        { key: "accountID", value: "Account ID" },
        { key: "accountName", value: "Account Name" },
    ];
    const columns = [
        {
            key: "accountID",
            title: "ID",
            value: (v) => v.accountID,
            headerClass: "text-left",
            filterOptions: { enabled: false },
        },
        {
            key: "accountName",
            title: "Name",
            value: (v) => v.accountName,
            class: "text-start",
            headerClass: "text-start",
            // filterOptions: (rows) => {
            //     // use first letter of first_name to generate filter
            //     let letrs = {};
            //     rows.forEach((row) => {
            //         let letr = row.accountName.charAt(0);
            //         if (letrs[letr] === undefined)
            //             letrs[letr] = {
            //                 name: `${letr.toUpperCase()}`,
            //                 value: letr.toLowerCase(),
            //             };
            //     });
            //     // fix order
            //     letrs = Object.entries(letrs)
            //         .sort()
            //         .reduce((o, [k, v]) => ((o[k] = v), o), {});
            //     return Object.values(letrs);
            // },
            // filterValue: (v) => v.accountName.charAt(0).toLowerCase(),
        },
        // {
        //     key: "charges",
        //     title: "Charges",
        //     value: (v) => v.charges,
        //     headerClass: "text-right",
        // },
        {
            key: "balance",
            title: "Balance",
            value: v => v.charges.balance,
            renderValue: v => nFormat.format(v.charges.balance),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "monMin",
            title: "Min",
            value: v => v.charges.monMin,
            renderValue: v => nFormat.format(v.charges.monMin),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "minDelta",
            title: "Delta",
            value: v => v.charges.minDelta,
            renderValue: v => nFormat.format(v.charges.minDelta),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "minTax",
            title: "Tax",
            value: v => v.charges.minTax,
            renderValue: v => nFormat.format(v.charges.minTax),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "subTot",
            title: "Sub Total",
            value: v => v.charges.subTot,
            renderValue: v => nFormat.format(v.charges.subTot),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "creChg",
            title: "Cre Chg",
            value: v => v.charges.creChg,
            renderValue: v => nFormat.format(v.charges.creChg),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "totChg",
            title: "Total Chg",
            value: v => v.charges.totChg,
            renderValue: v => nFormat.format(v.charges.totChg),
            class: "text-end",
            headerClass: "text-end",
        },
    ];

    let { haAcctRecordsList } = $props();

    console.log("haTable: props: ", haAcctRecordsList);

    let rows = $state([]);
    let limit = 10;
    let rowCnt = 0;
    for (let i = 0; i < limit; i++) {
        rows.push(haAcctRecordsList[i]);
        rowCnt++;
    }

    let selectedRow = [];
    let rowKey = $state("accountID");

    onMount(() => {
        console.log("haTable: onMount: ");
        window.addEventListener("message", showHaDetails);
    });

    onDestroy(() => {
        console.log("haTable: onDestroy: ");
        window.removeEventListener("message", showHaDetails);
    });

    const onSelect = (event) => {
        const rowID = event.detail.row.accountID;
        const actName = event.detail.row.accountName;
        const actStatus = event.detail.row.status;
        console.log("haTable: onSelect: ", rowID);
        // api.send("get/haDetails", event.detail.row.accountID);
        api.send("get/haDetails", { rowID, actName, actStatus });
        console.log("haTable: onSelect: ", selectedRow);
    };

    const showHaDetails = (event) => {
        console.log("haTable: showHaDetails: ");
        if (event.data.type === "haDetails") {
            let keyID = event.data.haDetails.accountID;
            const index = rows.findIndex(row => row.accountID === keyID); //rows.findIndex(row => user.name === 'Bob');
            console.log("haTable: showHaDetails: ", event.data);
            rows[index].charges = event.data.haDetails.charges;
        }
    };
</script>

<main>
    <div class="container">
        <SvelteTable
            {columns}
            {rows}
            on:clickRow={onSelect}
            selectSingle={false}
            selectOnClick={false}
            selected={selectedRow}
            classNameRowSelected="row-selected"
            rowKey={"accountID"}
        ></SvelteTable>
        <!-- 
-->
    </div>

</main>

<style>
    .container {
        width: 100%;
        height: 30rem;
        overflow: auto;
    }
    :global(.row-selected) {
        background-color: #f8c;
    }
</style>
