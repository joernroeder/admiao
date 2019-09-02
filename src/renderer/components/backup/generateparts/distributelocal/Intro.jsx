import React from 'react'
import { Box } from 'reflexbox'

import Text from '../../../Text'
import Button from '../../../Button'
import { useGeneratedParts } from '../../../../store/GeneratedPartsStore'

const Intro = () => {
	const { parts } = useGeneratedParts()
	const total = parts.length

	return (
		<Box mt={27}>
			<Text mb={3}>
				In the following section you will be able to see the words of
				your generated <strong>{total}&nbsp;parts</strong> one after the
				other. Please copy the words carefully to the printed templates.
			</Text>
			<Button to={'./copy/0'}>Ok, continue</Button>
		</Box>
	)
}

export default Intro
