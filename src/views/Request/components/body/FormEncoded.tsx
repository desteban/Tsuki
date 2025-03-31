import { useReducer } from 'react';
import FormsWrapper from './FormsWrapper';
import Row from './Row';
import { ActionsBodyReducer, BodyReducer, initialStateBody } from '../../reducers/BodyReducer';
import type { FormEncoded } from '@/models/FormEncoded';

interface Props {}

export default function FormEncoded(props: Props) {
	const [state, dispacth] = useReducer(BodyReducer, initialStateBody);

	const changeItem = (item: FormEncoded, index: number) => {
		dispacth({ type: ActionsBodyReducer.updateFormEncoded, payload: { index, item } });
	};

  const deleteItem = (index: number) => {
    dispacth({type: ActionsBodyReducer.deleteFormEncoded, payload: { index }})
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

			<pre>
				<code>{JSON.stringify(state, null, 2)}</code>
			</pre>
		</div>
	);
}
