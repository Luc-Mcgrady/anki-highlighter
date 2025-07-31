<script lang="ts">
	import { fetch_card_info_groups } from '$lib/ankiHighlight';
	import AnkiHighlighter from './AnkiHighlighter.svelte';

	export let search = '';
	export let field = '';
	export let value = '';
</script>

{#await fetch_card_info_groups(search, field)}
	Loading...
{:then data}
	<AnkiHighlighter {data} {value}></AnkiHighlighter>
{:catch e}
	{e}
{/await}
