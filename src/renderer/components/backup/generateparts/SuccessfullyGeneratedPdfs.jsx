import React from 'react'

import GridWrap from '../../GridWrap'
import Cell from '../../Cell'
import SubHeading from '../../SubHeading'
import Text from '../../Text'

const SuccessfullyGeneratedPdfs = ({ children, uniquePartsN }) => {
	console.log('successfullyGeneratedPdfs Children', children)
	return (
		<>
			<GridWrap>
				<Cell gridOffset={3} mt={14} gridColumn={6}>
					<SubHeading>
						{uniquePartsN}&nbsp;PDFs successfully generated!
					</SubHeading>
				</Cell>
			</GridWrap>
			<GridWrap>
				<Cell gridOffset={4} mt={3} gridColumn={3}>
					<Text>
						Maecenas faucibus mollis interdum. Nullam id dolor id
						nibh ultricies vehicula ut id elit.
					</Text>
				</Cell>
			</GridWrap>
			<GridWrap>
				<Cell gridOffset={4} mt={3} gridColumn={3}>
					{children}
				</Cell>
			</GridWrap>
		</>
	)
}

export default SuccessfullyGeneratedPdfs
