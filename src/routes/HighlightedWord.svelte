<script lang="ts">
	import { gradient, new_colour } from "./globals";
	import * as _ from "lodash-es";

	export let cards: any[];

	$: filtered_cards = cards?.filter((card) => card.interval != 0);
	$: min_ivl = _.minBy(filtered_cards, (card) => card.interval)?.interval;

	$: colour = min_ivl ? "#" + gradient.colourAt(min_ivl) + "80" : new_colour;
</script>

<button style:background-color={colour} on:click={() => {}}>
	<slot></slot>
</button>

<style>
	button {
		font-size: 16px;
		padding: 0;
		border: 2px transparent solid;
		cursor: pointer;
	}
	button:hover {
		border: 2px black solid;
	}
</style>
