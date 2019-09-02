import React from 'react'
import { Box } from 'reflexbox'
import { navigate } from '@reach/router'
import raw from 'raw.macro'

import {
	useSeedWordsDispatch,
	useSeedWordsState,
} from '../../../store/SeedWordsStore'
import {
	useDistributionState,
	DistributionTypes,
} from '../../../store/DistributionStore'

import Text from '../../Text'
import Button from '../../Button'
import EnterWords from '../../EnterWords'

const wordList = raw('../../../wordlists/bip39/english.txt')
	.split('\n')
	.filter(Boolean)

const Enter = ({ location }) => {
	const { state } = location
	const { words, total, isValid } = useSeedWordsState() // ✅
	const { distributionType } = useDistributionState()

	const wordDispatch = useSeedWordsDispatch() // ✅

	if (state && state.reset && words.length) {
		wordDispatch({ type: 'RESET' })
	}

	const confirmButtons = (() => {
		const onResetSeed = () => {
			wordDispatch({ type: 'RESET' })
		}

		const onConfirmSeed = () => {
			wordDispatch({ type: 'CONFIRM' })
			// navigate to generate page
			return navigate('../generate')
		}

		return (
			<>
				<Button showArrow={false} mr={2} onClick={onResetSeed}>
					Nope, something is wrong!
				</Button>
				<Button onClick={onConfirmSeed}>Yes, looks good to me.</Button>
			</>
		)
	})()

	const invalidButtons = (() => {
		const resetSeed = () => {
			wordDispatch({ type: 'RESET' })
		}

		return (
			<>
				<Text mb={3}>
					<strong>
						The seed you entered is invalid. This usually means that
						at least one of the words entered is incorrect.
					</strong>
				</Text>
				<Button showArrow={false} onClick={resetSeed}>
					Ok, reset words
				</Button>
			</>
		)
	})()

	return (
		<Box mt={23}>
			<EnterWords
				dispatch={wordDispatch}
				words={words}
				total={total}
				isValid={isValid}
				suggestions={wordList}
				confirmButtons={confirmButtons}
				invalidButtons={invalidButtons}
			/>
		</Box>
	)
}

export default Enter
