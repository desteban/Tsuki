import { Body } from "@/models/Body";
import { KeysBody } from "@/models/KeysBody";


export function getContentBody(body: Body, key: KeysBody): BodyInit | null | undefined {
	if (key === 'form') {
		return body.form;
	}

	if (key === 'json') {
		return body.json;
	}

	if (key === 'form-encoded') {
		const formdata = new URLSearchParams()
		body.formEncoded.forEach((item) => {
			if (item.key.length !== 0) {
				formdata.append(item.key, item.value)
			}
		})
		return formdata;		
	}

	return null;
}

