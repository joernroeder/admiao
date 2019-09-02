const electron = require('electron')
const path = require('path')

const { isDev } = require('./development')

const BrowserWindow = electron.BrowserWindow

let mainWindow

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 680,
		titleBarStyle: 'hiddenInset',
		webPreferences: {
			webSecurity: true,
			nodeIntegration: false,
			preload: __dirname + '/window-preload.js',
		},
	})

	mainWindow.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`
	)

	mainWindow.on('closed', () => (mainWindow = null))
}

const hasMainWindow = () => {
	return !!mainWindow
}

module.exports = {
	createWindow,
	hasMainWindow,
}
