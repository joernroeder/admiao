import React from 'react'
import styled from 'styled-components'

import Cell from './components/Cell'
import GridWrap from './components/GridWrap'
import Text from './components/Text'
import Heading from './components/Heading'

const H1 = styled.h1`
	margin: 0;
	${props => props.theme.setFontWithRhythm('Lato', 1.5)};
	padding-bottom: ${props => props.theme.rhythm(10)};
	margin-bottom: ${props => props.theme.rhythm(1)};
`

const Testing = () => (
	<>
		<GridWrap>
			<Cell grid-column={[3, 4, 5]} grid-offset={[1, 3, 5]}>
				<Heading>Hello World</Heading>
			</Cell>
		</GridWrap>
		<GridWrap>
			<Cell width={2 / 12}>
				<Heading>Hello World</Heading>
				<Text>How are you today?</Text>
			</Cell>
			<Cell width={1 / 4}>
				<H1>Hello World</H1>
				<Text>How are you today?</Text>
			</Cell>
			<Cell width={1 / 4}>
				<H1>Hello World</H1>
				<Text>How are you today?</Text>
			</Cell>
			<Cell width={1 / 4}>
				<H1>Hello World</H1>
				<Text>How are you today?</Text>
			</Cell>
		</GridWrap>
	</>
)

export default Testing
