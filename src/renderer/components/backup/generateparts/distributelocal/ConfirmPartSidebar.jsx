import React from 'react'
import SubHeading from '../../../SubHeading'
import Text from '../../../Text'
//import {useGeneratedParts} from '../../../../store/GeneratedPartsStore';

const ConfirmPartSidebar = ({ partIndex }) => {
	//const { confirmed } = useGeneratedParts();
	//const {  words, total, isValid } = useSeedWordsState();

	console.log('partIndex', partIndex)
	//const index = parseInt(partIndex);

	return (
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
}

export default ConfirmPartSidebar
