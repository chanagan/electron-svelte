<script>
	import { Button, Styles } from "@sveltestrap/sveltestrap";
    // Add any necessary JavaScript here
    let version = "";
    let dashboard = "";
    let arrivals = "",
        departures = "";
    let gstsInHouse = "",
        pctOccupied = "",
        asOfDate = "";

    const get_dashboard = async () => {
        api.send("get/dashboard");
        // dashboard = await api.getDashboard();
    };

    window.addEventListener("message", (event) => {
        console.log("rend: event: ", event);
        dashboard = event.data.dashboard;
		
        console.log("rend: dashboard: ", dashboard);

        arrivals = dashboard.arrivals;
        departures = dashboard.departures;
        gstsInHouse = dashboard.guestsInHouse;
        pctOccupied = dashboard.percentageOccupied;
        asOfDate = dashboard.property_now;
    });

</script>

<main>
    <h1>Dashboard</h1>
    <button onclick={get_dashboard}>Dashboard: {dashboard || "Get Dashboard"}</button>

    {#if dashboard}
        <table>
            <tbody>
                <tr>
                    <th>Arrivals</th>
                    <td>{arrivals}</td>
                </tr>
                <tr>
                    <th>Departures</th>
                    <td>{departures}</td>
                </tr>
                <tr>
                    <th>Guests In House</th>
                    <td>{gstsInHouse}</td>
                </tr>
                <tr>
                    <th>Occupancy</th>
                    <td>{pctOccupied}%</td>
                </tr>
                <tr>
                    <th>As of</th>
                    <td>{asOfDate}</td>
                </tr>
            </tbody>
        </table>
    {/if}
</main>

<style>
    h1 {
        color: blue;
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    tr {
        border-bottom: 1px solid #ddd;
        text-align: left;
    }
</style>
