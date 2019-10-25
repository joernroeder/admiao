import React, { useState } from 'react'

import { useMountPoints } from '../../../hooks/useMountPoints'

import { Flex } from 'reflexbox'

import GridWrap from '../../GridWrap'
import Cell from '../../Cell'
import SubHeading from '../../SubHeading'
import Text from '../../Text'
import Button from '../../Button'

const CopyTemplateToUsb = ({ templateIdentifier }) => {
	const { ipcRenderer } = window

	const [mountPoints, resetMountPoints] = useMountPoints(ipcRenderer)
	const [copiedToDrive, setCopiedToDrive] = useState(undefined)

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
				<Button mt={3} to={'../../enter-seed'} variant={'filled'}>
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
			resetMountPoints()
		}

		const copyTemplateTo = () => {
			if (!templateIdentifier) {
				return
			}

			ipcRenderer.once('template-copied', (event, args) => {
				const { identifier, copied } = args

				if (identifier !== templateIdentifier) {
					return
				}

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
				<Cell gridOffset={5} gridColumn={4} mt={3}>
					<Text>
						Found a USB drive with the name <strong>{label}</strong>
						. Should the Templates-PDF get copied to this drive?
					</Text>

					<Flex
						flexDirection={'column'}
						alignItems={'flex-start'}
						mt={3}
					>
						<Button onClick={copyTemplateTo} variant={'filled'}>
							Yes, copy Templates-PDF
						</Button>
						<Button onClick={ignoreDrive} showArrow={false} mt={1}>
							No, ignore it
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
