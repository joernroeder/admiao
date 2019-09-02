import React from 'react'
import SubHeading from '../../../SubHeading'
import Text from '../../../Text'
import { useGeneratedParts } from '../../../../store/GeneratedPartsStore'

const WriteDownSidebar = ({ partIndex }) => {
	const { confirmed } = useGeneratedParts()
	//const {  words, total, isValid } = useSeedWordsState();

	console.log('partIndex', partIndex)
	const index = parseInt(partIndex)

	const onCopy = (
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

	const onConfirm = (
		<>
			<SubHeading>Confirm Share</SubHeading>
			<Text mt={2}>
				Fusce dapibus, tellus ac cursus commodo, tortor mauris
				condimentum nibh, ut fermentum massa justo sit amet risus.
			</Text>
			<Text mt={3}>
				<strong>
					Please review it carefully, you will not see it again.
				</strong>
			</Text>
		</>
	)

	//return isValid && words.length === total ? onConfirm : onCopy;
	return onCopy
}

export default WriteDownSidebar
