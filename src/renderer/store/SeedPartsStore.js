import React, { createContext, useContext, useEffect, useReducer } from 'react'

const localStorageKey = 'SeedPartsState'

const initialState = {
	uniquePartsN: 3,
	requiredPartsT: 2,

	partsPerDisk: 1,
	requiredDisks: 3,

	recoveredFromPreviousSelection: false,
	isInitialState: true,
}

const calcDisks = (uniquePartsN, requiredPartsT) => {
	const partsPerDisk = requiredPartsT - 1
	const requiredDisks = Math.ceil(uniquePartsN / partsPerDisk)

	return {
		partsPerDisk,
		requiredDisks,
	}
}

function reducer(state, action) {
	const { uniquePartsN, requiredPartsT } = state

	const isModifiedState = {
		recoveredFromPreviousSelection: false,
		isInitialState: false,
	}

	switch (action.type) {
		case 'INCREMENT_REQUIRED': {
			const updatedRequiredPartsT = Math.min(
				requiredPartsT + 1,
				uniquePartsN
			)

			return {
				...state,
				requiredPartsT: updatedRequiredPartsT,
				...calcDisks(state.uniquePartsN, updatedRequiredPartsT),
				...isModifiedState,
			}
		}

		case 'DECREMENT_REQUIRED': {
			const updatedRequiredPartsT = Math.max(requiredPartsT - 1, 1)

			return {
				...state,
				requiredPartsT: updatedRequiredPartsT,
				...calcDisks(state.uniquePartsN, updatedRequiredPartsT),
				...isModifiedState,
			}
		}

		case 'INCREMENT_UNIQUE': {
			const updatedUniquePartsN = uniquePartsN + 1

			return {
				...state,
				uniquePartsN: updatedUniquePartsN,
				...calcDisks(updatedUniquePartsN, state.requiredPartsT),
				...isModifiedState,
			}
		}

		case 'DECREMENT_UNIQUE': {
			const updatedUniquePartsN = Math.max(uniquePartsN - 1, 1)
			// also decrement required parts if they would exceed otherwise
			const updatedRequiredPartsT = Math.min(
				updatedUniquePartsN,
				requiredPartsT
			)

			return {
				...state,
				uniquePartsN: updatedUniquePartsN,
				requiredPartsT: updatedRequiredPartsT,
				...calcDisks(updatedUniquePartsN, updatedRequiredPartsT),
				...isModifiedState,
			}
		}

		case 'CONFIRM': {
			return {
				...state,
				...isModifiedState,
			}
		}

		case 'RESET': {
			localStorage.removeItem(localStorageKey)

			return {
				...initialState,
			}
		}

		default:
			return state
	}
}

const SeedPartsStateContext = createContext(undefined)
const SeedPartsDispatchContext = createContext(undefined)

function SeedPartsProvider({ children }) {
	// uses a previous state from local storage if available or uses the initial one defined above.
	const [state, dispatch] = useReducer(
		reducer,
		initialState,
		initialState => {
			const previousState = localStorage.getItem(localStorageKey)

			return previousState
				? {
						...JSON.parse(previousState),
						recoveredFromPreviousSelection: true,
				  }
				: initialState
		}
	)

	// store current state in local storage.
	// This is used to improve the backup process if the user paused to print the
	// seed templates.
	useEffect(() => {
		if (state.isInitialState) {
			return
		}

		localStorage.setItem(localStorageKey, JSON.stringify(state))
	}, [state])

	return (
		<SeedPartsStateContext.Provider value={state}>
			<SeedPartsDispatchContext.Provider value={dispatch}>
				{children}
			</SeedPartsDispatchContext.Provider>
		</SeedPartsStateContext.Provider>
	)
}

function useSeedPartsState() {
	const context = useContext(SeedPartsStateContext)

	if (context === undefined) {
		throw new Error(
			'useSeedPartsState must be used within a SeedPartsProvider'
		)
	}
	return context
}

function useSeedPartsDispatch() {
	const context = useContext(SeedPartsDispatchContext)

	if (context === undefined) {
		throw new Error(
			'useSeedPartsDispatch must be used within a SeedPartsProvider'
		)
	}
	return context
}

export { SeedPartsProvider, useSeedPartsState, useSeedPartsDispatch }
