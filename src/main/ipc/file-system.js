const { shell, BrowserWindow, webContents } = require('electron')

module.exports = (ipcMain, modules) => {
	ipcMain.on('open-directory', (event, args) => {
		const { path, focusWindow = false } = args

		const isOpen = shell.openItem(path)
		const sendReply = () => {
			event.reply('directory-opened', { isOpen })
		}

		if (!focusWindow) {
			return sendReply()
		}

		setTimeout(() => {
			try {
				console.log('frameId', event.frameId)
				const contents = webContents.fromId(event.frameId)
					.hostWebContents
				console.log(contents)
				console.log('- from web', contents.id)
				BrowserWindow.fromWebContents(contents).show()
				console.log('- from id')
				BrowserWindow.fromId(event.frameId).show()
			} catch (e) {
				console.warn(e)
				/*
				 this catches a bug in electron where a window with `event.frameId`
				 does not exist anymore.
				 how to replicate:
				   1. interface opens a window, sends the `open-directory` message -> frameId === 1
				   2. close the window, create a new one by activating the app from macOS dock
				   3. resend the message -> frameId === 1, BrowserWindow.getAllWindows()[0].id === 2
				 */
				const allWindows = BrowserWindow.getAllWindows()

				if (allWindows.length === 1) {
					const [win] = allWindows

					console.log('window id', win.id)
					win.show()
				}
				/*
				BrowserWindow.getAllWindows().forEach((win) => {
					console.log('win.id', win.id)
				})
				*/
			} finally {
				sendReply()
			}
		}, 300)
	})
}
