const { BrowserWindow } = require('electron')

module.exports = (ipcMain, modules) => {
	ipcMain.on('get-usb-mountpoints', event => {
		event.returnValue = modules.usb.getAttachedMountPoints()
	})

	modules.usb.drivesEmitter.on('attach', drive => {
		BrowserWindow.getAllWindows().forEach(win => {
			win.webContents.send('drive-attached', {
				drive: modules.usb.getMountPointForDrive(drive),
			})
		})
	})

	modules.usb.drivesEmitter.on('detach', drive => {
		BrowserWindow.getAllWindows().forEach(win => {
			win.webContents.send('drive-detached', {
				drive: modules.usb.getMountPointForDrive(drive),
				remainingMountPoints: modules.usb.getAttachedMountPoints(),
			})
		})
	})
}
