import { FormEncoded } from '@/models/FormEncoded';
import { BodyComponentsProps } from '../Items';
import { useState } from 'react';
import Row from './Componets/Row';

export default function BodyForm({}: BodyComponentsProps) {

	const [formData, setFormData] = useState<FormEncoded[]>([])

	return (
		<div
			id="bodyForm"
			aria-label="Body form"
		>
			{formData.map((data, index) => (
				<Row
					{...data}
					changeKey={(key) => {
						let newData = [...formData];
						newData[index].key = key;
						setFormData(newData);
					}}
					changeValue={(value) => {
						let newData = [...formData];
						newData[index].value = value;
						setFormData(newData);
					}}
				/>
			))}
		</div>
	);
}
