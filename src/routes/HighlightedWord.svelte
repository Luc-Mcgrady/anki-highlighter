<script lang="ts">
	import type { HSLColor, RGBColor } from "d3";
	import { searched_field, gradient, new_colour } from "./globals";
	import * as _ from "lodash-es";
	import * as d3 from "d3";

	export let cards: any[];
	export let word: string;

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

	function onClick() {
		fetch("http://localhost:8765", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				action: "guiBrowse",
				version: 6,
				params: {
					query: `${$searched_field}:${word}`
				}
			})
		});
	}
</script>

<span
	style:background-color={colour?.toString()}
	on:click={onClick}
	on:keypress={onClick}
	tabindex="0"
	role="button">{word}</span
>

<style>
	span {
		font-size: 16px;
		padding: 0;
		border: 2px transparent solid;
		cursor: pointer;
	}
	span:hover {
		border: 2px black solid;
	}
</style>
