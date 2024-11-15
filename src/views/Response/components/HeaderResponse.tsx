
interface HeaderResponseProps {
	code: number;
	size?: string | number;
	time?: string | number;
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

const httpTittles: {[key: number]: string} = {
	// Informational
	100: 'Continue',
	101: 'SwitchingProtocols',

	// Success
	200: 'OK',
	201: 'Created',
	202: 'Accepted',
	// ... otros códigos de estado 2xx

	// Redirection
	301: 'MovedPermanently',
	302: 'Found',
	// ... otros códigos de estado 3xx

	// Client Error
	400: 'BadRequest',
	401: 'Unauthorized',
	403: 'Forbidden',
	404: 'NotFound',
	// ... otros códigos de estado 4xx

	// Server Error
	500: 'InternalServerError',
	501: 'NotImplemented',
	502: 'BadGateway',
	503: 'ServiceUnavailable',
	// ... otros códigos de estado 5xx
}


export default function HeaderResponse({ code, size, time }: HeaderResponseProps) {
	return (
		<div className="flex space-x-6 border-b border-white p-2">
			<h3 className="text-base">
				Status: <span className={`${getColorStatus(code)} font-bold`}>{code} - {httpTittles[code]}</span>
			</h3>

			<h3 className="text-base">
				Size: <span className={`${getColorStatus(code)} font-bold`}>{size} KB</span>
			</h3>

			<h3 className="text-base">
				Time: <span className={`${getColorStatus(code)} font-bold`}>{time} ms</span>
			</h3>
		</div>
	);
}
