import React from 'react'

import Button from '../../../Button'
import Notice from '../../../Notice'

import { useGeneratorState, STATES } from '../../../../store/GeneratorState'

const SavePdfsToFileSystemButton = () => {
	const { ipcRenderer } = window
	const [generatorState, setGeneratorState] = useGeneratorState()

	const hasPendingIdentifier = !!generatorState.pendingIdentifier

	const onSaveToFileSystem = () => {
		ipcRenderer.send('open-parts-location-selector', {
			forIdentifier: generatorState.pendingIdentifier,
		})

		ipcRenderer.once(
			'parts-saved-to-filesystem',
			(event, { data, error }) => {
				if (error) {
					return setGeneratorState({
						...generatorState,
						state: STATES.distributionFailed,
						error,
					})
				}

				const { identifier, pendingDocuments, savedToPath } = data

				setGeneratorState({
					...generatorState,
					state: STATES.successfullyDistributed,
					pendingIdentifier: pendingDocuments ? identifier : null,
					meta: {
						savedToPath,
					},
				})

				console.log('saved!', data)
			}
		)
	}

	return (
		<>
			{hasPendingIdentifier ? (
				<Button onClick={onSaveToFileSystem} variant={'filled'}>
					Save PDFs to Filesystem
				</Button>
			) : (
				<Notice>Successfully saved to selected location!</Notice>
			)}
		</>
	)
}

export default SavePdfsToFileSystemButton
