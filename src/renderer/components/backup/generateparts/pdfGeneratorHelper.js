export const generatePdfsViaIpc = async ({
	words,
	seedPartsState,
	generatorState,
}) => {
	return Promise((resolve, reject) => {
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
					state: generatorState.STATES.failed,
					error: error.message,
				})

				return reject(error.message)
			}

			console.log(data)
			setTimeout(() => {
				generatorState.set({
					...generatorState.state,
					state: generatorState.STATES.generated,
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
	})
}

/*
// todo use ipcMain.invoke when electron 7 comes along
export const generatePartsViaIpc = async ({ identifier, words, seedPartsState, generatorState }) => {
	const { ipcRenderer } = window;

	generatorState.set({
		...generatorState.state,
		state: generatorState.STATES.loading
	});

	try {
		const { uniquePartsN, requiredPartsT, partsPerDisk, requiredDisks } = seedPartsState;

		const data = await ipcRenderer.invoke('generate-parts', {
			words: words.join(' '),
			seedParts: {
				uniquePartsN,
				requiredPartsT,
				partsPerDisk,
				requiredDisks,
			},
			identifier,
		});

		generatorState.set({
			...generatorState.state,
			state: generatorState.STATES.generated,
			pendingIdentifier: data.identifier
		});

		return data;
	}
	catch (error) {
		generatorState.set({
			state: generatorState.STATES.failed,
			error
		});
	}
};
*/

export const generatePartsViaIpc = async ({
	identifier,
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

		ipcRenderer.on('parts-generated', (event, { error, data }) => {
			if (error) {
				generatorState.set({
					state: generatorState.STATES.failed,
					error: error.message,
				})

				return reject(error.message)
			}

			console.log(data)
			setTimeout(() => {
				generatorState.set({
					...generatorState.state,
					state: generatorState.STATES.generated,
					pendingIdentifier: data.identifier,
				})

				resolve(data)
			}, 1000)
		})

		const {
			uniquePartsN,
			requiredPartsT,
			partsPerDisk,
			requiredDisks,
		} = seedPartsState

		// send words meta data to main process
		ipcRenderer.send('generate-parts', {
			words: words.join(' '),
			seedParts: {
				uniquePartsN,
				requiredPartsT,
				partsPerDisk,
				requiredDisks,
			},
			identifier,
		})
	})
}
