import { ItemHeader } from "./ItemHeader";

export interface HeadersProps {
	headers: ItemHeader[];
}

export default function Headers() {
	return (
		<div>
			<h2>Heades</h2>
			<p>Add or edit your headers for the request</p>
		</div>
	);
}
