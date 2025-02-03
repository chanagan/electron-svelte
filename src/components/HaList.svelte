<script>
    import { Table, Container, Row, Col } from "@sveltestrap/sveltestrap";
    import { onMount, onDestroy } from "svelte";
    import SvelteTable from "svelte-table";
    import HaDetails from "./HaDetails.svelte";

    import { haCount } from "../sharedState.svelte.js";
    import { haDetails } from "../sharedState.svelte.js";
    import { haRecord } from "../sharedState.svelte.js";

    import { haDetRecord } from "../sharedState.svelte.js";

    import { haBalRecord } from "../sharedState.svelte.js";

    haDetails.set(null);

    const columns = [
        {
            key: "accountID",
            title: "ID",
            value: (v) => v.accountID,
            class: "text-start",
            headerClass: "header text-start",
            // filterOptions: { enabled: false },
        },
        {
            key: "accountName",
            title: "Name",
            value: (v) => v.accountName,
            class: "text-start",
            headerClass: "header text-start",
        },
    ];

    let { haAcctRecordsList } = $props();

    haCount.set(haAcctRecordsList.length);

    console.log("haList: props: ", haAcctRecordsList);

    // limit rows to 10 for now
    let rows = $state([]);
    // let limit = 10;
    let limit = haAcctRecordsList.length;
    let rowCnt = 0;
    for (let i = 0; i < limit; i++) {
        rows.push(haAcctRecordsList[i]);
        rowCnt++;
    }

    let selectedRow = [];
    let rowKey = $state("accountID");

    onMount(() => {
        console.log("haList: onMount: ");
        window.addEventListener("message", showHaDetails);
    });

    onDestroy(() => {
        console.log("haList: onDestroy: ");
        window.removeEventListener("message", showHaDetails);
    });

    let haSelected = $state(false);

    // tell main we want details for the selected row
    const onSelect = (event) => {
        let thisTR = event.target.parentNode;
        let rowID = thisTR.dataset.key;
        let actName = thisTR.dataset.name;
        let accountStatus = thisTR.dataset.status;
        // const rowID = thisTR.dataset.key;
        // const actName = event.detail.row.accountName;
        // const actStatus = event.detail.row.accountStatus;
        console.log("haList: onSelect: ", rowID);
        // api.send("get/haDetails", event.detail.row.accountID);
        api.send("get/haDetails", { rowID, actName, accountStatus });
        // console.log("haTable: onSelect: ", selectedRow);
    };

    // get the details for the selected row from main
    const showHaDetails = (event) => {
        console.log("haList: showHaDetails: ");
        if (event.data.type === "haDetails") {
            // this is the selected row
            let keyID = event.data.haDetails.accountID;
            // find the index of the selected row
            const index = rows.findIndex((row) => row.accountID === keyID); //rows.findIndex(row => user.name === 'Bob');
            console.log("haList: showHaDetails: ", event.data);
            // rows[index].charges = event.data.haDetails.charges;
            haRecord.set(event.data.haDetails);
            haSelected = true;
            // haDetRecord.detail = event.data.haDetails;
            // haDetails.update(event.data.haDetails);
        }
    };
</script>

<main>
    <div class="container haContainer">
        <Table bordered size="sm" hover>
            <thead class="header table-dark">
                <tr>
                    {#each columns as c}
                        <th class={c.headerClass}>{c.title}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each rows as row}
                    <tr
                        onclick={onSelect}
                        data-key={row.accountID}
                        data-name={row.accountName}
                        data-status={row.accountStatus}
                    >
                        {#each columns as c}
                            <td class={c.class}>{row[c.key]}</td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </Table>
    </div>
    <!-- <Container>
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
                {#if haSelected}
                    <HaDetails />
                {/if}
            </Col>
        </Row>
    </Container> -->
</main>

<style>
    .header {
        position: sticky;
        top: 0;
    }

    .haContainer {
        width: 100%;
        height: 450px;
        overflow: auto;
    }
</style>
