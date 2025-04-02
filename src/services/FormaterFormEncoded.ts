import { FormEncoded } from "@/models/FormEncoded";

export function FormatToFormEncoded(data: FormEncoded[]): URLSearchParams {
	const response = new URLSearchParams();

	for (let index = 0; index < data.length; index++) {
		if (data[index].value !== undefined && data[index].active) {
			response.append(data[index].key, String(data[index].value));
		}
	}

	return response;
}