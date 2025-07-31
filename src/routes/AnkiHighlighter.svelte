<script lang="ts">
	import Rainbow from "rainbowvis.js";
	import * as _ from "lodash-es"

	export let data: Record<string, any[]>;
	export let value: string;

	$: regex = RegExp(
		Object.keys(data)
			.sort((a, b) => b.length - a.length)
			.map((s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
			.join('|'),
		'gi'
	);
	$: words = value.matchAll(regex).toArray();
	$: console.log({ words, regex, last });

	$: last = words[words.length - 1];

	const gradient = new Rainbow()
    
	const low_colour = "pink"
	const mature_colour = "lightgreen"
	const new_colour = "lightblue"

    gradient.setNumberRange(0, 21)
    gradient.setSpectrum(low_colour, mature_colour)
    
	$: colorMap = _.mapValues(data, (cards) => {
      const filtered_cards = cards.filter(card => card.interval != 0)
      const min_ivl = _.minBy(filtered_cards, card => card.interval)?.interval
      
      return min_ivl ? "#" + gradient.colourAt(min_ivl) : new_colour
    })
</script>

<div>
	{#each words as word, i}
		{@const last = words[i - 1]}
		<span>{value.slice((last?.index ?? 0) + ((last ?? [])[0]?.length ?? 0), word.index)}</span>
		<span class="highlight" style:background-color={colorMap[word[0]]}>{word[0]}</span>
	{/each}
	<span>{value.slice((last?.index ?? 0) + ((last ?? [])[0]?.length ?? 0), value.length)}</span>
</div>

<style>
	span.highlight {

	}
	div {
		font-size: 0;
	}
	span {
		font-size: 16px;
		font-size: default;
	}
</style>
