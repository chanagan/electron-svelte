<script>
    import { Container, Row, Col } from "@sveltestrap/sveltestrap";
    import { onMount, onDestroy } from "svelte";
    import SvelteTable from "svelte-table";
    import HaDetails from "./HaDetails.svelte";

    import { haCount } from "../store.js"

    const nFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
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
        },
        // {
        //     key: "balance",
        //     title: "Balance",
        //     value: v => v.charges.balance,
        //     renderValue: v => nFormat.format(v.charges.balance),
        //     class: "text-end",
        //     headerClass: "text-end",
        // },
        // {
        //     key: "monMin",
        //     title: "Min",
        //     value: v => v.charges.monMin,
        //     renderValue: v => nFormat.format(v.charges.monMin),
        //     class: "text-end",
        //     headerClass: "text-end",
        // },
        // {
        //     key: "minDelta",
        //     title: "Delta",
        //     value: v => v.charges.minDelta,
        //     renderValue: v => nFormat.format(v.charges.minDelta),
        //     class: "text-end",
        //     headerClass: "text-end",
        // },
        // {
        //     key: "minTax",
        //     title: "Tax",
        //     value: v => v.charges.minTax,
        //     renderValue: v => nFormat.format(v.charges.minTax),
        //     class: "text-end",
        //     headerClass: "text-end",
        // },
        // {
        //     key: "subTot",
        //     title: "Sub Total",
        //     value: v => v.charges.subTot,
        //     renderValue: v => nFormat.format(v.charges.subTot),
        //     class: "text-end",
        //     headerClass: "text-end",
        // },
        // {
        //     key: "creChg",
        //     title: "Cre Chg",
        //     value: v => v.charges.creChg,
        //     renderValue: v => nFormat.format(v.charges.creChg),
        //     class: "text-end",
        //     headerClass: "text-end",
        // },
        // {
        //     key: "totChg",
        //     title: "Total Chg",
        //     value: v => v.charges.totChg,
        //     renderValue: v => nFormat.format(v.charges.totChg),
        //     class: "text-end",
        //     headerClass: "text-end",
        // },
    ];

    let { haAcctRecordsList } = $props();
    haCount.set(haAcctRecordsList.length);

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
            const index = rows.findIndex((row) => row.accountID === keyID); //rows.findIndex(row => user.name === 'Bob');
            console.log("haTable: showHaDetails: ", event.data);
            rows[index].charges = event.data.haDetails.charges;
        }
    };
</script>

<main>
    <Container>
        <Row>
            <Col xs="5">
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
            </Col>
            <Col xs="7">
                <HaDetails />
            </Col>
        </Row>
    </Container>
</main>

<style>
</style>
