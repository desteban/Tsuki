import TabSwitcher from '@/components/ui/Tabs/TabSwitcher';
import { ReactNode, useEffect } from 'react';
import { KeysDefaultBody } from './Items';
import { ItemHeader } from '../Headers/ItemHeader';
import { HeadersBody } from '@/lib/Types/HeadersBody';

export interface MainBodyProps {
	onBodyForm: ReactNode;
	onBodyJson: ReactNode;
	changeTab: (tab: string) => void;
	tab: KeysDefaultBody;
	headers: ItemHeader[];
	setHeaders(headers: ItemHeader[]): void;
}

export default function MainBody({ onBodyForm, onBodyJson, changeTab, tab, headers, setHeaders }: MainBodyProps) {
	const tabs: string[] = ['none', 'json', 'form'];

	useEffect(() => {
		const KeyHeader = 'Content-Type';
		const switchHeaderFromTab = {
			json: HeadersBody.json,
			form: HeadersBody.form,
			none: null,
		};

		const value = switchHeaderFromTab[tab];

		if (value === null) {
			setHeaders(headers.filter((header) => header.key !== KeyHeader));
		}

		if (value !== null) {
			const header = headers.find((head) => head.key === KeyHeader);
			const newHeaders = [...headers];

			if (header) {
				newHeaders[newHeaders.indexOf(header)].value = value;
			} else {
				newHeaders.splice(newHeaders.length - 1, 0, {
					key: KeyHeader,
					value: value,
					allowDelete: false,
					isActive: true,
				});
			}

			setHeaders(newHeaders);
		}
	}, [tab]);

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
