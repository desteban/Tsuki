import { ReactNode } from "react";

interface Props {
    children: ReactNode,
    'aria-label': string
}

export default function FormsWrapper(props: Props) {
	return (
		<table
			className="w-full border-separate border-spacing-1"
			aria-label={props["aria-label"]}
		>
			<thead>
				<tr className="font-semibold">
					<td className="dark:text-primary-foreground">Active</td>
					<td className="dark:text-primary-foreground">Key</td>
					<td className="dark:text-primary-foreground">Value</td>
					<td className="dark:text-primary-foreground"></td>
				</tr>
			</thead>

			<tbody>
                { props.children }
			</tbody>
		</table>
	);
}
