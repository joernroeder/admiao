import React, { createContext, useContext, useState } from 'react'

const STATES = {
	loading: 'LOADING',
	successfullyGenerated: 'SUCCESSFULLY_GENERATED',
	generationFailed: 'GENERATION_FAILED',
	successfullyDistributed: 'SUCCESSFULLY_DISTRIBUTED',
	distributionFailed: 'DISTRIBUTION_FAILED',
}

const GeneratorStateContext = createContext(undefined)

function GeneratorStateProvider({ children }) {
	const [generatorState, setGeneratorState] = useState({
		state: undefined,
		pendingIdentifier: null,
		error: null,
		// additional data returned by the ipc methods may get stored here.
		// todo be more precise/refactor once all distribution types are implemented
		meta: {},
	})

	return (
		<GeneratorStateContext.Provider
			value={[generatorState, setGeneratorState]}
		>
			{children}
		</GeneratorStateContext.Provider>
	)
}

function useGeneratorState() {
	const context = useContext(GeneratorStateContext)

	if (context === undefined) {
		throw new Error(
			'useGeneratedParts must be used within a GeneratedPartsProvider'
		)
	}
	return context
}

export { GeneratorStateProvider, useGeneratorState, STATES }
