import React, { createContext, useContext, useReducer } from 'react'
const bip39 = require('bip39')

const initialWords = [
	/*
	'answer',
	'dice',
	'warm',
	'cup',
	'shock',
	'orbit',
	'pistol',
	'seat',
	'modify',
	'matrix',
	'genre',
	'renew',
	*/
]

const initialState = {
	words: initialWords,
	total: 12, // todo handle other seeds 18, 24
	isConfirmed: false,
	isValid: getIsValid(initialWords),
}

function getIsValid(words) {
	return bip39.validateMnemonic(words.join(' '))
}

function wordsReducer(state, action) {
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
				isConfirmed: false,
				isValid: false,
			}
		}

		case 'CLEANUP_SEED': {
			return {
				...state,
				words: [],
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

		case 'CONFIRM': {
			return {
				...state,
				isConfirmed: true,
			}
		}

		default:
			return state
	}
}

const SeedWordsStateContext = createContext(undefined)
const SeedWordsDispatchContext = createContext(undefined)

function SeedWordsProvider({ children }) {
	const [state, dispatch] = useReducer(wordsReducer, initialState)

	return (
		<SeedWordsStateContext.Provider value={state}>
			<SeedWordsDispatchContext.Provider value={dispatch}>
				{children}
			</SeedWordsDispatchContext.Provider>
		</SeedWordsStateContext.Provider>
	)
}

function useSeedWordsState() {
	const context = useContext(SeedWordsStateContext)

	if (context === undefined) {
		throw new Error(
			'useSeedWordsState must be used within a SeedWordsProvider'
		)
	}
	return context
}

function useSeedWordsDispatch() {
	const context = useContext(SeedWordsDispatchContext)

	if (context === undefined) {
		throw new Error(
			'useSeedWordsDispatch must be used within a SeedWordsProvider'
		)
	}
	return context
}

export {
	SeedWordsProvider,
	useSeedWordsState,
	useSeedWordsDispatch,
	wordsReducer,
}
