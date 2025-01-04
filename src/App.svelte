<script>
  import { run } from 'svelte/legacy';

    import "carbon-components-svelte/css/all.css";
    import { Router, Route, Link } from "svelte-routing";
    import Dashboard from "./routes/Dashboard.svelte";
    import Vip from "./routes/Vip.svelte";
    import Blog from "./routes/Blog.svelte";

    import {
        Styles,
        Nav,
        NavItem,
        NavLink,
        Navbar,
        NavbarBrand,
    } from "@sveltestrap/sveltestrap";

    import PgTop from "./components/PgTop.svelte";


  let theme = "g10"; // "white" | "g10" | "g80" | "g90" | "g100"

  run(() => {
    document.documentElement.setAttribute("theme", theme);
  });

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
                        <Link to="/vip">Vip</Link>
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
            <Route path="/vip" component={Vip} />
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

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
