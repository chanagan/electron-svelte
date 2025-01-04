<script>
    import { Button } from "carbon-components-svelte";
    import {DatePicker, DatePickerInput} from "carbon-components-svelte";

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
        }
    };
    let selectedDates = $state([]);
</script>

<main>
    
    <DatePicker datePickerType="range" bind:selectedDates={selectedDates} >
        <DatePickerInput id="date-picker-input-id-1" placeholder="mm/dd/yyyy" />
        <DatePickerInput id="date-picker-input-id-2" placeholder="mm/dd/yyyy" />
    </DatePicker>

    <!-- <div class="container">
        <div class="row">
            <div class="col-3 align-items-center d-flex justify-content-center">
                <h3>VIP Guests from:</h3>
            </div>
            <div class="col-2 align-items-center d-flex justify-content-center">
                <input type="date" id="vipFrmDt" style="padding-right: 5px;" />
            </div>
            <div class="col-1 align-items-center d-flex justify-content-center">
                <h3>to:</h3>
            </div>
            <div class="col-2 align-items-center d-flex justify-content-center">
                <input type="date" id="vipToDt" style="padding-right: 5px;" />
            </div>
            <div class="col-2 align-items-center d-flex justify-content-center">
                 <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    onclick={get_VIP}>Get VIPs</button> 
            </div>
        </div>
    </div> -->
    <Button kind="ghost" on:click={get_VIP}>Get VIPs</Button>

    <p>vipList: {vipList}</p>
    {#if vipList}
        {#key vipListRecords}
            <VipTable {vipListRecords} />
        {/key}
    {/if}


</main>

<style>
</style>
