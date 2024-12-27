<script>
    import { Router, Route, Link } from "svelte-routing";
    import Dashboard from "./routes/Dashboard.svelte";
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


    export let url = "";
</script>

<main>
    <Styles dark />

	<PgTop />

    <Router>
        <Navbar color="light" theme="light">
            <NavbarBrand href="/" class="me-auto">sveltestrap</NavbarBrand>
            <Nav tabs>
                <NavItem active>
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

        <hr />
        <div>
            <Route path="/" component={Dashboard} />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
        </div>
    </Router>
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
