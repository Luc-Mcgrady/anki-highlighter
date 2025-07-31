<script lang="ts">
	import { fetch_card_info_groups } from "$lib/ankiHighlight";
	import AnkiHighlighter from "./AnkiHighlighter.svelte";

	let search = "";
	let field = "";
	let value = "";

	let info = {};
	let loading = false;
</script>

<h1>Anki card content highlighter</h1>

<p>
	If you paste some text in your target language below, you can see the content for which you have
	Anki cards highlighted.
</p>

<p>
	Make sure you have <a href="https://ankiweb.net/shared/info/2055492159">AnkiConnect</a> installed and with CORS allowing this site
</p>

<p>
	Also make sure that Anki is open.
</p>

<form
	on:submit={async (e) => {
		e.preventDefault();
		loading = true;
		info = await fetch_card_info_groups(search, field);
		loading = false;
	}}
>
	<div>
		<input type="submit" disabled={loading} />
	</div>

	<label>
		Search Query:
		<input type="text" bind:value={search} />
	</label>
	<label>
		Field:
		<input type="text" bind:value={field} />
	</label>
	{#if loading}
		<div>Updating card list...</div>
	{/if}
	<div>
		{Object.keys(info).length} Note(s) loaded.
	</div>
</form>

<hr>

<div>
	<label>
		Input text:
		<textarea bind:value></textarea>
	</label>
</div>

<hr>

<AnkiHighlighter data={info} {value}></AnkiHighlighter>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
</style>