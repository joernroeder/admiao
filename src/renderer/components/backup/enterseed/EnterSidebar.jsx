import React from 'react'
import SubHeading from '../../SubHeading'
import Text from '../../Text'
import { useSeedWordsState } from '../../../store/SeedWordsStore'

const EnterSidebar = () => {
	const { words, total, isValid } = useSeedWordsState()

	const onEnter = (
		<>
			<SubHeading>Enter Seed</SubHeading>
			<Text mt={3}>
				Please enter the <strong>{total} words</strong> of your seed one
				by one.
			</Text>
			<Text mt={3}>
				You will be able to confirm words of your seed afterwards.
			</Text>
		</>
	)

	const onConfirm = (
		<>
			<SubHeading>Confirm Seed</SubHeading>
			<Text mt={2}>
				You can confirm that the seed words were entered correctly by
				hovering over them.
			</Text>
			<Text mt={3}>
				<strong>
					Please review it carefully, you will not see it again.
				</strong>
			</Text>
		</>
	)

	return isValid && words.length === total ? onConfirm : onEnter
}

export default EnterSidebar
