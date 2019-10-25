import React from 'react'
import SubHeading from '../../../SubHeading'
import Text from '../../../Text'

const WriteDownSidebar = ({ partIndex }) => {
	const index = parseInt(partIndex)

	return (
		<>
			<SubHeading>Write Down Share</SubHeading>
			<Text mt={3}>
				Please hover the words on the right and copy them to your{' '}
				<strong>{index + 1}(to txt)&nbsp;printed template</strong> one
				by one.
			</Text>
			<Text mt={3}>
				You will be asked to enter them afterwards for confirmation.
			</Text>
		</>
	)
}

export default WriteDownSidebar
