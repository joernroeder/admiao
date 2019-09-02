import React from 'react'

import {
	useSeedPartsState,
	useSeedPartsDispatch,
} from '../../../store/SeedPartsStore'

import { Box } from 'reflexbox'

import GridWrap from '../../GridWrap'
import Cell from '../../Cell'
import SubHeading from '../../SubHeading'
import Text from '../../Text'
import TextHeading from '../../TextHeading'
import Button from '../../Button'

import PartSelector from './partselector/PartSelector'

const SelectParts = () => {
	const dispatch = useSeedPartsDispatch()
	const { uniquePartsN, requiredPartsT } = useSeedPartsState()

	const incrementRequired = () => dispatch({ type: 'INCREMENT_REQUIRED' })
	const decrementRequired = () => dispatch({ type: 'DECREMENT_REQUIRED' })

	const incrementUnique = () => dispatch({ type: 'INCREMENT_UNIQUE' })
	const decrementUnique = () => dispatch({ type: 'DECREMENT_UNIQUE' })

	return (
		<GridWrap
			flexDirection={'column'}
			justifyContent={'_space-around'}
			height={'100vh'}
		>
			<Cell gridOffset={1} gridColumn={4}>
				<SubHeading mt={[3, 4]}>Select Parts</SubHeading>
			</Cell>
			<Cell gridOffset={1}>
				<GridWrap>
					<Cell gridColumn={4}>
						<Text mt={2}>
							Metus auctor fringilla. Duis mollis, est non commodo
							luctus, porttitor ligula, eget lacinia odio sem nec
							elit.
						</Text>
					</Cell>

					<Cell gridColumn={9} mt={-7}>
						<GridWrap justifyContent={'flex-end'}>
							<PartSelector
								value={uniquePartsN}
								onIncrement={incrementUnique}
								onDecrement={decrementUnique}
								color={'black'}
								background={'lightGray'}
								width={3 / 9}
								mr={3 / 9}
								buttonLabels={{
									increment: 'Increment Total Parts',
									decrement: 'Decrement Total Parts',
								}}
								labelledBy={'total-parts'}
							>
								<TextHeading id={'total-parts'}>
									Total Parts
								</TextHeading>
								<Text>
									Enter the amount of total unique parts your
									seed will be sliced into.
								</Text>
							</PartSelector>

							<Box width={1 / 9} />

							<PartSelector
								value={requiredPartsT}
								onIncrement={incrementRequired}
								onDecrement={decrementRequired}
								width={3 / 9}
								alignItems={'flex-start'}
								textAlign={'left'}
								buttonLabels={{
									increment: 'Increment Required Parts',
									decrement: 'Decrement Required Parts',
								}}
								labelledBy={'required-parts'}
							>
								<TextHeading id={'required-parts'}>
									Required Parts
								</TextHeading>
								<Text>
									Enter the amount of parts required to
									restore your seed.
								</Text>
							</PartSelector>
						</GridWrap>
					</Cell>
				</GridWrap>
			</Cell>
			<Cell>
				<GridWrap justifyContent={'flex-end'} mt={7}>
					<Cell>
						<Button to={'../confirm-selection'} mb={[4, 6, 8]}>
							Continue
						</Button>
					</Cell>
					<Cell gridColumn={[1]} />
				</GridWrap>
			</Cell>
		</GridWrap>
	)
}

export default SelectParts
