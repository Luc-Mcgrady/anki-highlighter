<script lang="ts">
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
</script>

<div>
	{#each words as word, i}
		{@const last = words[i - 1]}
		<span>{value.slice((last?.index ?? 0) + ((last ?? [])[0]?.length ?? 0), word.index)}</span>
		<span class="highlight">{word[0]}</span>
	{/each}
	<span>{value.slice((last?.index ?? 0) + ((last ?? [])[0]?.length ?? 0), value.length)}</span>
</div>

<style>
	span.highlight {
		background-color: yellow;
	}
	div {
		font-size: 0;
	}
	span {
		font-size: 16px;
		font-size: default;
	}
</style>
