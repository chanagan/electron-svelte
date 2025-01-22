<script>
    // import { Button, Col, Row } from "@sveltestrap/sveltestrap";
    import { Grid, Row, Column } from "carbon-components-svelte";

    let ihLogo = "./images/ih-logo.png";
    let cbLogo = "./images/cb-logo.png";



</script>

<main>
    <Grid>
        <Row>
            <Column vertical-alighment="center">
                <img src={ihLogo} alt="IH Logo" width="300" height="100" />
            </Column>
            <Column vertical-alighment="center">
                <img src={cbLogo} alt="CB Logo" width="240" height="40" />
            </Column>
        </Row>
    </Grid>
</main>


<style>

</style>
