import { z } from "zod";

export const flavours = ["Cookies and cream", "Mint choc chip", "Raspberry ripple"] as const;

export const schema = z
	.object({
		scoops: z.number().int().min(1),
		flavours: z
			.enum(flavours)
			.array()
			.min(1, "Please select at least one flavour")
			.default([flavours[0]]),
		images: z
			.instanceof(File, { message: "Please upload a file." })
			.refine(f => f.size < 100_000_000, "Max 100Mb upload size.")
			.array()
			.min(1, "Пожалуйста, добавьте файл")
	})
	.refine(data => data.flavours.length <= data.scoops, {
		message: "Can't order more flavours than scoops!",
		path: ["flavours"]
	});
