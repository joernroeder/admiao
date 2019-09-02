import React from 'react'

import GridWrap from '../GridWrap'
import Cell from '../Cell'
import Heading from '../Heading'
import Text from '../Text'
import Button from '../Button'

const BackupIntro = () => {
	return (
		<>
			<GridWrap
				flexDirection={'column'}
				justifyContent={'_space-around'}
				height={'100vh'}
			>
				<Cell>
					<GridWrap>
						<Cell gridColumn={8} gridOffset={1}>
							<Heading mt={[4, 6, 8]}>Backup Seed</Heading>
						</Cell>
					</GridWrap>
					<GridWrap>
						<Cell gridColumn={[10, 8, 5]} gridOffset={2} mt={4}>
							<Text>
								Donec ullamcorper nulla non metus auctor
								fringilla. Duis mollis, est non commodo luctus,
								nisi erat porttitor ligula, eget lacinia odio
								sem nec elit.
							</Text>
						</Cell>
					</GridWrap>
				</Cell>
				<Cell>
					<GridWrap justifyContent={'flex-end'} mt={9}>
						<Cell>
							<Button to={'./select-parts'} mb={[4, 6, 8]}>
								Start Backup
							</Button>
						</Cell>
						<Cell gridColumn={[1]} />
					</GridWrap>
				</Cell>
			</GridWrap>
		</>
	)
}
export default BackupIntro
