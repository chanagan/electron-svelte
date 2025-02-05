<script>
    // import { Button } from "carbon-components-svelte";
    import { Button } from "@sveltestrap/sveltestrap";
    import { DatePicker, DatePickerInput } from "carbon-components-svelte";
    import { Grid, Row, Column } from "carbon-components-svelte";
    import  Search  from "carbon-icons-svelte/lib/Search.svelte";

    import { onMount, onDestroy } from "svelte";
    import VipTable from "../components/VipTable.svelte";

    let vipList = $state(false);
    let vipListRecords = $state([]);
    let vipFrmDt = "";
    let vipToDt = "";
    const get_VIP = () => {
        vipFrmDt = document.getElementById("vipFrmDt").value;
        vipToDt = document.getElementById("vipToDt").value;
        console.log("rend: VIPs from", vipFrmDt, "to", vipToDt);
        api.send("get/vip", { vipFrmDt, vipToDt });
    };

    let vipCount = $state(0);

    onMount(() => {
        vipList = false;
        console.log("rend:vip onMount");
        window.addEventListener("message", showVIP);
    });

    onDestroy(() => {
        console.log("rend: onDestroy");
        window.removeEventListener("message", showVIP);
    });

    const showVIP = (event) => {
        console.log("rend: event: ", event);
        if (event.data.type === "vipResDetail") {
            vipList = true;
            // console.log("rend: VIPs: ", event.data.vipResDetailRecordsList);
            vipListRecords = event.data.vipResDetailRecordsList;
            vipCount = vipListRecords.length;
        }
    };
    let vipSelDates = $state([]);
</script>

<main>
    <Grid>
        <Row>
            <Column>
                <h1>VIPs</h1>
            </Column>
        </Row>
    </Grid>

    <DatePicker datePickerType="range" dateFormat="Y-m-d" id="vipSelDates">
        <Grid>
            <Row class='align-items-end'>
                <Column>
                    <DatePickerInput
                        labelText="From Date"
                        id="vipFrmDt"
                        placeholder="yyyy-mm-dd"
                    />
                </Column>
                <Column>
                    <DatePickerInput
                        labelText="To Date"
                        id="vipToDt"
                        placeholder="yyyy-mm-dd"
                    />
                </Column>
                <Column>
                    <Button
                    on:click={get_VIP}
                    class=""
                    active={false}
                    block={false}
                    content="Search"
                    close={false}
                    color="info"
                    disabled={false}
                    href=""
                    outline={true}
                    size="md"
                    value=""/>
                    <!-- <Search size={32} title="Get VIPs" on:click={get_VIP} /> -->
                    <!-- <Button kind="tertiary" on:click={get_VIP}>Get VIPs</Button> -->
                </Column>
            </Row>
        </Grid>
    </DatePicker>


    <p>Count: {vipCount}</p>
    {#if vipList}
        {#key vipListRecords}
            <VipTable {vipListRecords} />
        {/key}
    {/if}
</main>

<style>
</style>
