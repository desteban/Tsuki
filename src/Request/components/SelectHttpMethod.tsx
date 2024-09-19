import { HttpMethods } from '@/lib/Types/HttpMethods';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';

interface Props {
	method: HttpMethods;
	changeMethod: (method: HttpMethods) => void;
}

export default function SelectHttpMethod({ changeMethod, method }: Props) {
	return (
		<Select
			value={method}
			onValueChange={changeMethod}
			defaultValue={method}
		>
			<SelectTrigger>
				<SelectValue placeholder="GET" />
			</SelectTrigger>

			<SelectContent>
				<SelectItem value="GET">GET</SelectItem>
				<SelectItem value="POST">POST</SelectItem>
				<SelectItem value="PUT">PUT</SelectItem>
				<SelectItem value="PATCH">PUT</SelectItem>
				<SelectItem value="DELETE">DELETE</SelectItem>
			</SelectContent>
		</Select>
	);
}
