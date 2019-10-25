import React from 'react'
import { Box, Flex } from 'reflexbox'
import { navigate } from '@reach/router'
import raw from 'raw.macro'

import {
	useSeedWordsDispatch,
	useSeedWordsState,
} from '../../../store/SeedWordsStore'

import Text from '../../Text'
import Button, { Directions } from '../../Button'
import EnterWords from '../../EnterWords'

const wordList = raw('../../../wordlists/bip39/english.txt')
	.split('\n')
	.filter(Boolean)

const Enter = ({ location }) => {
	const { state } = location
	const { words, total, isValid } = useSeedWordsState()

	const wordDispatch = useSeedWordsDispatch()

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
			<Flex>
				<Button
					direction={Directions.BACKWARDS}
					mr={2}
					onClick={onResetSeed}
				>
					Something is wrong!
				</Button>
				<Button onClick={onConfirmSeed} variant={'filled'}>
					Yes, looks good to me.
				</Button>
			</Flex>
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
				<Button direction={Directions.BACKWARDS} onClick={resetSeed}>
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
