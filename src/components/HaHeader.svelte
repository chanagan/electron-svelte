<script>
    import {
        Container,
        Input,
        Row,
        Col,
        Icon,
    } from "@sveltestrap/sveltestrap";

    import { haCount } from "../sharedState.svelte.js";



    let haName = $state("");

    const get_HAs = () => {
        console.log("get_HA: ", haName);
    };
</script>

<Container>
    <Row class="align-items-center">
        <Col xs="6">
            <Input
                id="plainExample"
                search
                bind:value={haName}
                placeholder="Enter a House Account Name"
            />
        </Col>
        <Col xs="1">
            {#if haName}
                <Icon name="search" size={32} onclick={get_HAs} />
            {/if}
        </Col>
        <Col xs="3">
            {#if $haCount > 0}
            Accounts: {$haCount} 
            {/if}
 
        </Col>
    </Row>
</Container>
