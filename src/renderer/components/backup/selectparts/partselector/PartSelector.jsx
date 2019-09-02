import React from 'react'
import styled from '@emotion/styled'

import { background, color, width, space, textAlign } from 'styled-system'

import {
	verticalRhythm,
	verticalRhythmProps,
} from '../../../../utils/styled-system-rhythm'

import { Flex } from 'reflexbox'
import CurrentValue from './CurrentValue'

const Wrap = styled(Flex)`
	${width};
	${textAlign};
`

/*
const SelectorBox = styled(Flex)`
    min-width: 8em;
`;
*/

const Button = styled.button`
	${color};
	${background};
	${space};
	${verticalRhythm};
	border: none;
	-webkit-appearance: none;
	font-weight: bold;
	flex-grow: 1;
	margin-right: 4px;
	cursor: pointer;

	& + button {
		margin-left: 4px;
		margin-right: 0;
	}
`

Button.defaultProps = {
	mt: 1,
	px: 1,
	py: 1,
	...verticalRhythmProps(1),
	backgroundColor: 'black',
	color: 'lightGray',
}

const PartSelector = ({
	children,
	value,
	onIncrement,
	onDecrement,
	background,
	color,
	alignItems,
	width,
	textAlign,
	buttonLabels,
	labelledBy,
}) => {
	const variant = { backgroundColor: background, color }

	return (
		<Wrap
			flexDirection={'column'}
			alignItems={alignItems}
			width={width}
			textAlign={textAlign}
		>
			<Flex flexDirection={'column'} mb={3}>
				<CurrentValue {...variant} aria-labelledby={labelledBy}>
					{value}
				</CurrentValue>
				<Flex>
					<Button
						{...variant}
						onClick={onIncrement}
						aria-label={buttonLabels.increment}
					>
						&plus;
					</Button>
					<Button
						{...variant}
						onClick={onDecrement}
						aria-label={buttonLabels.decrement}
					>
						&minus;
					</Button>
				</Flex>
			</Flex>
			{children}
		</Wrap>
	)
}

PartSelector.defaultProps = {
	alignItems: 'flex-end',
	textAlign: 'right',
}

export default PartSelector
