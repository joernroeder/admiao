module.exports = (ipcMain, modules) => {
	ipcMain.on('get-usb-mountpoints', event => {
		event.returnValue = modules.usb.getAttachedMountPoints()
	})

	modules.usb.drivesEmitter.on('attach', drive => {
		ipcMain.emit('drive-attached', drive)
		//ipcMain.send('drive-attached', drive);
		//ipcMain.send('has-drives-attached', modules.usb.hasDriveAttached());
	})

	modules.usb.drivesEmitter.on('detach', drive => {
		//ipcMain.send('drive-detached', drive);
		//ipcMain.send('has-drives-attached', modules.usb.hasDriveAttached());
	})
}
