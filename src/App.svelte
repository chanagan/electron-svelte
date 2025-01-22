<script>
    import "carbon-components-svelte/css/all.css";
    // import { Router, Route, Link } from "svelte-routing";
    import Dashboard from "./routes/Dashboard.svelte";
    import Vip from "./routes/Vip.svelte";
    import Blog from "./routes/Blog.svelte";
    import HouseAccounts from "./routes/HouseAccounts.svelte";

    import { route, Router } from "@mateothegreat/svelte5-router";

    const routes = [
        {
            path: "/",
            component: Dashboard,
        },
        {
            path: "hseaccts",
            component: HouseAccounts,
        },
        {
            path: "vip",
            component: Vip,
        },
        {
            path: "blog",
            component: Blog,
        },
    ];

    import {
        Styles,
        Nav,
        NavItem,
        NavLink,
        Navbar,
        NavbarBrand,
    } from "@sveltestrap/sveltestrap";

    import PgTop from "./components/PgTop.svelte";

    let theme = 'light'

    $effect.pre(() => {
        document.documentElement.setAttribute("theme", theme);
    });
</script>

<main>
    <Styles {theme} />
    <PgTop />

    <Navbar color="primary" theme="dark">
        <NavbarBrand href="/" >Island House</NavbarBrand>
        <Nav tabs>
            <NavItem active>
                <NavLink>
                    <a use:route href="/"  class="bx--header__menu-item" >Dashboard</a>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink>
                    <a use:route href="/hseaccts" class="bx--header__menu-item">House Accounts</a>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink>
                    <a use:route href="/vip" class="bx--header__menu-item">VIP</a>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink>
                    <a use:route href="/blog" class="bx--header__menu-item">Blog</a>
                </NavLink>
            </NavItem>
        </Nav>
    </Navbar>
    <Router base="/" {routes} />

    <!-- <a use:route href="/" class="bx--header__menu-item">Dashboard</a>
    <a use:route href="/vip" class="bx--header__menu-item">VIP</a>
    <a use:route href="/blog" class="bx--header__menu-item">Blog</a> -->
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
