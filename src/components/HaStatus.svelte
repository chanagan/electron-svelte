<script>
    import { Input } from "@sveltestrap/sveltestrap";

    import { haStatusOpen, haStatusClosed } from "../sharedState.svelte.js";
    import { OpenPanelFilledBottom } from "carbon-icons-svelte";
    const toggleOpen = (e) => {
        console.log("toggleOpen", e.target.checked);
        haStatusOpen.set(e.target.checked);
    };

    const toggleClosed = (e) => {
        console.log("toggleClosed", e.target.checked);
        haStatusClosed.set(e.target.checked);
    };
</script>

<span class="haStatusOpen">
    <Input
        type="switch"
        checked={haStatusOpen}
        label="Open"
        id="haStatusOpen"
        bsSize="sm"
        onclick={toggleOpen}
    />
</span>
<span class="haStatusClosed">
    <Input
        type="switch"
        checked={haStatusClosed}
        label="Closed"
        id="haStatusClosed"
        bsSize="sm"
        onclick={toggleClosed}
    />
</span>

<style>
    .haStatusOpen {
        color: #18966c;
    }
    .haStatusClosed {
        color: #961861;
    }
</style>
