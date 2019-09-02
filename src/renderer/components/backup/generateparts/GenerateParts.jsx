import React, { useEffect } from 'react'

import GridWrap from '../../GridWrap'
import Cell from '../../Cell'
import SubHeading from '../../SubHeading'
import Text from '../../Text'
import Button from '../../Button'

import { generatePartsViaIpc } from './pdfGeneratorHelper'
import {
	useGeneratedParts,
	useGeneratedPartsDispatch,
} from '../../../store/GeneratedPartsStore'
import { useDistributionState } from '../../../store/DistributionStore'
import { useSeedWordsDispatch } from '../../../store/SeedWordsStore'

const GenerateParts = ({
	generatorState,
	setGeneratorState,
	STATES,
	words,
	seedPartsState,
}) => {
	const isLoading = generatorState.state === STATES.loading
	const { uniquePartsN } = seedPartsState

	const { distributionIdentifier } = useDistributionState()
	const generatedPartsDispatch = useGeneratedPartsDispatch()
	const seedWordsDispatch = useSeedWordsDispatch()

	useEffect(() => {
		;(async () => {
			// already got a state. returning...
			if (generatorState.state) {
				return
			}

			try {
				const { parts } = await generatePartsViaIpc({
					identifier: distributionIdentifier,
					words,
					seedPartsState,
					generatorState: {
						state: generatorState,
						set: setGeneratorState,
						STATES,
					},
				})

				console.log('setting parts to store', parts)

				generatedPartsDispatch({
					type: 'SET_PARTS',
					payload: parts,
				})

				// no need to keep the seed words.
				seedWordsDispatch({
					type: 'CLEANUP_SEED',
				})
			} catch (e) {
				// todo show error to user!
				console.warn(e)
			}
		})()
	}, [
		STATES,
		generatorState,
		generatorState.state,
		seedPartsState,
		setGeneratorState,
		words,
		distributionIdentifier,
		generatedPartsDispatch,
		seedWordsDispatch,
	])

	return (
		<>
			{isLoading ? (
				<GridWrap>
					<Cell gridOffset={3} mt={23} gridColumn={6}>
						<SubHeading>
							Generating {uniquePartsN}&nbsp;Parts
						</SubHeading>
						<Text mt={3}>Todo...</Text>
					</Cell>
				</GridWrap>
			) : (
				<>
					<GridWrap>
						<Cell gridOffset={3} mt={14} gridColumn={6}>
							<SubHeading>
								{uniquePartsN}&nbsp;Parts successfully
								generated!
							</SubHeading>
						</Cell>
					</GridWrap>
					<GridWrap>
						<Cell gridOffset={4} mt={3} gridColumn={3}>
							<Text>
								Maecenas faucibus mollis interdum. Nullam id
								dolor id nibh ultricies vehicula ut id elit.
							</Text>
						</Cell>
					</GridWrap>
					<GridWrap>
						<Cell gridOffset={4} mt={3} gridColumn={3}>
							{/* todo if local template this is the only case which uses generated parts directly, replace children with next button. */}
							{/* children */}
							<Button to="./distribute-local">
								Write down Parts
							</Button>
						</Cell>
					</GridWrap>
				</>
			)}
			<GridWrap>
				<Cell gridOffset={4} mt={3} gridColumn={3}>
					{generatorState.state}:{generatorState.error} :{' '}
					{generatorState.pendingIdentifier}
				</Cell>
			</GridWrap>
		</>
	)
}

export default GenerateParts
