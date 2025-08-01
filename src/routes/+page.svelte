<script lang="ts">
	import { fetch_card_info_groups } from "$lib/ankiHighlight";
	import { onMount } from "svelte";
	import AnkiHighlighter from "./AnkiHighlighter.svelte";
	import { searched_field } from "./globals";

	let search = "";
	let field = "Front";
	let value = "";

	let info = {};
	let loading = false;
	let website = "";
	let error = "";
	onMount(() => {
		website = window.location.origin;
	});
</script>

<h1>Anki card content highlighter</h1>

<p>
	If you paste some text in your target language below, you can see the content for which you have
	Anki cards highlighted.
</p>

<p>
	Make sure you have <a href="https://ankiweb.net/shared/info/2055492159">AnkiConnect</a
	>(2055492159) installed and include <code>{website}</code> in the <code>webCorsOriginList</code> section
	of the addon config.
</p>

<p>Also make sure that Anki remains open while you use this tool</p>

<form
	on:submit={async (e) => {
		e.preventDefault();
		loading = true;
		error = "";
		try {
			info = await fetch_card_info_groups(search, field);
			$searched_field = field;
		} catch (e: any) {
			error = e.message;
		} finally {
			loading = false;
		}
	}}
	class="section"
>
	<label>
		Search query:
		<input type="text" placeholder="Search" bind:value={search} />
	</label>
	<label>
		Note field name:
		<input type="text" placeholder="Field" bind:value={field} />
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

{#if error}
	<div class="error">
		{error} <br />
		{#if error.match("NetworkError")}
			(Have you set CORS as specified above?, Is anki running?)
		{/if}
	</div>
{/if}

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

<hr />

<footer>
	A site made by <a href="https://www.lucmcgrady.com">Luc Mcgrady</a>
	<br />
	Find the <a href="https://github.com/Luc-Mcgrady/anki-highlighter">source code on github</a> and leave
	a star!
</footer>

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
	code {
		background-color: ghostwhite;
	}
	.error {
		color: red;
		background-color: black;
		padding: 0.5em;
	}
</style>
