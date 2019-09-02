import React, { useState, useEffect } from 'react'

import { useSeedPartsState } from '../../../store/SeedPartsStore'
import PrintTemplate from './PrintTemplate'
import CopyTemplateToUsb from './CopyTemplateToUsb'

const GenerateTemplate = () => {
	const { requiredPartsT, uniquePartsN } = useSeedPartsState()
	const { ipcRenderer } = window
	const [templateIdentifier, setTemplateIdentifier] = useState()
	const [templateError, setTemplateError] = useState()
	const [printLocation, setPrintLocation] = useState('local')

	const removeTemplate = () => {
		if (!templateIdentifier) {
			return
		}

		ipcRenderer.send('remove-template', templateIdentifier)
	}

	// generate pdf
	useEffect(() => {
		if (templateIdentifier) {
			return
		}

		// set the identifier once we got the "template-generated" message from the main process
		ipcRenderer.on('template-generated', (event, { error, data }) => {
			console.log('template-generated', error, data)
			if (error) {
				return setTemplateError(error)
			}

			const { identifier } = data

			setTemplateIdentifier(identifier)
		})

		ipcRenderer.send('generate-template', {
			requiredPartsT,
			uniquePartsN,
		})
	}, [ipcRenderer, uniquePartsN, requiredPartsT, templateIdentifier])

	// todo print template error
	if (templateError) {
		console.warn(templateError)
	}

	return (
		<>
			{printLocation === 'local' ? (
				<PrintTemplate
					templateIdentifier={templateIdentifier}
					onCopyToDrive={() => setPrintLocation('remote')}
				/>
			) : (
				<CopyTemplateToUsb templateIdentifier={templateIdentifier} />
			)}
		</>
	)
}

export default GenerateTemplate
