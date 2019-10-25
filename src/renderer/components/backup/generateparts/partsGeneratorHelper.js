/**
 * Bridge Interface to deal with generator state during part generation.
 *
 * This needs to be simplified whenever we're able to update to electron 7 and
 * its newly introduced async ipcMain.handle – await ipcRenderer.invoke async syntax.
 *
 * @param identifier
 * @param words
 * @param seedPartsState
 * @param generatorState
 * @returns {Promise<*>}
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
			if (data.identifier !== identifier) {
				return reject('Got wrong identifier from parts generation.', {
					identifierSent: identifier,
					receivedIdentifier: data.identifier,
				})
			}

			if (error) {
				generatorState.set({
					state: generatorState.STATES.generationFailed,
					error,
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

				resolve(data) // <<<<---- differs here from pdf generator
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
