import React, { useEffect } from 'react'

import GridWrap from '../../GridWrap'
import Cell from '../../Cell'
import SubHeading from '../../SubHeading'
import Text from '../../Text'

import { generatePdfsViaIpc } from './pdfGeneratorHelper'

import { useSeedWordsDispatch } from '../../../store/SeedWordsStore'
import { useGeneratorState, STATES } from '../../../store/GeneratorState'

import SuccessfullyGeneratedPdfs from './SuccessfullyGeneratedPdfs'
import SuccessfullySavedToDisk from './filesystem/SuccessfullySavedToDisk'

const GeneratePdfs = ({ children, words, seedPartsState }) => {
	const [generatorState, setGeneratorState] = useGeneratorState()
	console.log('generatorState.state', generatorState.state)
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
		generatorState,
		generatorState.state,
		seedPartsState,
		seedWordsDispatch,
		setGeneratorState,
		words,
	])

	const isLoadingComponent = (
		<GridWrap>
			<Cell gridOffset={3} mt={23} gridColumn={6}>
				<SubHeading>Generating {uniquePartsN}&nbsp;PDFs</SubHeading>
				<Text mt={3}>Todo...</Text>
			</Cell>
		</GridWrap>
	)

	const debugComponent = (
		<GridWrap>
			<Cell gridOffset={4} mt={3} gridColumn={3}>
				{
					/*{generatorState.state}:{generatorState.error} :{' '}
				{generatorState.pendingIdentifier}*/ ''
				}
			</Cell>
		</GridWrap>
	)

	let component = (() => {
		switch (generatorState.state) {
			case STATES.successfullyGenerated: {
				return (
					<SuccessfullyGeneratedPdfs uniquePartsN={uniquePartsN}>
						{children}
					</SuccessfullyGeneratedPdfs>
				)
			}

			case STATES.successfullyDistributed: {
				// todo switch between fs and drives
				return (
					<SuccessfullySavedToDisk
						uniquePartsN={uniquePartsN}
						generatorState={generatorState}
					/>
				)
			}

			case STATES.loading:
			default: {
				return isLoadingComponent
			}
		}
	})()

	return (
		<>
			{component}
			{debugComponent}
		</>
	)
}

export default GeneratePdfs
