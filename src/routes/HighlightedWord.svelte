<script lang="ts">
	import type { HSLColor, RGBColor } from "d3";
	import { gradient, new_colour } from "./globals";
	import * as _ from "lodash-es";
	import * as d3 from "d3";

	export let cards: any[];

	$: filtered_cards = cards?.filter((card) => card.interval != 0);
	$: min_ivl = _.minBy(filtered_cards, (card) => card.interval)?.interval;

	let colour: RGBColor | HSLColor | null;
	$: {
		let _colour = min_ivl ? gradient(min_ivl) : new_colour;
		colour = d3.color(_colour?.toString() || "transparent");
		if (colour) {
			colour.opacity = 0.5;
		}
	}
</script>

<button style:background-color={colour?.toString()} on:click={() => {}}>
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
