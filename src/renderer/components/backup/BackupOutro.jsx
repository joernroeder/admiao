import React, { useEffect } from 'react'

import GridWrap from '../GridWrap'
import Cell from '../Cell'
import SubHeading from '../SubHeading'
import Text from '../Text'

import { useSeedWordsDispatch } from '../../store/SeedWordsStore'
import { useSeedPartsDispatch } from '../../store/SeedPartsStore'
import { useDistributionDispatch } from '../../store/DistributionStore'

const BackupOutro = () => {
	const seedPartsDispatch = useSeedPartsDispatch()
	const seedWordsDispatch = useSeedWordsDispatch()
	const distributionDispatch = useDistributionDispatch()

	useEffect(() => {
		;[seedPartsDispatch, seedWordsDispatch, distributionDispatch].forEach(
			dispatch => {
				console.log('dispatch', dispatch)
				if (!dispatch) {
					return
				}

				dispatch({ type: 'RESET' })
			}
		)
	}, [seedPartsDispatch, seedWordsDispatch, distributionDispatch])

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
								failure" by sending the required shares together
								via Mail or print/copy them on the same device.
							</Text>
							<Text mt={1}>
								You'll find more best practices at{' '}
								<strong>XXXX.tld</strong> ✌️
							</Text>
						</Cell>
					</GridWrap>
				</Cell>
			</GridWrap>
		</>
	)
}
export default BackupOutro
