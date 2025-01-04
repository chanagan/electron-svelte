<script>
    import { onMount, onDestroy } from "svelte";
    // Add any necessary JavaScript here
    let version = "";
    let dashboard = $state("");
    let arrivals = $state(""),
        departures = $state(""),
        gstsInHouse = $state(""),
        pctOccupied = $state(""),
        roomsOccupied = $state(""),
        bookings = $state(""),
        cancellations = $state(""),
        stayovers = $state(""),
        asOfDate = $state("");

    const get_dashboard = async () => {
        let dashDate = document.getElementById("dashDate").value;
        api.send("get/dashboard", dashDate);
        // dashboard = await api.getDashboard();
    };

    const showDashboard = (event) => {
        console.log("rend: dashboard: ", dashboard);
        if (event.data.type === "dashboard") {
            console.log("rend: event: ", event);
            dashboard = event.data.dashboard;

            arrivals = dashboard.arrivalsConfirmed;
            departures = dashboard.departuresConfirmed;
            gstsInHouse = dashboard.guestsInHouse;
            bookings = dashboard.bookings;
            cancellations = dashboard.cancellations;
            roomsOccupied = dashboard.roomsOccupied;
            stayovers = dashboard.stayovers;
            pctOccupied = dashboard.percentageOccupied;
            asOfDate = dashboard.property_now;
        }
    };

    onMount(() => {
        console.log("rend: dashboard onMount");
        window.addEventListener("message", showDashboard);
    });

    onDestroy(() => {
        console.log("rend: onDestroy");
        window.removeEventListener("message", showDashboard);
    });
</script>

<main>
    <!-- <Styles dark /> -->
    <div class="container">
        <div class="row">
            <div class="col-3 align-items-center d-flex justify-content-center">
                <h3>Dashboard for:</h3>
            </div>
            <div class="col-2 align-items-center d-flex justify-content-center">
                <input type="date" id="dashDate" style="padding-right: 5px;" />
            </div>
            <div class="col-2 align-items-center d-flex justify-content-center">
                <button
                    type="button"
                    class="btn btn-secondary btn-sm"
                    onclick={get_dashboard}>Get Dashboard</button
                >
            </div>
        </div>
    </div>

    {#if dashboard}
        <table>
            <thead>
                <tr>
                    <th colspan="4" text-align="center">Dashboard</th>
                </tr>
                <tr>
                    <th colspan="4" text-align="center">As of Now: {asOfDate}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Arrivals</th>
                    <td>{arrivals}</td>
                    <th>Bookings</th>
                    <td>{bookings}</td>
                </tr>
                <tr>
                    <th>Departures</th>
                    <td>{departures}</td>
                    <th>Cancellations</th>
                    <td>{cancellations}</td>
                </tr>
                <tr>
                    <th>Guests In House</th>
                    <td>{gstsInHouse}</td>
                    <th>Stayovers</th>
                    <td>{stayovers}</td>
                </tr>
                <tr>
                    <th>Occupancy %</th>
                    <td>{pctOccupied}%</td>
                    <th>Rooms</th>
                    <td>{roomsOccupied}</td>
                </tr>
            </tbody>
        </table>
    {/if}
</main>

<style>
    h3 {
        color: blue;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    tbody tr {
        border-bottom: 1px solid #ddd;
        text-align: left;
    }
    thead {
        background-color: #f2f2f2;
        border-bottom: 3px solid black;
    }
    thead tr {
        text-align: center;
    }
</style>
