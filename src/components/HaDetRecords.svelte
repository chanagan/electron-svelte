<script>
    import { haRecord } from "../sharedState.svelte.js";
    import { Table, Container, Row, Col } from "@sveltestrap/sveltestrap";
    import { onMount, onDestroy } from "svelte";

    const nFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    let xTbody = $state(null);
    onMount(() => {
        // console.log("rend:haDetRecords onMount");
        xTbody = document.getElementById("haDetRecordsTbody");

        xTbody.addEventListener("mouseover", function (e) {
            // console.log("rend: xTbody: mouseover");
            showDetailNotes(e);
        });
    });

    onDestroy(() => {
        // console.log("rend: onDestroy");
        xTbody.removeEventListener("mouseover", showDetailNotes);
    });

    const columns = [
        {
            key: "transactionDateTime",
            title: "Trans Date",
            value: (v) => v.transactionDateTime,
            class: "text-start",
            headerClass: "header text-start",
        },
        {
            key: "credit",
            title: "Charge",
            value: (v) => v.credit,
            renderValue: (v) => nFormat.format(v.credit),
            class: "text-end",
            headerClass: "header text-end",
        },
        {
            key: "debit",
            title: "Payment",
            value: (v) => v.debit,
            renderValue: (v) => nFormat.format(v.debit),
            class: "text-end",
            headerClass: "header text-end",
        },
        {
            key: "balance",
            title: "Balance",
            value: (v) => v.balance,
            renderValue: (v) => nFormat.format(v.balance),
            class: "text-end",
            headerClass: "header text-end",
        },
    ];

    let rowCnt = $haRecord.records.length;
    let records = $haRecord.records;

    // first, sort oldest to newest
    records.sort((a, b) =>
        a.transactionDateTime > b.transactionDateTime ? 1 : -1
    );

    // set the initial balance
    records[0].balance = records[0].credit - records[0].debit;

    // loop through and compute the balance for each record
    for (let i = 1; i < rowCnt; i++) {
        records[i].balance =
            records[i].credit - records[i].debit + records[i - 1].balance;
    }

    // first, sort newest to oldest
    records.sort((a, b) =>
        a.transactionDateTime < b.transactionDateTime ? 1 : -1
    );

    let rows = $state([]);

    rows = records;
    const showDetailNotes = (event) => {
        let thisTR = event.target.parentNode;
        document.getElementById("haDtlDivDesc").innerHTML =
            thisTR.getAttribute("data-desc");
        document.getElementById("haDtlDivNotes").innerHTML =
            thisTR.getAttribute("data-note");
    };

    console.log("haDetRecords: stores: ", $haRecord.records.length);
</script>

<main>
    <!-- 
            newRow = `<tr data-note="${thisRecord['notes']}" data-desc="${thisRecord['description']}">`;

    -->
    
    <div class="container notesContainer">
        <div class='row'>
            <div class="col-3 headerNotes">Description</div>
            <div class="col-9 textNotes"> <span id="haDtlDivDesc"></span></div>
        </div>
        <div class='row'>
            <div class="col-3 headerNotes">Notes</div>
            <div class="col-9 textNotes"> <span id="haDtlDivNotes"></span></div>
        </div>
    </div>
    <div class="container recContainer">
        {#key $haRecord.accountID}
            <Table bordered size="sm" hover>
                <thead class="header table-dark">
                    <tr>
                        {#each columns as c}
                            <th class={c.headerClass}>{c.title}</th>
                        {/each}
                    </tr>
                </thead>

                <tbody id="haDetRecordsTbody">
                    {#each rows as r}
                        <tr data-note={r.notes} data-desc={r.description}>
                            {#each columns as c}
                                {#if c.key != "transactionDateTime"}
                                    <td class={c.class}
                                        >{nFormat.format(r[c.key])}</td
                                    >
                                {:else}
                                    <td class={c.class}>{r[c.key]}</td>
                                {/if}
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </Table>
        {/key}
    </div>
</main>

<style> 
    .header {
        position: sticky;
        top: 0;
    }

    .recContainer {
        width: 100%;
        height: 300px;
        overflow: auto;
    }
    .notesContainer {
        width: 100%;
        height: 50px;
        overflow: auto;
    }
    .hover {
        background-color: #331896;
    }
    .headerNotes {
        text-align: start;
        color: white;
        background-color: #000000;
    }
    .textNotes {
        text-align: start;
        color: black;
        background-color: #cccccc;
    }
</style>
