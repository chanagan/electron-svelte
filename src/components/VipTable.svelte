<script>
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
    ];

    let rows = [];

    import { DataTable } from "carbon-components-svelte";

    let { vipListRecords } = $props();
    vipListRecords.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
    console.log("vipTable: props: ", vipListRecords);

    vipListRecords.forEach((record) => {
        rows.push(record);
    });

    console.log("vipTable: props: ", "after props");
</script>

<main>
    <DataTable stickyHeader={true} {headers} {rows} />
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        /* max-width: 240px; */
        margin: 0 auto;
    }
</style>
