import React, { createContext, useContext, useReducer, useEffect } from 'react'

const localStorageKey = 'DistributionState'

const initialState = {
	distributionType: undefined,
	distributionIdentifier: undefined,
}

const DistributionTypes = {
	LOCAL_PRINT: 'LOCAL_PRINT',
	REMOTE_PRINT: 'REMOTE_PRINT',
	DIGITAL: 'DIGITAL',
	FILE_SYSTEM: 'FILE_SYSTEM',
}

function reducer(state, action) {
	// sets Distribution Type
	if (Object.keys(DistributionTypes).includes(action.type)) {
		return {
			...state,
			distributionType: DistributionTypes[action.type],
			distributionIdentifier: action.payload || undefined,
		}
	}

	switch (action.type) {
		case 'RESET': {
			localStorage.removeItem(localStorageKey)

			return {
				...initialState,
			}
		}

		case 'SET_IDENTIFIER': {
			return {
				...state,
				distributionIdentifier: action.payload,
			}
		}

		default:
			return state
	}
}

const DistributionStateContext = createContext(undefined)
const DistributionDispatchContext = createContext(undefined)

function DistributionProvider({ children }) {
	const [state, dispatch] = useReducer(
		reducer,
		initialState,
		initialState => {
			const previousState = localStorage.getItem(localStorageKey)

			return previousState ? JSON.parse(previousState) : initialState
		}
	)

	// store distributionType in local storage.
	// This stores the distribution type to improve the backup process.
	useEffect(() => {
		if (state.isInitialState) {
			return
		}

		// filter out empty and initial states
		if (!Object.values(state).filter(Boolean).length) {
			return
		}

		console.log(Object.values(state).filter(Boolean).length)
		localStorage.setItem(localStorageKey, JSON.stringify(state))
	}, [state])

	return (
		<DistributionStateContext.Provider value={state}>
			<DistributionDispatchContext.Provider value={dispatch}>
				{children}
			</DistributionDispatchContext.Provider>
		</DistributionStateContext.Provider>
	)
}

function useDistributionState() {
	const context = useContext(DistributionStateContext)

	if (context === undefined) {
		throw new Error(
			'useDistributionState must be used within a DistributionProvider'
		)
	}
	return context
}

function useDistributionDispatch() {
	const context = useContext(DistributionDispatchContext)

	if (context === undefined) {
		throw new Error(
			'useDistributionDispatch must be used within a DistributionProvider'
		)
	}
	return context
}

export {
	DistributionProvider,
	useDistributionState,
	useDistributionDispatch,
	DistributionTypes,
}
