const { app, dialog } = require('electron')

const { generatePartsFor } = require('../slip39generator')

const {
	generateSharePdfs,
	saveSharePdfsToFileSystem,
} = require('../pdf/pdfGenerator')

module.exports = (ipcMain, modules) => {
	ipcMain.on('generate-pdfs', (event, args) => {
		const { words, seedParts: settings } = args
		const { requiredPartsT: required, uniquePartsN: total } = settings

		const now = Date.now()
		console.log('generating pdfs for shares')

		let data = null
		let error = null

		try {
			data = generatePartsFor(words, { required, total })

			const identifier = generateSharePdfs(data, settings)

			data = { identifier }
		} catch (e) {
			console.log(e)

			error = e.message
		} finally {
			event.reply('pdfs-generated', {
				error,
				data,
			})

			console.log('pdf generation done.', Date.now() - now)
		}
	})

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
					error = e.message
				}
			} else {
				error = 'No location selected.'
			}

			event.reply('parts-saved-to-filesystem', {
				error,
				data,
			})
		})
	})
}
