<script>
    import { Container, Row, Col } from "@sveltestrap/sveltestrap";
    import HaHeader from "../components/HaHeader.svelte";
    import HaStatus from "../components/HaStatus.svelte";
    import HaTable from "../components/HaTable.svelte";

    import { onMount, onDestroy } from "svelte";
    let haList = $state(false);
    let haAcctRecordsList = $state([]);

    onMount(() => {
        console.log("rend:ha onMount");
        window.addEventListener("message", showHAs);
        api.send("get/ha", {});
    });

    onDestroy(() => {
        console.log("rend: onDestroy");
        window.removeEventListener("message", showHAs);
    });

    const showHAs = (event) => {
        console.log("rend: ha: event: ", event);
        if (event.data.type === "haList") {
            haList = true;
            haAcctRecordsList = event.data.haAcctRecordsList;
            // console.log("rend: event: ", haAcctRecordsList);
        }
    }
</script>

<main>

    House Accounts

    <hr size="3" color="red" />

    <Container>
        <Row>
            <Col>
                <HaHeader />
            </Col>
            <Col>
                <HaStatus />
            </Col>
        </Row>
    </Container>
    <hr size="3" color="red" />
    {#if haList}
        {#key haAcctRecordsList}
        <!-- <h3>House Accounts  </h3> -->
            <HaTable {haAcctRecordsList} />
        {/key}
    {/if}

</main>