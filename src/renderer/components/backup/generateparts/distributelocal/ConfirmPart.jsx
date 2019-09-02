import React, { useReducer } from 'react'
import raw from 'raw.macro'

/** @jsx jsx */
import { jsx } from '@emotion/core'

import {
	useGeneratedParts,
	useGeneratedPartsDispatch,
} from '../../../../store/GeneratedPartsStore'

import { Box } from 'reflexbox'

import Button from '../../../Button'
import TextHeading from '../../../TextHeading'
import EnterWords from '../../../EnterWords'
import Text from '../../../Text'

const wordList = raw('../../../../wordlists/slip39/english.txt')
	.split('\n')
	.filter(Boolean)

const ConfirmPart = ({ partIndex }) => {
	const index = parseInt(partIndex)
	const { parts, confirmed } = useGeneratedParts()
	/*
	const parts = [
		"lecture category academic leaf agree body painting survive floral spray language visitor dress",
		"lecture category academic lily adult ladle equip expect ocean sweater clinic member inmate traffic",
		"lecture category academic lungs antenna luck briefing dragon terminal improve knit loyalty idea"
	];
	*/

	const partWords = parts[index] ? parts[index] : ''
	const partWordsList = partWords.split(' ')

	const generatedPartsDispatch = useGeneratedPartsDispatch()

	const getIsValid = words => {
		console.log('is valid', words, partWords, partWords === words.join(' '))
		return partWords === words.join(' ')
	}

	const wordsReducer = function(state, action) {
		const { words } = state

		switch (action.type) {
			case 'APPEND': {
				const updatedWords = [...words, action.payload]

				return {
					...state,
					words: updatedWords,
					isValid: getIsValid(updatedWords),
				}
			}

			case 'RESET': {
				return {
					...state,
					words: [],
					isValid: false,
				}
			}

			case 'POP': {
				const updatedWords = [...words.slice(0, -1)]

				return {
					...state,
					words: updatedWords,
					isValid: getIsValid(updatedWords),
				}
			}

			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(wordsReducer, {
		/*
		words: ["lecture", "category", "academic", "leaf", "agree", "body", "painting…nsion", "survive", "floral", "spray", "language", "visitor", "dress"],
		isValid: true,
		*/
		words: parts,
		isValid: true,
		//words: [],
		//isValid: false
	})

	const incompleteButtons = (() => {
		return (
			<>
				<Button showArrow={false} to={`../../copy/${index}`}>
					Show Words Again
				</Button>
			</>
		)
	})()

	const invalidButtons = (() => {
		const resetPart = () => {
			dispatch({ type: 'RESET' })
		}

		return (
			<>
				<Text mb={3}>
					<strong>
						The part you entered is invalid. This usually means that
						at least one of the words entered is incorrect.
					</strong>
				</Text>
				<Button showArrow={false} onClick={resetPart}>
					Ok, reset words
				</Button>
			</>
		)
	})()

	const confirmButtons = (() => {
		/*const allPartsConfirmed = storeParts.length -1 <= confirmed
			.reduce((accumulator, value) => {
				return value ? accumulator + 1 : accumulator
			}, 0);
		 */
		const allPartsConfirmed = index >= parts.length - 1

		const onConfirmPart = () => {
			generatedPartsDispatch({ type: 'CONFIRM', payload: index })
		}

		return (
			<>
				{allPartsConfirmed ? (
					<Button onClick={onConfirmPart} to={'/create/done'}>
						Done!
					</Button>
				) : (
					<Button
						onClick={onConfirmPart}
						to={`../../copy/${index + 1}`}
					>
						Continue with next Part
					</Button>
				)}
			</>
		)
	})()

	return (
		<Box mt={19}>
			<TextHeading>CONFIRM Part {index + 1}</TextHeading>

			<EnterWords
				dispatch={dispatch}
				words={state.words}
				total={partWordsList.length}
				isValid={state.isValid}
				suggestions={wordList}
				incompleteButtons={incompleteButtons}
				invalidButtons={invalidButtons}
				confirmButtons={confirmButtons}
			/>
		</Box>
	)
}

export default ConfirmPart
