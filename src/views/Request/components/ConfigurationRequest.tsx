import TabSwitcher from '@/components/ui/Tabs/TabSwitcher';
import { ReactNode, useState } from 'react';

interface Props {
	onParams: ReactNode;
	onHeaders: ReactNode;
	onBody: ReactNode;
}

const tabs: string[] = ['Params', 'Headers', 'Body'];

export default function ConfigurationRequest({ onParams, onHeaders, onBody }: Props) {
	const [tab, setTab] = useState<string>('Params');
	const switchTab = (tab: string): ReactNode => {
		//switch tab in tabs
		if (tab === 'Params') {
			return onParams;
		}

		if (tab === 'Headers') {
			return onHeaders;
		}

		if (tab === 'Body') {
			return onBody;
		}

		return (
			<section>
				<h2>Choose a valid option</h2>
			</section>
		);
	};

	return (
		<TabSwitcher
			tabActive={tab}
			handleTab={setTab}
			tabs={tabs}
			renderContent={switchTab}
		/>
	);
}
