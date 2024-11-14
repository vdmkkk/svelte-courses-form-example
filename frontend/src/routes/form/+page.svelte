<script lang="ts">
	import { superForm, fileProxy, filesFieldProxy } from "sveltekit-superforms";
	import { flavours } from "./schema.js";
	import SuperDebug from "sveltekit-superforms";

	export let data;

	const superform = superForm(data.form, {
		resetForm: false,
		clearOnSubmit: "none"
	});

	const { form, errors, enhance, message } = superform;

	const files = filesFieldProxy(superform, "images");
	const { values: fileValues, valueErrors } = files;
</script>

<SuperDebug data={$form} />

<form method="POST" enctype="multipart/form-data" use:enhance>
	<h2>Size</h2>

	<select name="scoops" bind:value={$form.scoops}>
		{#each ["One scoop", "Two scoops", "Three scoops"] as scoop, i}
			<option value={i + 1} selected={$form.scoops == i + 1}>{scoop}</option>
		{/each}
	</select>

	{#if $errors.scoops}<p>{$errors.scoops}</p>{/if}

	<h2>Flavours</h2>

	<!-- Note that the selected attribute is required for this to work without JS -->
	<select multiple name="flavours" bind:value={$form.flavours}>
		{#each flavours as flavour}
			<option value={flavour} selected={$form.flavours.includes(flavour)}>{flavour}</option>
		{/each}
	</select>

	{#if $errors.flavours?._errors}<p>{$errors.flavours._errors}</p>{/if}

	<br />
	<br />

	<label>
		Upload files, max 100 Kb: <input
			multiple
			bind:files={$fileValues}
			accept="image/png, image/jpeg"
			name="images"
			type="file"
		/>
		<ul class="invalid">
			{#each $valueErrors as error, i}
				{#if error}
					<li>Image {i + 1}: {error}</li>
				{/if}
			{/each}
		</ul>
	</label>

	<div><button>Submit</button></div>

	{#if $message}<p>{$message}</p>{/if}
</form>

<style>
	.info {
		border-top: 1px solid gray;
		margin-top: 4rem;
	}
</style>
