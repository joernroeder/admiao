import React, { useEffect } from 'react'
import { navigate } from '@reach/router'

import GeneratePdfs from './generateparts/GeneratePdfs'
import SavePdfsToFileSystemButton from './generateparts/filesystem/SavePdfsToFileSystemButton'
import SavePdfsToUsbDrivesButton from './generateparts/distributeremote/SavePdfsToUsbDrivesButton'
import GenerateParts from './generateparts/GenerateParts'

import { useSeedWordsState } from '../../store/SeedWordsStore'
import { useSeedPartsState } from '../../store/SeedPartsStore'
import {
	useDistributionState,
	DistributionTypes,
} from '../../store/DistributionStore'

const Generate = () => {
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

	const generatorProps = {
		seedPartsState,
		words,
	}

	let distributionTypeGenerate

	switch (distributionType) {
		case DistributionTypes.REMOTE_PRINT: {
			distributionTypeGenerate = (
				<GeneratePdfs {...generatorProps}>
					<SavePdfsToUsbDrivesButton />
				</GeneratePdfs>
			)
			break
		}

		case DistributionTypes.FILE_SYSTEM: {
			distributionTypeGenerate = (
				<GeneratePdfs {...generatorProps}>
					<SavePdfsToFileSystemButton />
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
