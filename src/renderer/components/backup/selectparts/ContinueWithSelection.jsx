import React from 'react'
import { Flex } from 'reflexbox'

import {
	useSeedPartsState,
	useSeedPartsDispatch,
} from '../../../store/SeedPartsStore'

import GridWrap from '../../GridWrap'
import Cell from '../../Cell'
import SubHeading from '../../SubHeading'
import Button, { Directions } from '../../Button'
import Text from '../../Text'
import TextHeading from '../../TextHeading'
import CurrentValue from './partselector/CurrentValue'
import { verticalRhythmProps } from '../../../utils/styled-system-rhythm'
import {
	useDistributionDispatch,
	useDistributionState,
} from '../../../store/DistributionStore'

const ContinueWithSelection = () => {
	const seedPartsDispatch = useSeedPartsDispatch()
	const distributionDispatch = useDistributionDispatch()

	const { uniquePartsN, requiredPartsT } = useSeedPartsState()
	const { distributionIdentifier } = useDistributionState()
	const resetSelection = () => {
		seedPartsDispatch({ type: 'RESET' })
		distributionDispatch({ type: 'RESET' })
	}

	const currentValueProps = {
		mb: 1,
		minWidth: '3rem',
		...verticalRhythmProps(1),
	}

	const nextButtonUrl = distributionIdentifier
		? '../enter-seed'
		: '../how-to-distribute'

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

				<Flex mt={5}>
					<Button
						onClick={resetSelection}
						mr={2}
						direction={Directions.ABORT}
					>
						No, i want to start over
					</Button>
					<Button to={nextButtonUrl} variant={'filled'}>
						Yes, continue seed backup!
					</Button>
				</Flex>
			</Cell>
		</GridWrap>
	)
}

export default ContinueWithSelection
