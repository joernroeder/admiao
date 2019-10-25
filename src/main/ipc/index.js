const { ipcMain } = require('electron')

// ipc bridge for parts generation. used for local printing
const parts = require('./generate-parts')

// ipc bridge for local template handling
const local = require('./local-template')

// ipc bridge for to generate pdfs for remote printing and digital storage
const generate = require('./generate-pdf')

// usb helper providing the state of currently attached drives
const usb = require('./usb')

const fileSystem = require('./file-system')

module.exports = modules => {
	parts(ipcMain, modules)
	local(ipcMain, modules)
	generate(ipcMain, modules)
	usb(ipcMain, modules)
	fileSystem(ipcMain, modules)
}
