import { Body } from "@/models/Body";
import { KeysBody } from "@/models/KeysBody";
import { FormatToFormEncoded } from "@/services/FormaterFormEncoded";


export function getContentBody(body: Body, key: KeysBody) {
	if (key === 'form') {
		const formData = new FormData()
		body.form.forEach((item) => {
			if (item.active && item.value) {
				formData.append(item.key, item.value )
			}
		})

		return formData
	}

	if (key === 'json') {
		return body.json;
	}

	if (key === 'form-encoded') {
		return FormatToFormEncoded(body.formEncoded)		
	}

	return null;
}

