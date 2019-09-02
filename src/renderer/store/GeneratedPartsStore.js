import React, { createContext, useContext, useReducer } from 'react'

const initialState = {
	parts: [],
	confirmed: [],
}

function reducer(state, action) {
	switch (action.type) {
		case 'SET_PARTS': {
			console.log('setting parts in store', action)
			return {
				...state,
				confirmed: Array(action.payload.length).fill(false),
				parts: action.payload,
			}
		}

		case 'CONFIRMED': {
			const updatedConfirmed = {
				confirmed: state.confirmed.map((isConfirmed, index) => {
					if (index === action.payload) {
						return true
					}

					return isConfirmed
				}),
			}

			return {
				...state,
				...updatedConfirmed,
			}
		}

		case 'RESET': {
			return {
				...initialState,
			}
		}

		default:
			return state
	}
}

const GeneratedPartsStateContext = createContext(undefined)
const GeneratedPartsDispatchContext = createContext(undefined)

function GeneratedPartsProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<GeneratedPartsStateContext.Provider value={state}>
			<GeneratedPartsDispatchContext.Provider value={dispatch}>
				{children}
			</GeneratedPartsDispatchContext.Provider>
		</GeneratedPartsStateContext.Provider>
	)
}

function useGeneratedParts() {
	const context = useContext(GeneratedPartsStateContext)

	if (context === undefined) {
		throw new Error(
			'useGeneratedParts must be used within a GeneratedPartsProvider'
		)
	}
	return context
}

function useGeneratedPartsDispatch() {
	const context = useContext(GeneratedPartsDispatchContext)

	if (context === undefined) {
		throw new Error(
			'useDistributionDispatch must be used within a GeneratedPartsProvider'
		)
	}
	return context
}

export { GeneratedPartsProvider, useGeneratedParts, useGeneratedPartsDispatch }
