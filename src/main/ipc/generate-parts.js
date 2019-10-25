const { app, dialog } = require('electron')

const { generatePartsFor } = require('../slip39generator')
const { saveSharePdfsToFileSystem } = require('../pdf/pdfGenerator')

/**
 * Generates slip39 shares for the passed in bip39 word seed and settings
 * (@see seedPartsStore) and sends them back via `parts-generated` ipc message
 * together with the passed in identifier.
 */
module.exports = (ipcMain, modules) => {
	ipcMain.on('generate-parts', (event, args) => {
		console.log(args)
		const { words, seedParts: settings, identifier } = args
		const { requiredPartsT: required, uniquePartsN: total } = settings

		const now = Date.now()
		console.log('generating shares for given words', words)

		let data = null
		let error = null

		try {
			data = generatePartsFor(words, { required, total })
			data = {
				...data,
				identifier,
			}
		} catch (e) {
			console.log(e)

			error = e
		} finally {
			event.reply('parts-generated', {
				error,
				data,
			})

			console.log('part generation done.', Date.now() - now)
		}
	})

	/*
	// todo use .handle when electron 7 comes along
	ipcMain.handle('generate-parts', async (event, args) => {
		return new Promise((resolve, reject) => {
			console.log(args);
			const {words, seedParts: settings, identifier} = args;
			const {requiredPartsT: required, uniquePartsN: total} = settings;

			console.log('generating pdfs for shares');

			try {
				let data = generatePartsFor(words, {required, total});
				data = {
					...data,
					identifier
				};

				return resolve(data);

			} catch (e) {
				reject(e.message);
			}
		});
	});
	*/

	ipcMain.on('open-parts-location-selector', (event, args) => {
		console.log('ipc:open-parts-location-selector')

		const { forIdentifier: identifier } = args

		const options = {
			title: 'Select Directory to save Parts',
			buttonLabel: 'Save Parts',
			defaultPath: app.getPath('documents'),
			properties: ['openDirectory', 'createDirectory'],
		}

		dialog.showOpenDialog(null, options, filePaths => {
			let error = null
			let data = null

			if (filePaths && filePaths.length) {
				try {
					const [filePath] = filePaths

					data = saveSharePdfsToFileSystem(filePath, identifier)
				} catch (e) {
					console.warn(e)
					error = e
				}
			} else {
				error = new Error('No location selected.')
			}

			event.reply('parts-saved-to-filesystem', {
				error,
				data,
			})
		})
	})
}
