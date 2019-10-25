import React from 'react'
import NumberToWords from 'number-to-words'

import GridWrap from '../../../GridWrap'
import Cell from '../../../Cell'
import SubHeading from '../../../SubHeading'
import Text from '../../../Text'

const InsertUsbDrive = ({ counter = 0, sharesToCopy = 1 }) => {
	const driveCounter = NumberToWords.toWordsOrdinal(counter)

	return (
		<GridWrap
			flexDirection={'column'}
			height={'100vh'}
			justifyContent={'center'}
			pb={18}
		>
			<Cell gridOffset={4} gridColumn={5} mt={9}>
				<SubHeading mb={2}>Attach {driveCounter} USB-Drive</SubHeading>
			</Cell>
			<Cell gridOffset={4} gridColumn={4} mt={3}>
				<Text>
					Attach the <strong>{driveCounter} drive</strong> to copy{' '}
					{sharesToCopy} shares to.
				</Text>
			</Cell>
		</GridWrap>
	)
}

export default InsertUsbDrive
