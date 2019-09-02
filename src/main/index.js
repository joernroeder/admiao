const electron = require('electron')

const { isDev, installExtensions } = require('./development')
const { createWindow, hasMainWindow } = require('./windows')

const usb = require('./usb/deviceHandler')

const ipc = require('./ipc')

ipc({
	usb,
})

console.log(electron.app.getPath('userData'))

//const { createPrintersList } = require('./printer/printer');

//const { generatePartsFor, recoverSecretFromParts } = require('./slip39generator');

const app = electron.app

app.on('ready', async () => {
	if (isDev) {
		await installExtensions()
	}

	usb.listen()
	//createPrintersList();

	createWindow()
})

app.on('window-all-closed', () => {
	if (process.platform === 'darwin') {
		return
	}

	usb.stop()
	app.quit()
})

app.on('activate', () => {
	if (hasMainWindow()) {
		return
	}

	createWindow()
})

//generatePdfs();

/*
const words = 'glimpse nasty mixture shoe case october system track cube another soccer idea drive correct similar arrow cram museum blue grid case bring mimic pizza';

try {
	const parts = generatePartsFor(words, {required: 3, total: 5});

	console.log('recovered', recoverSecretFromParts([
		parts[1],
		parts[4],
		parts[2]
	]));
}
catch (e) {
	console.log(e);
}
*/
