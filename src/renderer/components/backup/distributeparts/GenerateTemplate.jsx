import React, { useState, useEffect } from 'react'

import { useSeedPartsState } from '../../../store/SeedPartsStore'
import PrintTemplate from './PrintTemplate'
import CopyTemplateToUsb from './CopyTemplateToUsb'

const GenerateTemplate = ({
	defaultTemplateIdentifier = undefined,
	defaultPrintLocation = 'local',
}) => {
	const { requiredPartsT, uniquePartsN } = useSeedPartsState()
	const { ipcRenderer } = window
	const [templateIdentifier, setTemplateIdentifier] = useState(
		defaultTemplateIdentifier
	)
	const [templateError, setTemplateError] = useState()
	const [printLocation, setPrintLocation] = useState(defaultPrintLocation)

	/*
	const removeTemplate = () => {
		if (!templateIdentifier) {
			return
		}

		ipcRenderer.send('remove-template', templateIdentifier)
	}
	*/

	// generate pdf
	useEffect(() => {
		if (templateIdentifier) {
			return
		}

		// set the identifier once we got the "template-generated" message from the main process
		const onTemplateGenerated = (event, { error, data }) => {
			if (error) {
				return setTemplateError(error)
			}

			const { identifier } = data

			setTemplateIdentifier(identifier)
		}

		ipcRenderer.on('template-generated', onTemplateGenerated)

		ipcRenderer.send('generate-template', {
			requiredPartsT,
			uniquePartsN,
		})

		return () => {
			ipcRenderer.removeListener(
				'template-generated',
				onTemplateGenerated
			)
		}
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
