import React from 'react'

import Button from '../../Button'
import Notice from '../../Notice'

const SavePdfsToFileSystemButton = ({
	generatorState,
	setGeneratorState,
	STATES,
}) => {
	const { ipcRenderer } = window

	const hasPendingIdentifier = !!generatorState.pendingIdentifier

	const onSaveToFileSystem = () => {
		ipcRenderer.send('open-parts-location-selector', {
			forIdentifier: generatorState.pendingIdentifier,
		})

		ipcRenderer.once('parts-saved-to-filesystem', (event, args) => {
			const { identifier, pendingDocuments } = args

			setGeneratorState({
				...generatorState,
				state: STATES.saved,
				pendingIdentifier: pendingDocuments ? identifier : null,
			})

			console.log('saved!', args)
		})
	}

	return (
		<>
			{hasPendingIdentifier ? (
				<Button onClick={onSaveToFileSystem}>
					Save PDFs to Filesystem
				</Button>
			) : (
				<Notice>Successfully saved to selected location!</Notice>
			)}
		</>
	)
}

export default SavePdfsToFileSystemButton
