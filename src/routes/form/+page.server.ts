import type { Actions } from "@sveltejs/kit";
import { fail, message, setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

const colors = ["Красный", "Черный", "Белый", "Синий"];

const schema = z.object({
	name: z.string().default("Вадим"),
	email: z.string().email().default("a@a.ru"),
	color: z.enum(colors).array().min(1)
});

/*
{
    name: string,
    email: string (validate for email)
}
*/

export const load = async () => {
	const form = await superValidate(zod(schema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		console.log(form);

		if (form.data.name == "Ярослав") {
			setError(form, "name", "Плохое имя");
			return fail(400, { form });
		}

		if (form.data.color.length == 0) {
			setError(form, "name", "Выберите цвета");
		}

		return message(form, `Вы выбрали цвета: ${JSON.stringify(form.data)}`);
	}
};
