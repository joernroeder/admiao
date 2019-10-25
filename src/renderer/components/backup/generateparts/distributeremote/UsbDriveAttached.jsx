import React from 'react'
import { Flex } from 'reflexbox'

import GridWrap from '../../../GridWrap'
import Cell from '../../../Cell'
import SubHeading from '../../../SubHeading'
import Text from '../../../Text'
import Button, { Directions } from '../../../Button'

const UsbDriveAttached = ({
	onIgnoreDrive,
	onCopy,
	driveLabel,
	sharesToCopy,
}) => {
	return (
		<GridWrap
			flexDirection={'column'}
			height={'100vh'}
			justifyContent={'center'}
			pb={18}
		>
			<Cell gridOffset={4} gridColumn={4} mt={9}>
				<SubHeading mb={2}>Found USB-Drive</SubHeading>
			</Cell>
			<Cell gridOffset={5} gridColumn={4} mt={3}>
				<Text>
					Found a USB drive with the name{' '}
					<strong>{driveLabel}</strong>. Should {sharesToCopy}{' '}
					Share-PDF be copied to this drive?
				</Text>

				<Flex flexDirection={'row'} alignItems={'flex-start'} mt={3}>
					<Button
						onClick={onIgnoreDrive}
						direction={Directions.NONE}
						mr={1}
					>
						No, ignore this drive
					</Button>
					<Button onClick={onCopy} variant={'filled'}>
						Yes, copy shares
					</Button>
				</Flex>
			</Cell>
		</GridWrap>
	)
}

export default UsbDriveAttached
