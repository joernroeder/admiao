const { generatePartsFor } = require('../slip39generator')

module.exports = (ipcMain, modules) => {
	ipcMain.on('generate-parts', (event, args) => {
		console.log(args)
		const { words, seedParts: settings, identifier } = args
		const { requiredPartsT: required, uniquePartsN: total } = settings

		const now = Date.now()
		console.log('generating pdfs for shares')

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

			error = e.message
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
}
