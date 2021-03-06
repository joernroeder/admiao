import React, { useContext } from 'react'

import { ThemeContext } from '@emotion/core'
import {
	useSeedPartsDispatch,
	useSeedPartsState,
} from '../../store/SeedPartsStore'

import GridWrap from '../GridWrap'
import Cell from '../Cell'
import SubHeading from '../SubHeading'
import Text from '../Text'
import TextHeading from '../TextHeading'
import Button, { Directions } from '../Button'
import PieChart from '../PieChart'

const ConfirmSelection = props => {
	const dispatch = useSeedPartsDispatch()
	const { uniquePartsN, requiredPartsT } = useSeedPartsState()
	const {
		colors: { lightGray = '#ccc', black = '#f00' },
	} = useContext(ThemeContext)

	const onConfirmClick = () => {
		dispatch({ type: 'CONFIRM' })
	}

	const getPieChartData = () => {
		const value = 100 / uniquePartsN

		return Array(uniquePartsN)
			.fill({ value, color: lightGray })
			.map((el, index) => {
				return index < requiredPartsT ? { ...el, color: black } : el
			})
	}

	const pieChartProps = {
		width: 300,
		height: 300,
		radius: 150,
		data: getPieChartData(),
	}

	return (
		<GridWrap height={'100vh'} alignItems={'center'} pb={14}>
			<Cell
				gridOffset={2}
				gridColumn={3}
				style={{ textAlign: 'center' }}
				mt={7}
			>
				<PieChart {...pieChartProps} />
				<TextHeading mb={0}>
					{requiredPartsT} of {uniquePartsN}
				</TextHeading>
				<Text>Parts Required</Text>
			</Cell>
			<Cell gridOffset={1} gridColumn={5} mt={9}>
				<SubHeading mb={2}>Confirm Selection</SubHeading>
				<Text mb={9}>
					Donec ullamcorper nulla non metus auctor fringilla. Duis
					mollis, est non commodo luctus, nisi erat porttitor ligula?
				</Text>
				<Button
					to={'../select-parts'}
					showArrow={false}
					direction={Directions.BACKWARDS}
					mr={3}
				>
					Nope, go back.
				</Button>
				<Button
					to={'../how-to-distribute'}
					onClick={onConfirmClick}
					variant={'filled'}
				>
					Yes, looks good!
				</Button>
			</Cell>
		</GridWrap>
	)
}

export default ConfirmSelection
