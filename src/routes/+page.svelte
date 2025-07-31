<script lang="ts">
	import AnkiHighlighter from './AnkiHighlighter.svelte';
	import AnkiHighlighterOuter from './AnkiHighlighterOuter.svelte';

	let search = '';
	let field = '';
	let value = '';
</script>

<h1>Anki card content highlighter</h1>

If you paste some text in your target language below, you can see the content for which you have
Anki cards highlighted.

<form
	on:submit={(e) => {
		e.preventDefault();
	}}
>
	<input type="submit" />

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

<AnkiHighlighter {value}></AnkiHighlighter>
