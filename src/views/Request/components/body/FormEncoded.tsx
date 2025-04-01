import { Dispatch } from 'react';
import FormsWrapper from './FormsWrapper';
import Row from './Row';
import { ActionsBody, ActionsBodyReducer, } from '../../reducers/BodyReducer';
import type { FormEncoded } from '@/models/FormEncoded';
import { Body } from '@/models/Body';

interface Props {
  state: Body,
  dispatch: Dispatch<ActionsBody>
}

export default function FormEncoded({dispatch, state}: Props) {

	const changeItem = (item: FormEncoded, index: number) => {
		dispatch({ type: ActionsBodyReducer.updateFormEncoded, payload: { index, item } });
	};

  const deleteItem = (index: number) => {
    dispatch({type: ActionsBodyReducer.deleteFormEncoded, payload: { index }})
  }

	return (
		<div>
			<FormsWrapper aria-label="Form Encoded Table">
				{state.formEncoded.map((item, index) => (
					<Row
						key={index}
						index={index}
						item={item}
						changeItem={changeItem}
            deleteItem={deleteItem}
					/>
				))}
			</FormsWrapper>
		</div>
	);
}
