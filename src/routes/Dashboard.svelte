<script>
    import { onMount, onDestroy } from "svelte";
    import { Button, Container, Row, Col, Styles } from "@sveltestrap/sveltestrap";
    // Add any necessary JavaScript here
    let version = "";
    let dashboard = "";
    let arrivals = "",
        departures = "",
        gstsInHouse = "",
        pctOccupied = "",
        roomsOccupied = "",
        bookings = "",
        cancellations = "",
        stayovers = "",
        asOfDate = "";

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
        console.log("rend: onMount");
        window.addEventListener("message", showDashboard);
    });

    onDestroy(() => {
        console.log("rend: onDestroy");
        window.removeEventListener("message", showDashboard);
    });
</script>

<main>
    <Styles dark />
    <Container mb-5>
        <Row>
            <Col>
                <h3>Dashboard</h3> 
            </Col>
            <Col>
                <input type="date" id="dashDate" style="padding-right: 5px;" />
            </Col>
            <Col>
                <Button color="secondary" onclick={get_dashboard}>Get Dashboard</Button>
            </Col>
        </Row>
    </Container>
    <!-- <h1>Dashboard</h1>
    <input type="date" id="dashDate" style="padding-right: 5px;" />
    <Button color="primary" onclick={get_dashboard}>Get Dashboard</Button> -->
    <!-- <button onclick={get_dashboard}>Get Dashboard</button> -->

    {#if dashboard}
        <table>
            <thead>
                <tr>
                    <th colspan="4" text-align="center">Dashboard</th>
                </tr>
                <tr>
                    <th colspan="2" text-align="center">As of Today</th>
                    <th colspan="2" text-align="center">{asOfDate}</th>
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
                    <th>Occupancy Rooms</th>
                    <td>{roomsOccupied}</td>
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
    thead {
        background-color: #f2f2f2;
        border-bottom: 1px solid black;

    }
    thead tr {
        text-align: center;
    }
</style>
