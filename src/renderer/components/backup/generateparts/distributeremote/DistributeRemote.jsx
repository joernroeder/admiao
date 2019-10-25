import React, { useState, useEffect } from 'react'

import { navigate } from '@reach/router'

import { useSeedPartsState } from '../../../../store/SeedPartsStore'
import { useMountPoints } from '../../../../hooks/useMountPoints'
import { useGeneratorState } from '../../../../store/GeneratorState'
import InsertUsbDrive from './InsertUsbDrive'
import UsbDriveAttached from './UsbDriveAttached'
import UsbDriveError from './UsbDriveError'
import UsbDriveSuccessfullyCopied from './UsbDriveSuccessfullyCopied'

/*
 Handles remote distribution via usb drives.
 */
const DistributeRemote = () => {
	const { ipcRenderer } = window

	const { partsPerDisk, uniquePartsN } = useSeedPartsState()
	const [generatorState] = useGeneratorState()

	const [mountPoints, resetMountPoints] = useMountPoints(ipcRenderer)
	const [sharesRemaining, setSharesRemaining] = useState(uniquePartsN)

	// stores a response from a previous
	const [copyResponse, setCopyResponse] = useState(undefined)

	const sharesToCopy = Math.min(sharesRemaining, partsPerDisk)
	const driveCounter =
		Math.ceil((uniquePartsN - sharesRemaining) / partsPerDisk) + 1

	const { pendingIdentifier } = generatorState

	const copyNextSharesToDrive = () => {
		const [{ path }] = mountPoints

		ipcRenderer.send('save-pdfs-to-filesystem', {
			identifier: pendingIdentifier,
			path,
			amount: sharesToCopy,
		})
	}

	// todo maybe better to run this on detach event
	useEffect(() => {
		if (mountPoints.length) {
			return
		}

		if (copyResponse) {
			console.log(
				'user unmounted drive. no need to show response from previous copy'
			)
			setCopyResponse(undefined)
		}

		if (!sharesRemaining) {
			navigate('/create/done')
		}
	}, [copyResponse, mountPoints, sharesRemaining])

	// update state whenever we copied shares to a drive
	useEffect(() => {
		const onCopied = (event, { error, data }) => {
			if (error) {
				console.warn(error)
				setCopyResponse({ error })
				return
			}
			const { pendingDocuments, copiedDocuments: copiedShares } = data
			setSharesRemaining(pendingDocuments)
			setCopyResponse({ copiedShares })
			console.log('invalidate drive -> show detach message')
			console.log(data)
		}

		ipcRenderer.on('pdfs-saved-to-filesystem', onCopied)

		return () => {
			ipcRenderer.removeListener('pdfs-saved-to-filesystem', onCopied)
		}
	}, [ipcRenderer])

	useEffect(() => {
		console.log('driveCounter ----->', driveCounter)
		/*const onAttach = () => {
			if (driveCounter === 1) {
				return
			}
		}*/
	}, [driveCounter])

	// no drives attached
	if (!mountPoints.length) {
		return (
			<InsertUsbDrive
				counter={driveCounter}
				sharesToCopy={sharesToCopy}
			/>
		)
	}

	// drive is still attached and we have a response in cache
	if (mountPoints.length && copyResponse) {
		if (copyResponse.error) {
			return <UsbDriveError error={copyResponse.error} />
		} else if (copyResponse.copiedShares) {
			return (
				<UsbDriveSuccessfullyCopied
					copiedShares={copyResponse.copiedShares}
					sharesRemaining={sharesRemaining}
				/>
			)
		} else {
			console.warn('no shares copied...')
		}
	}

	const [{ label: driveLabel }] = mountPoints

	// start the flow by using the UsbDriveAttached template which gives the user
	// the ability to ignore the (previously connected) drive
	if (driveCounter === 1) {
		return (
			<UsbDriveAttached
				driveLabel={driveLabel}
				sharesToCopy={sharesToCopy}
				onCopy={copyNextSharesToDrive}
				onIgnoreDrive={resetMountPoints}
			/>
		)
	}

	return (
		<UsbDriveAttached
			driveLabel={driveLabel}
			sharesToCopy={sharesToCopy}
			onCopy={copyNextSharesToDrive}
			onIgnoreDrive={resetMountPoints}
		/>
	)
}

export default DistributeRemote
