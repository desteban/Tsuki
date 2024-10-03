import { ReactNode } from 'react';
import styles from './styles.module.css';

interface Props {
	tabActive: string;
	tabs: string[];
	upperCase?: boolean;
	isActive?: boolean;
	handleTab: (tab: string) => void;
	renderContent: (header: string) => ReactNode;
}

export default function TabSwitcher({
	renderContent,
	tabs,
	upperCase = false,
	isActive = true,
	handleTab,
	tabActive,
}: Props) {
	// const [selectedId, setSelectedId] = useState<string>(tabs[0] ?? '');

	const SelectHeader = (tabSelected: string): void => {
		// setSelectedId(tabSelected);
		handleTab(tabSelected);
	};

	const ButtonTabs = () => {
		return (
			<div className="flex space-x-1 border-b-2 border-gray-200">
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => SelectHeader(tab)}
						className={`relative flex flex-row items-center space-x-1 px-2 ${tabActive === tab && isActive ? styles.active : ''}`}
					>
						{upperCase ? tab.toLocaleUpperCase() : tab}
					</button>
				))}
			</div>
		);
	};

	return (
		<div>
			<ButtonTabs />
			<div className="min-h-36">{renderContent(tabActive)}</div>
		</div>
	);
}
