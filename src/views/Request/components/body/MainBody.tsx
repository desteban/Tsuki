import TabSwitcher from '@/components/ui/Tabs/TabSwitcher';
import { ReactNode, useEffect } from 'react';
import { ItemHeader } from '../Headers/ItemHeader';
import { HeadersBody } from '@/lib/Types/HeadersBody';
import { KeysBody } from '@/models/KeysBody';

export interface MainBodyProps {
	changeTab: (tab: string) => void;
	headers: ItemHeader[];
	onBodyForm?: ReactNode;
	onBodyFormEncoded?: ReactNode;
	onBodyJson?: ReactNode;
	setHeaders(headers: ItemHeader[]): void;
	tab: KeysBody;
}

const switchHeaderFromTab: {[key in KeysBody]: any} = {
	json: HeadersBody.json,
	form: HeadersBody.form,
	'form-encoded': HeadersBody.xForm,
	none: null,
};

export default function MainBody({
	onBodyForm,
	onBodyJson,
	onBodyFormEncoded,
	changeTab,
	tab,
	headers,
	setHeaders,
}: MainBodyProps) {
	const tabs: KeysBody[] = ['none', 'json', 'form', 'form-encoded'];

	/**
	 * Modificar los headers según el body que se quiere enviar
	 */
	useEffect(() => {
		const KeyHeader = 'Content-Type';
		const contentTab = switchHeaderFromTab[tab];

		if (contentTab === null) {
			setHeaders(headers.filter((header) => header.key !== KeyHeader));
		}

		if (contentTab !== null) {
			const header = headers.find((head) => head.key === KeyHeader);
			const newHeaders = [...headers];

			if (header) {
				newHeaders[newHeaders.indexOf(header)].value = contentTab;
			} else {
				newHeaders.splice(newHeaders.length - 1, 0, {
					key: KeyHeader,
					value: contentTab,
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

		if (key === 'form-encoded') {
			return onBodyFormEncoded;
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
