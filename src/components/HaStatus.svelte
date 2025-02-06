<script>
    import { Input } from "@sveltestrap/sveltestrap";

    import { haStatusOpen, haStatusClosed } from "../sharedState.svelte.js";
    const toggleOpen = (e) => {
        console.log("toggleOpen", e.target.checked);
        haStatusOpen.set(e.target.checked);
    }

    const toggleClosed = (e) => {
        console.log("toggleClosed", e.target.checked);
        haStatusClosed.set(e.target.checked);
    }
    

</script>


<Input type='switch' checked={haStatusOpen} 
    label='Open' id='haStatusOpen' bsSize='sm' onclick={toggleOpen} />
<Input type='switch' checked={haStatusClosed}
label='Closed' id='haStatusClosed' bsSize='sm' onclick={toggleClosed} />