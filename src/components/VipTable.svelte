<script>
    import { DataTable, Pagination } from "carbon-components-svelte";

    const headers = [
        // { key: "reservationID", value: "Res ID" },
        { key: "guestName", value: "Guest Name" },
        { key: "nights", value: "Nights" },
        { key: "startDate", value: "Check In" },
        { key: "dow", value: "Dow" },
        { key: "adults", value: "Adults" },
        // { key: "guestID", value: "Guest ID" },
        { key: "guestLastName", value: "Last" },
        { key: "guestFirstName", value: "First" },
        // { key: "isMainGuest", value: "Main?" },
        { key: "guestStatus", value: "Status" },
        { key: "roomName", value: "Room" },
        // { key: "icons", value: "Functions" },
    ];

    let selectedRowIds = $state([]);

    let rows = [];

    let { vipListRecords } = $props();
    vipListRecords.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
    // console.log("vipTable: props: ", vipListRecords);

    vipListRecords.forEach((record) => {
        // console.log("vipTable: ea record: ", record);
        rows.push(record);
    });

    console.log("vipTable: props: ", "after props");
    $inspect(selectedRowIds);
    const onSelect = (e) => {
        console.log("vipTable: onSelect: ", e.detail);
        $inspect(e.detail);
    };
    let pageSize = $state(5);
    let page = $state(1);
</script>

<main>
    <DataTable
        stickyHeader={true}
        {headers}
        {rows}
        {pageSize}
        {page}
        {selectedRowIds}
        on:select={onSelect}
    />
    <!-- <svelte:fragment slot="cell" let:row let:cell>
            {#if cell.key === "icons"}
                <DataView size={32} title="View" />
            {:else}
                {cell.value}
            {/if}
        </svelte:fragment> -->
    <!-- </DataTable> -->
    <Pagination
        bind:pageSize
        bind:page
        totalItems={rows.length}
        pageSizeInputDisabled
    />
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        /* max-width: 240px; */
        margin: 0 auto;
    }
</style>
