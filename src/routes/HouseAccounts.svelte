<script>
    import { Container, Row, Col } from "@sveltestrap/sveltestrap";
    import HaHeader from "../components/HaHeader.svelte";
    import HaStatus from "../components/HaStatus.svelte";

    import { onMount, onDestroy } from "svelte";
    import HaList from "../components/HaList.svelte";
    import HaDetails from "../components/HaDetails.svelte";

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
    };
</script>

<main>
    House Accounts

    <hr size="3" color="red" />

    <Container fluid>
        <Row>
            <Col xs="6">
                <HaHeader />
            </Col>
            <Col xs="1">
                <HaStatus />
            </Col>
        </Row>
        <hr size="3" color="red" />
        <Row>
            <Col xs="5">
                {#if haList}
                    {#key haAcctRecordsList}
                        <!-- <h3>House Accounts  </h3> -->
                        <HaList {haAcctRecordsList} />
                    {/key}
                {/if}
            </Col>
            <Col xs="7">
                <HaDetails />
            </Col>
        </Row>
    </Container>
</main>
<style>

</style>