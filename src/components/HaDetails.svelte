<script>
    import { Container, Row, Col } from "@sveltestrap/sveltestrap";
    import { onMount, onDestroy } from "svelte";
    // import SvelteTable from "svelte-table";

    import HaDetTable from "./HaDetTable.svelte";
    import HaDetRecords from "./HaDetRecords.svelte";

    // import { haDetails } from "../sharedState.svelte.js";
    import { haRecord } from "../sharedState.svelte.js";
    // import { haDetRecord } from "../sharedState.svelte.js";

    // let {haRecord} = $props()
    console.log("haDetails: stores: ", $haRecord);

    const nFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    // console.log("haDetails: ", $haRecord);

    const columns = [
        {
            key: "balance",
            title: "Balance",
            value: (v) => v.charges.balance,
            renderValue: (v) => nFormat.format(v.charges.balance),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "monMin",
            title: "Min",
            value: (v) => v.charges.monMin,
            renderValue: (v) => nFormat.format(v.charges.monMin),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "minDelta",
            title: "Delta",
            value: (v) => v.charges.minDelta,
            renderValue: (v) => nFormat.format(v.charges.minDelta),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "minTax",
            title: "Tax",
            value: (v) => v.charges.minTax,
            renderValue: (v) => nFormat.format(v.charges.minTax),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "subTot",
            title: "Sub Total",
            value: (v) => v.charges.subTot,
            renderValue: (v) => nFormat.format(v.charges.subTot),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "creChg",
            title: "Cre Chg",
            value: (v) => v.charges.creChg,
            renderValue: (v) => nFormat.format(v.charges.creChg),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "totChg",
            title: "Total Chg",
            value: (v) => v.charges.totChg,
            renderValue: (v) => nFormat.format(v.charges.totChg),
            class: "text-end",
            headerClass: "text-end",
        },
    ];

</script>

<main>
    {#if $haRecord.accountID}
        <Container>
            <Row>
                <Col>
                    {#key $haRecord.accountID}
                    <HaDetTable {$haRecord}/>
                    {/key}
                </Col> 
            </Row>
            <b>{$haRecord.accountName}</b>
            <Row>
                <Col>
                    {#key $haRecord.accountID}
                    <HaDetRecords />
                    {/key}
                </Col>
            </Row>
        </Container>
    {:else}
        <h6>No House Account Details</h6>
    {/if}
</main>

<style>

</style>
