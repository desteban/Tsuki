import { FormEncoded } from "@/models/FormEncoded";

interface RowProps extends FormEncoded {
    changeKey: (key: string) => void;
    changeValue: (value: string) => void;
}

export default function Row({key, value, changeKey, changeValue}: RowProps) {
  return (
		<div>
			<input
				type="text"
				name="key"
				value={key}
				placeholder="key"
				onChange={(e) => changeKey(e.target.value)}
			/>
			<input
				type="text"
				name="value"
				value={value}
				placeholder="value"
				onChange={(e) => changeValue(e.target.value)}
			/>
		</div>
	);
}
