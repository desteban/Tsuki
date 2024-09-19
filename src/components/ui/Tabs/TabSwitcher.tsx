import { ReactNode, useState } from 'react';
import styles from './styles.module.css';

interface Props {
	renderContent: (header: string) => ReactNode;
	tabsId: string[];
	upperCase?: boolean;
}

export default function TabSwitcher({ renderContent, tabsId, upperCase = false }: Props) {
	const [selectedId, setSelectedId] = useState<string>(tabsId[0] ?? '');

	const SelectHeader = (tabSelected: string): void => {
		setSelectedId(tabSelected);
	};

	const Tabs = () => {
		return (
			<div className="flex space-x-1">
				{tabsId.map((tab) => (
					<button
						key={tab}
						onClick={() => SelectHeader(tab)}
						className={`${selectedId === tab ? styles.active : ''} relative flex flex-row items-center gap-1 px-2`}
					>
						{upperCase ? tab.toLocaleUpperCase() : tab}
					</button>
				))}
			</div>
		);
	};

	return (
		<div>
			<Tabs />
			<div
				className="mt-6 min-h-36"
				key={selectedId}
			>
				{renderContent(selectedId)}
			</div>
		</div>
	);
}
