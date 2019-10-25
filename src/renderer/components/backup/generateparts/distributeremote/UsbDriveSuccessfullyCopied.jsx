import React from 'react'
import NumberToWords from 'number-to-words'

import GridWrap from '../../../GridWrap'
import Cell from '../../../Cell'
import SubHeading from '../../../SubHeading'

const UsbDriveSuccessfullyCopied = ({ copiedShares, sharesRemaining }) => {
	const copiedSharesWords = NumberToWords.toWords(copiedShares)

	return (
		<GridWrap
			flexDirection={'column'}
			height={'100vh'}
			justifyContent={'center'}
			pb={18}
		>
			<Cell gridOffset={3} gridColumn={7} mt={9}>
				{!sharesRemaining ? (
					<SubHeading mb={2}>
						Successfully copied all shares!
						<br />
						Unmount the drive to finish.
					</SubHeading>
				) : (
					<SubHeading mb={2}>
						Successfully copied {copiedSharesWords}&nbsp;share
						{copiedShares > 1 ? 's' : ''}!<br />
						Unmount the drive to continue.
					</SubHeading>
				)}
			</Cell>
		</GridWrap>
	)
}

export default UsbDriveSuccessfullyCopied
