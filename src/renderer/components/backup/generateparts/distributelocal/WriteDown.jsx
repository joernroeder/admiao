import React from 'react'

import SeedWordsList from '../../enterseed/SeedWordsList'
import { useGeneratedParts } from '../../../../store/GeneratedPartsStore'

import { Box } from 'reflexbox'

import Button from '../../../Button'
import TextHeading from '../../../TextHeading'

const WriteDown = ({ partIndex }) => {
	const index = parseInt(partIndex)
	const { parts } = useGeneratedParts()

	/*
	console.log('storeParts', storeParts);

	const parts = [
		"lecture category academic leaf agree body painting…nsion survive floral spray language visitor dress",
		"lecture category academic lily adult ladle equip h…expect ocean sweater clinic member inmate traffic",
		"lecture category academic lungs antenna luck hange…riefing dragon terminal improve knit loyalty idea"
	];
	 */

	const partWords = parts[index] ? parts[index].split(' ') : []

	return (
		<Box mt={19}>
			<TextHeading>Copy Words for Share {index + 1}</TextHeading>
			<SeedWordsList
				hideAll={true}
				showOnHover={true}
				words={partWords}
			/>
			<Button mt={4} to={`../../confirm/${partIndex}`}>
				Confirm Words
			</Button>
		</Box>
	)
}

export default WriteDown
