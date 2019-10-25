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
			const { parts } = generatePartsFor(words, { required, total })

			const identifier = generateSharePdfs(parts, settings)

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

	ipcMain.on('save-pdfs-to-filesystem', (event, args) => {
		const { identifier, path, amount } = args

		let error = null
		let data = null

		try {
			data = saveSharePdfsToFileSystem(path, identifier, {
				documentsToCopy: amount,
				uniqueDestination: true,
			})
		} catch (e) {
			console.log(e)
			error = e
		} finally {
			event.reply('pdfs-saved-to-filesystem', {
				error,
				data,
			})
		}
	})
}
