/** @jsx jsx */
import { jsx } from '@emotion/core'

//import 'styled-components/macro'; // todo makro

import css from '@styled-system/css'

import Autocomplete from '../../Autocomplete'
import SeedInput from './SeedInput'

const SeedWordsInput = ({ dispatch, placeholder, forceFocus, suggestions }) => {
	const onSelectWord = value => {
		dispatch({
			type: 'APPEND',
			payload: value,
		})
	}

	const popWord = () => {
		dispatch({
			type: 'POP',
		})
	}

	return (
		<div css={css({ minWidth: '5rem', mb: 2 })}>
			<Autocomplete
				list={suggestions}
				cleanOnSelect={true}
				onSelect={onSelectWord}
				onEmptyBackspace={popWord}
				minLength={2}
			>
				<SeedInput placeholder={placeholder} forceFocus={forceFocus} />
			</Autocomplete>
		</div>
	)
}

export default SeedWordsInput
