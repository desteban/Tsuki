import { Dispatch } from 'react';
import FormsWrapper from './FormsWrapper';
import Row from './Row';
import { ActionsBody, ActionsBodyReducer } from '../../reducers/BodyReducer';
import { Body } from '@/models/Body';
import { MultipartFormData } from '@/models/MultipartFormData';

interface Props {
	state: Body;
	dispatch: Dispatch<ActionsBody>;
}

export default function FormMultipart({ dispatch, state }: Props) {
	const changeItem = (item: MultipartFormData, index: number) => {
		dispatch({ type: ActionsBodyReducer.updateFormMultipart, payload: { index, item } });
	};

	const deleteItem = (index: number) => {
		dispatch({ type: ActionsBodyReducer.deleteFormMultipart, payload: { index } });
	};

	return (
		<div>
			<FormsWrapper aria-label="Form Encoded Table">
				{state.form.map((item, index) => (
					<Row
						key={index}
						index={index}
						item={item}
						changeItem={changeItem}
						deleteItem={deleteItem}
						variant="multipart"
					/>
				))}
			</FormsWrapper>
		</div>
	);
}
