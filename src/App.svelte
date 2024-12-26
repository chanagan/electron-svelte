<script>
    import { Router, Route, Link } from "svelte-routing";
    import Home from "./routes/Dashboard.svelte";
    import About from "./routes/About.svelte";
    import Blog from "./routes/Blog.svelte";

    import { Container, Row, Col } from "@sveltestrap/sveltestrap";
    import { Button, Styles } from "@sveltestrap/sveltestrap";
    import {
        Collapse,
        Nav,
        NavItem,
        NavLink,
        Navbar,
        NavbarBrand,
        NavbarToggler,
    } from "@sveltestrap/sveltestrap";

    import PgTop from "./components/PgTop.svelte";
    import Dashboard from "./routes/Dashboard.svelte";

    // export let name;
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

    const get_version = async () => {
        version = await api.getVersion();
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

    export let url = "";
</script>

<main>
    <Styles />
    <!-- <img src={ihLogo} alt="IH Logo" width="100" height="100"> -->

    <PgTop />

    <Router>
        <!-- <Container fluid>
            <Row>
                <Col>
					<Link to="/">Dashboard</Link>
				</Col>
                <Col>
					<Link to="/about">About</Link>
				</Col>
                <Col>
					<Link to="/blog">Blog</Link>
				</Col>
            </Row>
        </Container> -->
        <Navbar color="light" theme="light">
            <NavbarBrand href="/" class="me-auto">sveltestrap</NavbarBrand>
            <Nav tabs>
                <NavItem>
                    <NavLink>
                        <Link to="/">Dashboard</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to="/about">About</Link>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        <Link to="/blog">Blog</Link>
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>

        <!-- <div class="navbar">
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <Link to="/">Dashboard</Link>
                </li>
                <li class="nav-item">
                    <Link to="/about">About</Link>
                </li>
                <li class="nav-item">
                    <Link to="/blog">Blog</Link>
                </li>
            </ul>
        </div> -->

        <hr />
        <div>
            <Route path="/" component={Dashboard} />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
        </div>
    </Router>
    <!-- <h1>Hello {name}! you stud</h1> -->
    <!-- <p>
        Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
        how to build Svelte apps.
    </p> -->

    <!-- <Button color="primary">Primary</Button> -->
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    th {
        text-align: left;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
    .NavItem {
        display: flex;
        justify-content: space-around;
        margin: 10px 0;
    }
</style>
