import { ReactNode, useState } from 'react';
import styles from './styles.module.css';

interface Props {
	renderContent: (header: string) => ReactNode;
	tabsId: string[];
	upperCase?: boolean;
	isActive?: boolean;
}

export default function TabSwitcher({ renderContent, tabsId, upperCase = false, isActive = true }: Props) {
	const [selectedId, setSelectedId] = useState<string>(tabsId[0] ?? '');

	const SelectHeader = (tabSelected: string): void => {
		setSelectedId(tabSelected);
	};

	const Tabs = () => {
		return (
			<div className="flex space-x-1 border-b-2 border-gray-200">
				{tabsId.map((tab) => (
					<button
						key={tab}
						onClick={() => SelectHeader(tab)}
						className={`relative flex flex-row items-center space-x-1 px-2 ${selectedId === tab && isActive ? styles.active : ''}`}
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
