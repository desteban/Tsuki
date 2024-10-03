import TabSwitcher from '@/components/ui/Tabs/TabSwitcher';
import { ReactNode } from 'react';
import { KeysDefaultBody } from './Items';

export interface MainBodyProps {
	onBodyForm: ReactNode;
	onBodyJson: ReactNode;
	changeTab: (tab: string) => void;
	tab: KeysDefaultBody;
}

export default function MainBody({ onBodyForm, onBodyJson, changeTab, tab }: MainBodyProps) {
	const tabs: string[] = ['none', 'json', 'form'];

	const switchTab = (key: string) => {
		if (key === 'form') {
			return onBodyForm;
		}

		if (key === 'json') {
			return onBodyJson;
		}

		return <div></div>;
	};

	return (
		<section
			id="body"
			aria-label="body config"
			className="py-2"
		>
			<TabSwitcher
				tabActive={tab}
				handleTab={changeTab}
				tabs={tabs}
				renderContent={switchTab}
			/>
		</section>
	);
}
