<script>
    // import SvelteTable from "svelte-table";
    import { haRecord } from "../sharedState.svelte.js";
    import { Table } from "@sveltestrap/sveltestrap";

    const nFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const columns = [
        {
            key: "balance",
            title: "Balance",
            value: (v) => v.charges.balance,
            renderValue: (v) => nFormat.format(v.charges.balance),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "monMin",
            title: "Minimum",
            value: (v) => v.charges.monMin,
            renderValue: (v) => nFormat.format(v.charges.monMin),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "minDelta",
            title: "Delta",
            value: (v) => v.charges.minDelta,
            renderValue: (v) => nFormat.format(v.charges.minDelta),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "minTax",
            title: "7.5%",
            value: (v) => v.charges.minTax,
            renderValue: (v) => nFormat.format(v.charges.minTax),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "subTot",
            title: "Sub Total",
            value: (v) => v.charges.subTot,
            renderValue: (v) => nFormat.format(v.charges.subTot),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "creChg",
            title: "3%",
            value: (v) => v.charges.creChg,
            renderValue: (v) => nFormat.format(v.charges.creChg),
            class: "text-end",
            headerClass: "text-end",
        },
        {
            key: "totChg",
            title: "Total",
            value: (v) => v.charges.totChg,
            renderValue: (v) => nFormat.format(v.charges.totChg),
            class: "text-end",
            headerClass: "text-end",
        },
    ];

    let row = $state({});
    row = $haRecord;

</script>

<main>
<Table bordered size="sm">
    <thead class="table-dark">
        <tr>
        {#each columns as c}
            <th class={c.headerClass}>{c.title}</th>
        {/each}
        </tr>
    </thead>
    <tbody>
        <!-- {#each rows as r} -->
            <tr>
                {#each columns as c}
                    <td class={c.class}>{nFormat.format(row.charges[c.key])}</td>
                {/each}
            </tr>
        <!-- {/each} -->
    </tbody>
</Table>
</main>

<style>
</style>
