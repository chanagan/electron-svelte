<script>
    import {
        Tag,
        // TextInput,
        // Grid, Row, Column,
    } from "carbon-components-svelte";
    import Search from "carbon-icons-svelte/lib/Search.svelte";
    import { Container, Input, Row, Col } from "@sveltestrap/sveltestrap";

    let haName = $state("");
    let haCount = $state(20);

    const get_HAs = () => {
        console.log("get_VIP: ", haName);
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
            <Search size={32} onclick={get_HAs} />
        </Col>
        <Col xs="1">
            <Tag type="blue">{haCount}</Tag>
        </Col>
    </Row>
</Container>

<!-- <Badge color="info">0</Badge> -->
