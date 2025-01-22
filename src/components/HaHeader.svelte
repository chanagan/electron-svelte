<script>
    import {
        Container,
        Input,
        Row,
        Col,
        Badge,
        Icon,
    } from "@sveltestrap/sveltestrap";

    import { countState } from "./sharedState.svelte.js";

    let haName = $state("");
    let haCount = $state(20);

    const get_HAs = () => {
        console.log("get_HA: ", haName);
    };
</script>

<Container>
    <Row>
        <Col xs="6">
            <Input
                id="plainExample"
                search
                bind:value={haName}
                placeholder="Enter a House Account Name"
            />
        </Col>
        <Col xs="1">
            <Icon name="search" size={16} onclick={get_HAs} />
            <!-- <Search size={32} onclick={get_HAs} /> -->
        </Col>
        <Col xs="1">
            <Input
                type="plaintext"
                value={countState.haCount}
                 />
        </Col>
    </Row>
</Container>

<!-- <Badge color="info">0</Badge> -->
