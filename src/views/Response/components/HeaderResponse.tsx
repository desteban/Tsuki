interface HeaderResponseProps {
	code: number;
	size?: string | number;
}

function getColorStatus(code: number): string {
	if (code >= 100 && code < 200) {
		return '!text-blue-400';
	}

	if (code >= 200 && code < 300) {
		return '!text-green-600';
	}

	if (code >= 300 && code < 400) {
		return '!text-blue-600';
	}

	if (code >= 400 && code < 500) {
		return '!text-red-500';
	}

	if (code >= 500 && code < 600) {
		return '!text-red-600';
	}

	return '!text-black';
}

export default function HeaderResponse({ code, size }: HeaderResponseProps) {
	return (
		<div className="flex border-b border-white p-2 space-x-6">
			<h3 className="text-base">
				Status: <span className={`${getColorStatus(code)} font-bold`}>{code}</span>
			</h3>

			<h3 className="text-base">
				Size: <span className={`${getColorStatus(code)} font-bold`}>{size} KB</span>
			</h3>
		</div>
	);
}
