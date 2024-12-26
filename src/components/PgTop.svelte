<script>
    import { Button, Col, Row } from "@sveltestrap/sveltestrap";

    let ihLogo = "./images/ih-logo.png";
    let cbLogo = "./images/cb-logo.png";

</script>

<main class="container mb-2">
    <!-- <div class="container mb-2"> -->
        <div class="row">
            <div class="col align-items-center d-flex border-bottom justify-content-center">
                <img src={ihLogo} alt="IH Logo" width="300" height="100" />
            </div>
            <div class="col align-items-center d-flex border-bottom justify-content-center">
                <img src={cbLogo} alt="CB Logo" width="240" height="40" />
            </div>
        </div>
    <!-- </div> -->
    
    <!-- <Row>
        <Col>
        <Button color="primary">Primary</Button>
        </Col>
    </Row> -->
</main>

<style>

</style>
