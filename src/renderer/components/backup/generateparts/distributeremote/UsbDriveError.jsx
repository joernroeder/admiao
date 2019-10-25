import React from 'react'

import GridWrap from '../../../GridWrap'
import Cell from '../../../Cell'
import SubHeading from '../../../SubHeading'
import Text from '../../../Text'

const UsbDriveError = ({ error }) => {
	let title
	let message

	switch (error.code) {
		case 'REPEATED_DRIVE': {
			title = 'Shares found on Drive!'
			message = `
			This drive already contains shares for the current seed.
			Copying additional files would weaken security and is therefore aborted.`
			break
		}

		default:
			title = 'Copy failed'
			message = 'Could not copy the shares to the drive.'
			break
	}

	return (
		<GridWrap
			flexDirection={'column'}
			height={'100vh'}
			justifyContent={'center'}
			pb={18}
		>
			<Cell gridOffset={4} gridColumn={4} mt={9}>
				<SubHeading mb={2}>{title}</SubHeading>
			</Cell>
			<Cell gridOffset={4} gridColumn={4} mt={3}>
				<Text>{message}</Text>
				<Text mt={1}>Please insert another drive to continue.</Text>
			</Cell>
		</GridWrap>
	)
}

export default UsbDriveError
