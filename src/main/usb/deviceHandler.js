const EventEmitter = require('events')
const drivelist = require('drivelist')

const driveStorage = new Map()
const drivesEmitter = new EventEmitter()

const driveCheckInterval = 1000

let isListening = false
let driveCheckTimeout = null

drivesEmitter.on('attach', device => {
	console.log('--> added', device)
})

drivesEmitter.on('detach', device => {
	console.log('--> removed', device)
})

const driveCheckLoop = async () => {
	driveCheckTimeout = null

	const now = Date.now()
	const drives = await drivelist.list()

	const mountedUsbDrives = drives
		.filter(({ isUSB }) => isUSB)
		.filter(({ isRemovable }) => isRemovable)
		.filter(({ mountpoints }) => mountpoints.length)

	mountedUsbDrives.forEach(drive => {
		const { devicePath } = drive

		const deviceData = {
			drive,
			timestamp: now,
		}

		// path does not exist -> emitting add event
		if (!driveStorage.has(devicePath)) {
			drivesEmitter.emit('attach', drive)
			driveStorage.set(devicePath, deviceData)
		}
		// updating existing timestamp
		else if (driveStorage.has(devicePath)) {
			driveStorage.set(devicePath, deviceData)
		}
	})

	for (const [devicePath, { drive, timestamp }] of driveStorage) {
		// just looking for older timestamps
		if (timestamp >= now) {
			continue
		}

		console.log(
			`device at ${devicePath} was not in latest list. detaching...`
		)
		drivesEmitter.emit('detach', drive)
		driveStorage.delete(devicePath)
	}

	if (isListening) {
		driveCheckTimeout = setTimeout(driveCheckLoop, driveCheckInterval)
	}
}

const listen = async () => {
	isListening = true

	await driveCheckLoop()
}

const stop = () => {
	isListening = false

	if (driveCheckTimeout) {
		clearTimeout(driveCheckTimeout)
	}
}

const hasDriveAttached = () => {
	return !!driveStorage.size
}

const getAttachedMountPoints = () => {
	let mountPoints = []

	if (!hasDriveAttached()) {
		return mountPoints
	}

	for (const [_, { drive }] of driveStorage) {
		const { isReadOnly } = drive

		mountPoints.push({
			isReadOnly,
			...drive.mountpoints[0],
		})
	}

	return mountPoints
}

module.exports = {
	listen,
	stop,
	hasDriveAttached,
	getAttachedMountPoints,
	drivesEmitter,
}
