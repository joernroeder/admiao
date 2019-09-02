import React, { useState, useEffect } from 'react'
import { Flex } from 'reflexbox'

import GridWrap from '../../GridWrap'
import Cell from '../../Cell'
import SubHeading from '../../SubHeading'
import Text from '../../Text'
import Button from '../../Button'

const CopyTemplateToUsb = ({ templateIdentifier }) => {
	const { ipcRenderer } = window
	const [mountPoints, setMountPoints] = useState([])
	const [copiedToDrive, setCopiedToDrive] = useState(undefined)

	useEffect(() => {
		const mountPoints = ipcRenderer.sendSync('get-usb-mountpoints')
		setMountPoints(mountPoints)

		// no drive attached on load, set up listener
		if (!mountPoints || !mountPoints.length) {
			console.log('setting up mountpoint listener')

			// todo remove listener?!
			ipcRenderer.on('drive-attached', drive => {
				console.log('drive-attached', drive)
			})
		}
	}, [ipcRenderer])

	const insertDrive = (
		<>
			<Cell gridOffset={4} gridColumn={4} mt={9}>
				<SubHeading mb={2}>Insert USB-Drive</SubHeading>
			</Cell>
			<Cell gridOffset={4} gridColumn={4} mt={3}>
				<Text>
					Maecenas sed diam eget risus varius blandit sit amet non
					magna.
				</Text>
			</Cell>
		</>
	)

	const copiedSuccessfully = (
		<>
			<Cell gridOffset={4} gridColumn={6} mt={9}>
				<SubHeading mb={2}>
					Copied Template-PDF Successfully!
				</SubHeading>
			</Cell>
			<Cell gridOffset={5} gridColumn={4} mt={3}>
				<Text>
					Please unmount the drive, print the template and check back
					afterwards.
				</Text>
				<Button mt={3} to={'../../enter-seed'}>
					Yes, I've printed the templates
				</Button>
			</Cell>
		</>
	)

	// todo check for disk space, write permissions and format on mount!
	const copyError = (
		<>
			<Cell gridOffset={4} gridColumn={4} mt={9}>
				<SubHeading mb={2}>Copying to the drive failed!</SubHeading>
			</Cell>
			<Cell gridOffset={4} gridColumn={4} mt={3}>
				<Text>
					Please check that the drive is properly formatted and
					writable and has some space left and remount it again.
				</Text>
			</Cell>
		</>
	)

	// todo test case!
	const invalidDriveFound = error => {
		return (
			<>
				<Cell gridOffset={4} gridColumn={5} mt={9}>
					<SubHeading mb={2}>USB-Drive can not be used!</SubHeading>
				</Cell>
				<Cell gridOffset={5} gridColumn={4} mt={3}>
					<Text>
						The drive inserted can not be used because it is:{' '}
						<strong>{error}</strong>.<br />
						Please insert another USB-Drive.
					</Text>
				</Cell>
			</>
		)
	}

	const validDriveFound = (() => {
		if (!mountPoints || !mountPoints.length) {
			return
		}

		const [{ label, path }] = mountPoints

		const ignoreDrive = () => {
			setMountPoints([])
		}

		const copyTemplateTo = () => {
			ipcRenderer.once('template-copied', copied => {
				setCopiedToDrive(copied)
			})

			ipcRenderer.send('copy-template', {
				identifier: templateIdentifier,
				path,
			})
		}

		return (
			<>
				<Cell gridOffset={4} gridColumn={4} mt={9}>
					<SubHeading mb={2}>Found USB-Drive</SubHeading>
				</Cell>
				<Cell gridOffset={4} gridColumn={4} mt={3}>
					<Text>
						Found a USB drive with the name <strong>{label}</strong>
						. Should the Templates-PDF get copied to this drive?
					</Text>

					<Flex flexDirection={'row'} alignItems={'flex-end'} mt={3}>
						<Button onClick={ignoreDrive} mb={1}>
							No, ignore it
						</Button>
						<Button onClick={copyTemplateTo}>
							Yes, copy Templates-PDF
						</Button>
					</Flex>
				</Cell>
			</>
		)
	})()

	const content = (() => {
		if (copiedToDrive !== undefined) {
			return copiedToDrive ? copiedSuccessfully : copyError
		}

		if (mountPoints.length) {
			const [{ isReadOnly }] = mountPoints

			return isReadOnly ? invalidDriveFound('READ_ONLY') : validDriveFound
		}

		return insertDrive
	})()

	return <GridWrap flexDirection={'column'}>{content}</GridWrap>
}

export default CopyTemplateToUsb
