import { useState, useEffect } from 'react'

export function useMountPoints(ipcRenderer) {
	const [mountPoints, setMountPoints] = useState([])

	const resetMountPoints = () => {
		setMountPoints([])
	}

	useEffect(() => {
		const mountPoints = ipcRenderer.sendSync('get-usb-mountpoints')
		setMountPoints(mountPoints)

		const onAttached = (event, { drive }) => {
			setMountPoints([drive])
		}

		const onDetached = (event, { remainingMountPoints }) => {
			setMountPoints(remainingMountPoints)
		}

		ipcRenderer.on('drive-attached', onAttached)
		ipcRenderer.on('drive-detached', onDetached)

		return () => {
			ipcRenderer.removeListener('drive-attached', onAttached)
			ipcRenderer.removeListener('drive-detached', onDetached)
		}
	}, [ipcRenderer])

	return [mountPoints, resetMountPoints]
}
