import React from 'react'

import {
	DistributionTypes,
	useDistributionDispatch,
} from '../../../store/DistributionStore'

import { Flex } from 'reflexbox'
import Button from '../../Button'
import GridWrap from '../../GridWrap'
import Cell from '../../Cell'
import SubHeading from '../../SubHeading'
import Text from '../../Text'
import styled from '@emotion/styled'
import { background, space } from 'styled-system'
import {
	verticalRhythm,
	verticalRhythmProps,
} from '../../../utils/styled-system-rhythm'

const StripedBackground = styled(Flex)`
	height: 100vh;
	${props => {
		const color = props.theme.colors.lightGray
		const size = 8

		console.log(size)

		return `background: repeating-linear-gradient(
		-45deg,
		${color},
		${color} ${props.theme.rhythm(size)},
		transparent ${props.theme.rhythm(size)},
		transparent ${props.theme.rhythm(size * 2)}
	);`
	}};
`

const StripedTextPadding = styled.span`
	//${background};
	${space};
	box-decoration-break: clone;
`

StripedTextPadding.defaultProps = {
	background: 'white',
	px: 2,
	pt: 0,
	pb: 1,
}

const StripedBoxPadding = styled.span`
	//${background};
	${verticalRhythm};
	${space};
	display: inline-block;
`

StripedBoxPadding.defaultProps = {
	background: 'white',
	pt: 0,
	px: 1,
	pb: 2,
	...verticalRhythmProps(0),
}

const FileSystemWarning = () => {
	const dispatch = useDistributionDispatch()

	return (
		<StripedBackground>
			<GridWrap flexDirection={'column'} backgroundColor={'transparent'}>
				<Cell gridColumn={6} gridOffset={4}>
					<SubHeading mt={8}>
						<StripedTextPadding>
							Be careful – you are about to leave the safe path!
						</StripedTextPadding>
					</SubHeading>
				</Cell>
				<Cell gridColumn={4} gridOffset={5}>
					<Text mt={5} backgroundColor={'white'} px={1} py={1}>
						By handling generated shares yourself you may expose
						yourself to risk accidentally.
						<br />
						Are you sure you want to continue?
					</Text>
				</Cell>
				<Cell gridColumn={4} gridOffset={5} mt={3}>
					<StripedBoxPadding>
						<Button
							to={'../'}
							mr={2}
							variant={'filled'}
							showArrow={false}
						>
							No, go back
						</Button>
						<Button
							to={'../../enter-seed'}
							onClick={() =>
								dispatch({
									type: DistributionTypes.FILE_SYSTEM,
								})
							}
						>
							Yes, i take the risk
						</Button>
					</StripedBoxPadding>
				</Cell>
			</GridWrap>
		</StripedBackground>
	)
}

export default FileSystemWarning
