<script>
	import { once } from 'svelte/legacy';

	import PgTop from './components/PgTop.svelte';

	// export let name;
	let version = $state();
	let dashboard = $state()
	let arrivals = $state(), departures = $state();
	let gstsInHouse = $state(), pctOccupied = $state(), asOfDate = $state();
	let ihLogo = 'images/ih-logo.png';

	const get_dashboard = async () => {
		api.send('get/dashboard');
		// dashboard = await api.getDashboard();
	}

	const get_version = async () => {
		version = await api.getVersion();
	}

	window.addEventListener('message', (event) => {
		console.log('rend: event: ', event);
		dashboard = event.data.dashboard;
		console.log('rend: dashboard: ', dashboard);

		arrivals = dashboard.arrivals;
		departures = dashboard.departures;
		gstsInHouse = dashboard.guestsInHouse;
		pctOccupied = dashboard.percentageOccupied;
		asOfDate = dashboard.property_now;
	})
</script>

<main>
	<!-- <img src={ihLogo} alt="IH Logo" width="100" height="100"> -->

	<PgTop ihLogo={ihLogo} />

	<!-- <h1>Hello {name}! you stud</h1> -->
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<button onclick={get_dashboard}>Dashboard: {dashboard || 'Get Dashboard'}</button>	
	<button onclick={once(get_version)}>Version: {version || 'Get Version'}</button>

	{#if dashboard}
	<table>
		<tbody>
		<tr>
			<th>Arrivals</th>
			<td>{arrivals}</td>
		</tr>
		<tr>
			<th>Departures</th>
			<td>{departures}</td>
		</tr>
		<tr>
			<th>Guests In House</th>
			<td>{gstsInHouse}</td>
		</tr>
		<tr>
			<th>Occupancy</th>
			<td>{pctOccupied}%</td>
		</tr>
		<tr>
			<th>As of</th>
			<td>{asOfDate}</td>
		</tr>
		</tbody>
	</table>
	{/if}

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	th {
		text-align: left;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>