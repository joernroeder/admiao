import React from 'react'

import GridWrap from '../GridWrap'
import Cell from '../Cell'
import SubHeading from '../SubHeading'
import Text from '../Text'
import Button from '../Button'

const BackupOutro = () => {
	return (
		<>
			<GridWrap
				flexDirection={'column'}
				justifyContent={'_space-around'}
				height={'100vh'}
			>
				<Cell>
					<GridWrap>
						<Cell gridColumn={7} gridOffset={3}>
							<SubHeading mt={[4, 6, 8]}>
								Yes, you made it and your seed is now backed up
								successfully!
							</SubHeading>
						</Cell>
					</GridWrap>
					<GridWrap>
						<Cell gridColumn={6} gridOffset={4} mt={4}>
							<Text>
								Now it's up to you to keep your backup and the
								parts safe. Never introduce a "single point of
								failure" by sending them together via Mail or
								print/copy them on the same device. You'll find
								more best practices at <strong>XXXX.tld</strong>
								<br />
								✌️
							</Text>
						</Cell>
					</GridWrap>
				</Cell>
			</GridWrap>
		</>
	)
}
export default BackupOutro
