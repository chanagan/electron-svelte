<script>
    import {
        Container,
        Input,
        Row,
        Col,
        Badge,
        Icon,
    } from "@sveltestrap/sveltestrap";

    import { haCount } from "../store.js";

    let rCount = $state(0);
    // haCount.subscribe((value) => {
    //     rCount = value;
    // });

    let haName = $state("");
    // let haCount = $state(20);

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
            <!-- <Input
                type="plaintext"
                value={haCount}"
                 /> -->
        </Col>
    </Row>
</Container>

<!-- <Badge color="info">0</Badge> -->
