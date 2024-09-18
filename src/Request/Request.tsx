import { Button } from "@/components/ui/button";
import styles from "./Styles.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import ConfigurationReques from "./components/ConfigurationReques";
import Params from "./components/Params";
import Headers from "./components/Headers";

type TypeHttp = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export default function Request() {
	const [method, setMethod] = useState<TypeHttp>("GET");
	const [url, setUrl] = useState<string>("");

	const ChangeMethod = (methodSelected: string) => {
		setMethod(methodSelected as TypeHttp);
	};

	const ChangeUrl = (evt: ChangeEvent<HTMLInputElement>) => {
		setUrl(evt.target.value);
	};

	const Send = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
	};

	return (
		<main>
			<form
				className={styles.form}
				onSubmit={Send}
			>
				<div className="w-48">
					<Select
						value={method}
						onValueChange={ChangeMethod}
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
				</div>

				<Input
					placeholder="http://localhost:8000"
					value={url}
					onChange={ChangeUrl}
				/>

				<Button className={styles["btn-send"]}>Send</Button>
			</form>

			<section className="my-4">
				{JSON.stringify(
					{
						method,
						url,
					},
					null,
					2,
				)}
			</section>

			<section className="my-4">
				<ConfigurationReques
					onParams={<Params />}
					onHeaders={<Headers />}
				/>
			</section>
		</main>
	);
}
