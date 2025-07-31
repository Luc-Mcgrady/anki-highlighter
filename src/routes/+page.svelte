<script lang="ts">
	import { fetch_card_info_groups } from '$lib/ankiHighlight';
	import AnkiHighlighter from './AnkiHighlighter.svelte';

	let search = '';
	let field = '';
	let value = '';

	let info = {};
	let loading = false;
</script>

<h1>Anki card content highlighter</h1>

If you paste some text in your target language below, you can see the content for which you have
Anki cards highlighted.

<form
	on:submit={async (e) => {
		e.preventDefault();
		loading = true;
		info = await fetch_card_info_groups(search, field);
		loading = false;
	}}
>
	<input type="submit" disabled={loading} />

	<label>
		Search Query:
		<input type="text" bind:value={search} />
	</label>
	<label>
		Field:
		<input type="text" bind:value={field} />
	</label>
	<textarea bind:value></textarea>
</form>

{#if loading}
	Updating card list
{/if}

<AnkiHighlighter data={info} {value}></AnkiHighlighter>
