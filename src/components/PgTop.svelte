<script>
    // import { Button, Col, Row } from "@sveltestrap/sveltestrap";
    // import { Grid, Row, Column } from "carbon-components-svelte";
    import { Container, Row, Col } from "@sveltestrap/sveltestrap";

    let ihLogo = "./images/ih-logo.png";
    let cbLogo = "./images/cb-logo.png";

</script>

<main>
    <Container>
        <Row class="align-items-center">
            <Col xs="6">
                <img src={ihLogo} alt="IH Logo" width="300" height="100" />
            </Col>
            <Col xs="6">
                <img src={cbLogo} alt="CB Logo" width="240" height="40" />
            </Col>
        </Row>
    </Container>
</main>


<style>

</style>
