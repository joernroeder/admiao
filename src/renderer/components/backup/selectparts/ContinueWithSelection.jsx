import React from 'react'
import { Box, Flex } from 'reflexbox'

import {
	useSeedPartsState,
	useSeedPartsDispatch,
} from '../../../store/SeedPartsStore'

import GridWrap from '../../GridWrap'
import Cell from '../../Cell'
import SubHeading from '../../SubHeading'
import Button from '../../Button'
import Text from '../../Text'
import TextHeading from '../../TextHeading'
import CurrentValue from './partselector/CurrentValue'
import { verticalRhythmProps } from '../../../utils/styled-system-rhythm'

const ContinueWithSelection = () => {
	const dispatch = useSeedPartsDispatch()

	const { uniquePartsN, requiredPartsT } = useSeedPartsState()
	const resetSelection = () => dispatch({ type: 'RESET' })

	const currentValueProps = {
		mb: 1,
		minWidth: '3rem',
		...verticalRhythmProps(1),
	}

	return (
		<GridWrap>
			<Cell gridOffset={2} gridColumn={4}>
				<SubHeading mt={[13, 14]}>Continue Seed Backup</SubHeading>
			</Cell>
			<Cell gridOffset={1} mt={29}>
				<Text mb={4}>
					Have you printed your{' '}
					<strong>{uniquePartsN} Templates</strong> to continue the
					Backup process?
				</Text>

				<TextHeading>Previous Selection</TextHeading>
				<Flex>
					<Flex flexDirection={'column'} mr={3}>
						<CurrentValue
							color={'black'}
							backgroundColor={'lightGray'}
							aria-label={'Total Parts'}
							{...currentValueProps}
						>
							{uniquePartsN}
						</CurrentValue>
						<Text>Total Parts</Text>
					</Flex>
					<Flex flexDirection={'column'} alignItems={'flex-start'}>
						<CurrentValue
							aria-label={'Required Parts'}
							{...currentValueProps}
						>
							{requiredPartsT}
						</CurrentValue>
						<Text>Required Parts</Text>
					</Flex>
				</Flex>

				<Box mt={5}>
					<Button onClick={resetSelection} mr={2} showArrow={false}>
						No, i want to start over
					</Button>
					<Button to={'../enter-seed'}>
						Yes, continue seed backup!
					</Button>
				</Box>
			</Cell>
		</GridWrap>
	)
}

export default ContinueWithSelection
