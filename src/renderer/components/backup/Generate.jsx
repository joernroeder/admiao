import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
//import { ipcRenderer } from 'electron';

import GeneratePdfs from './generateparts/GeneratePdfs'
import SavePdfsToFileSystemButton from './generateparts/SavePdfsToFileSystemButton'
import SavePdfsToUsbDrivesButton from './generateparts/SavePdfsToUsbDrivesButton'
import GenerateParts from './generateparts/GenerateParts'

import { useSeedWordsState } from '../../store/SeedWordsStore'
import { useSeedPartsState } from '../../store/SeedPartsStore'
import {
	useDistributionState,
	DistributionTypes,
} from '../../store/DistributionStore'

const STATES = {
	loading: 'LOADING',
	generated: 'GENERATED',
	saved: 'SAVED',
	failed: 'FAILED',
}

const Generate = () => {
	const [generatorState, setGeneratorState] = useState({
		state: undefined,
		pendingIdentifier: null,
		error: null,
	})

	const seedPartsState = useSeedPartsState()
	const { words, isConfirmed } = useSeedWordsState()
	const { distributionType } = useDistributionState()

	// test weather the words are confirmed by the previous step
	// and redirect otherwise
	useEffect(() => {
		if (isConfirmed) {
			return
		}

		console.log('seed is not confirmed -> navigating to enter page')
		navigate('/create/enter-seed', { replace: true })
	}, [isConfirmed])

	if (!isConfirmed) {
		return null
	}

	const generatorStateWrapper = {
		generatorState,
		setGeneratorState,
		STATES,
	}

	const generatorProps = {
		...generatorStateWrapper,
		seedPartsState,
		words,
	}

	let distributionTypeGenerate

	switch (distributionType) {
		case DistributionTypes.REMOTE_PRINT: {
			distributionTypeGenerate = (
				<GeneratePdfs {...generatorProps}>
					<SavePdfsToUsbDrivesButton {...generatorStateWrapper} />
				</GeneratePdfs>
			)
			break
		}

		case DistributionTypes.FILE_SYSTEM: {
			distributionTypeGenerate = (
				<GeneratePdfs {...generatorProps}>
					<SavePdfsToFileSystemButton {...generatorStateWrapper} />
				</GeneratePdfs>
			)
			break
		}

		case DistributionTypes.LOCAL_PRINT: {
			distributionTypeGenerate = <GenerateParts {...generatorProps} />
			break
		}

		case DistributionTypes.DIGITAL: {
			console.log('Todo... DistributionTypes.DIGITAL')
			break
		}

		default: {
			distributionTypeGenerate = null
		}
	}

	return distributionTypeGenerate
}

export default Generate
