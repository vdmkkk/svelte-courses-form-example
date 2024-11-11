<script lang="ts">
	import { superForm } from "sveltekit-superforms";

	export let data;

	const colors = ["Красный", "Черный", "Белый", "Синий"];

	const {
		form: newForm,
		message,
		enhance,
		errors
	} = superForm(data.form, { clearOnSubmit: "none", resetForm: false });

	$: {
		console.log($newForm);
	}
</script>

<form method="POST" use:enhance>
	<label for="name">Имя</label>
	<input type="text" name="name" bind:value={$newForm.name} />

	<br />
	<br />
	<label for="email">E-mail</label>
	<input type="email" name="email" bind:value={$newForm.email} />

	<br />
	<br />
	<label for="colors">Цвета</label>
	<select multiple name="colors" bind:value={$newForm.color}>
		{#each colors as colorOption}
			<option value={colorOption} selected={$newForm.color.includes(colorOption)}
				>{colorOption}</option
			>
		{/each}
	</select>

	<div><button>Submit</button></div>

	{#if $errors.name}
		<p>Ошибка в имени: {$errors.name}</p>
	{/if}

	{#if $errors.email}
		<p>Ошибка в email: {$errors.email}</p>
	{/if}

	{#if $message}
		<p>{$message}</p>
	{/if}
</form>
