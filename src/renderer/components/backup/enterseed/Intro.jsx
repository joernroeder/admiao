import React from 'react'
import { Box } from 'reflexbox'

import Text from '../../Text'
import Notice from '../../Notice'
import Button from '../../Button'

const Intro = () => {
	return (
		<Box mt={21}>
			<Text mb={2}>
				In the following section you will asked to enter the words of
				your seed one by one. Make sure no human or robot looks over
				your shoulder or at your screen.
			</Text>
			<Notice mb={4}>
				<strong>Remember:</strong> This should be the only time you{' '}
				<u>ever ever</u> type those words into a computer apart from
				restoring purposes.
			</Notice>
			<Button to={'./enter'}>Yes, i am alone.</Button>
		</Box>
	)
}

export default Intro
