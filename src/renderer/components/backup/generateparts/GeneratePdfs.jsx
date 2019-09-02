import React, { useEffect } from 'react'

import GridWrap from '../../GridWrap'
import Cell from '../../Cell'
import SubHeading from '../../SubHeading'
import Text from '../../Text'

import { generatePdfsViaIpc } from './pdfGeneratorHelper'

import { useSeedWordsDispatch } from '../../../store/SeedWordsStore'

const GeneratePdfs = ({
	children,
	generatorState,
	setGeneratorState,
	STATES,
	words,
	seedPartsState,
}) => {
	const isLoading = generatorState.state === STATES.loading
	const { uniquePartsN } = seedPartsState

	const seedWordsDispatch = useSeedWordsDispatch()

	useEffect(() => {
		;(async () => {
			// already got a state. returning...
			if (generatorState.state) {
				return
			}

			try {
				await generatePdfsViaIpc({
					words,
					seedPartsState,
					generatorState: {
						state: generatorState,
						set: setGeneratorState,
						STATES,
					},
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
		seedWordsDispatch,
		setGeneratorState,
		words,
	])

	return (
		<>
			{isLoading ? (
				<GridWrap>
					<Cell gridOffset={3} mt={23} gridColumn={6}>
						<SubHeading>
							Generating {uniquePartsN}&nbsp;PDFs
						</SubHeading>
						<Text mt={3}>Todo...</Text>
					</Cell>
				</GridWrap>
			) : (
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
								Maecenas faucibus mollis interdum. Nullam id
								dolor id nibh ultricies vehicula ut id elit.
							</Text>
						</Cell>
					</GridWrap>
					<GridWrap>
						<Cell gridOffset={4} mt={3} gridColumn={3}>
							{children}
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

export default GeneratePdfs
