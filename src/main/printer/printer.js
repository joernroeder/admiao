const { app, BrowserWindow } = require('electron')

const printer = require('pdf-to-printer')

let printers = []

const createPrintersList = () => {
	printer
		.list()
		.then(data => {
			console.log(data)
		})
		.catch(error => {
			console.log(error)
		})
}

module.exports = {
	createPrintersList,
}
