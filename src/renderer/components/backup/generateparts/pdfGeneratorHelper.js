export const generatePdfsViaIpc = async ({
	words,
	seedPartsState,
	generatorState,
}) => {
	return new Promise((resolve, reject) => {
		const { ipcRenderer } = window

		// set loading indicator
		generatorState.set({
			...generatorState.state,
			state: generatorState.STATES.loading,
		})

		// on ipc reply
		ipcRenderer.on('pdfs-generated', (event, { error, data }) => {
			if (error) {
				generatorState.set({
					state: generatorState.STATES.generationFailed,
					error: error,
				})

				return reject(error)
			}

			console.log(data)
			setTimeout(() => {
				generatorState.set({
					...generatorState.state,
					state: generatorState.STATES.successfullyGenerated,
					pendingIdentifier: data.identifier,
				})

				resolve(true)
			}, 1000)
		})

		const {
			uniquePartsN,
			requiredPartsT,
			partsPerDisk,
			requiredDisks,
		} = seedPartsState

		// send words meta data to main process
		ipcRenderer.send('generate-pdfs', {
			words: words.join(' '),
			seedParts: {
				uniquePartsN,
				requiredPartsT,
				partsPerDisk,
				requiredDisks,
			},
		})
		console.log('sent...')
	})
}
