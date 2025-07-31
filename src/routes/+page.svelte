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
	Make sure you have <a href="https://ankiweb.net/shared/info/2055492159">AnkiConnect</a> installed and
	with CORS allowing this site
</p>

<p>Also make sure that Anki is open.</p>

<form
	on:submit={async (e) => {
		e.preventDefault();
		loading = true;
		info = await fetch_card_info_groups(search, field);
		loading = false;
	}}
	class="section"
>
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
	<div>
		<input type="submit" disabled={loading} value="Load from Anki" />
	</div>
</form>

<hr />

<div>
	<label>
		Input text:
		<div>
			<textarea bind:value></textarea>
		</div>
	</label>
</div>

<hr />

<div class="section">
	<AnkiHighlighter data={info} {value}></AnkiHighlighter>
</div>

<style>
	form {
		display: grid;
		grid-template-columns: auto auto;
		gap: 0.25em;
		width: min(100%, 500px);
	}
	label {
		display: contents;
	}
	.section {
		border: 2px solid black;
		padding: 0.5em;
		border-radius: 0.5em;
		background-color: ghostwhite;
	}
</style>
