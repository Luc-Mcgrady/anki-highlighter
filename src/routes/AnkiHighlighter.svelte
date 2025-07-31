<script lang="ts">
	import * as _ from "lodash-es";
	import HighlightedWord from "./HighlightedWord.svelte";

	export let data: Record<string, any[]>;
	export let value: string;

	$: regex = RegExp(
		Object.keys(data)
			.sort((a, b) => b.length - a.length)
			.map((s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
			.join("|"),
		"gi"
	);
	$: words = value.matchAll(regex).toArray();
	$: console.log({ words, regex, last });

	$: last = words[words.length - 1];
</script>

<div>
	{#each words as word, i}
		{@const last = words[i - 1]}
		<span>{value.slice((last?.index ?? 0) + ((last ?? [])[0]?.length ?? 0), word.index)}</span>
		{#if word[0]}
			<HighlightedWord cards={data[word[0]]}>{word[0]}</HighlightedWord>
		{/if}
	{/each}
	<span>{value.slice((last?.index ?? 0) + ((last ?? [])[0]?.length ?? 0), value.length)}</span>
</div>

<style>
	div {
		font-size: 0;
		white-space: pre;
	}
	span {
		font-size: 16px;
		font-size: default;
	}
</style>
