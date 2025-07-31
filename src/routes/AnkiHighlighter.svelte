<script lang="ts">
	// export let data: Dictionary<any[]>;
	export let value: string;

	let data = { bob: '', joe: '' };

	$: regex = RegExp(
		Object.keys(data)
			.sort((a, b) => b.length - a.length)
			.join('|'),
		'gi'
	);
	$: words = value.matchAll(regex).toArray();
	$: console.log(words);

	$: last = words[words.length - 1];
</script>

{#each words as word, i}
	{@const last = words[i - 1]}
	{value.slice((last?.index ?? 0) + ((last ?? [])[0]?.length ?? 0), word.index)}
	<span>{word[0]}</span>
{/each}
{value.slice((last?.index ?? 0) + ((last ?? [])[0]?.length ?? 0), value.length)}

<style>
	span {
		background-color: yellow;
	}
</style>
