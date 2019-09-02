import React from 'react'
import raw from 'raw.macro'

import Button from '../../Button'
import TextHeading from '../../TextHeading'
import Autocomplete from '../../Autocomplete'

import {
	useSeedWordsDispatch,
	useSeedWordsState,
} from '../../../store/SeedWordsStore'

const wordlist = raw('../../../wordlists/english.txt')
	.split('\n')
	.filter(Boolean)

const SeedWordsInput = ({ reset = false }) => {
	const { words, total } = useSeedWordsState()
	const dispatch = useSeedWordsDispatch()

	if (reset && words.length) {
		dispatch({ type: 'RESET' })
	}

	const onSelectWord = value => {
		dispatch({
			type: 'APPEND',
			payload: value,
		})
	}

	const isDone = words.length >= total

	return (
		<>
			<TextHeading mb={2}>
				Enter Word {words.length + 1}/{total}
			</TextHeading>
			<Autocomplete
				list={wordlist}
				cleanOnSelect={true}
				onSelect={onSelectWord}
			/>

			{isDone && <Button to={'../confirm'}>Done.</Button>}
		</>
	)
}

export default SeedWordsInput
