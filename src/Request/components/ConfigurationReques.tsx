import TabSwitcher from "@/components/ui/Tabs/TabSwitcher";
import { ReactNode } from "react";

interface Props {
	onParams: ReactNode;
	onHeaders: ReactNode;
}

const tabs: string[] = ["Params", "Headers", "Body"];

export default function ConfigurationRequest({ onParams, onHeaders }: Props) {
	const switchTab = (tab: string): ReactNode => {
		//switch tab in tabs
		if (tab === "Params") {
			return onParams;
		}

		if (tab === "Headers") {
			return onHeaders;
		}

		return (
			<section>
				<h2>Choose a valid option</h2>
			</section>
		);
	};

	return (
		<TabSwitcher
			tabsId={tabs}
			renderContent={switchTab}
		/>
	);
}
