const {
	generateTemplate,
	removeTemplate,
	openTemplateInWindow,
	saveDocumentToPath,
} = require('../pdf/pdfGenerator')

module.exports = (ipcMain, modules) => {
	ipcMain.on('generate-template', (event, args) => {
		const { requiredPartsT, uniquePartsN } = args

		let data = null
		let error = null

		try {
			const { identifier } = generateTemplate({
				requiredPartsT,
				uniquePartsN,
			})

			data = { identifier }
		} catch (e) {
			error = e.message
		} finally {
			event.reply('template-generated', {
				error,
				data,
			})
		}
	})

	ipcMain.on('remove-template', (event, args) => {
		const { identifier } = args

		if (!identifier) {
			return
		}

		const removed = removeTemplate({ identifier })
		console.log('template removed', removed)

		event.reply('template-removed', { identifier, removed })
	})

	ipcMain.on('open-template', async (event, args) => {
		console.log('args', args)
		const { identifier } = args

		const isOpen = await openTemplateInWindow({ identifier })
		event.reply('template-opened', { identifier, isOpen })
	})

	ipcMain.on('copy-template', async (event, args) => {
		const { identifier, path } = args

		const copied = await saveDocumentToPath(path, identifier)

		event.reply('template-copied', { identifier, copied })
	})
}
