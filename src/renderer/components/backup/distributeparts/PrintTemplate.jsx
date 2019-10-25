import React, { useState, useEffect } from 'react'
import { Flex } from 'reflexbox'

import { useDistributionDispatch } from '../../../store/DistributionStore'

import GridWrap from '../../GridWrap'
import Cell from '../../Cell'
import SubHeading from '../../SubHeading'
import Text from '../../Text'
import Button from '../../Button'

const PrintTemplate = ({
	templateIdentifier,
	onCopyToDrive,
	templateError,
}) => {
	const { ipcRenderer } = window
	const [templateOpened, setTemplateOpened] = useState(false)
	const distributionDispatch = useDistributionDispatch()

	const openTemplateInWindow = () => {
		ipcRenderer.send('open-template', { identifier: templateIdentifier })
	}

	useEffect(() => {
		if (!templateIdentifier) {
			return
		}

		const onTemplateOpened = (event, args) => {
			const { identifier, isOpen } = args

			if (identifier !== templateIdentifier) {
				return
			}

			if (isOpen) {
				setTemplateOpened(true)

				// push the identifier to the distribution store.
				// this is used later to match generated parts with a distribution selection.
				distributionDispatch({
					type: 'SET_IDENTIFIER',
					payload: templateIdentifier,
				})
			} else {
				console.warn('ERROR: could not open file', identifier)
			}
		}

		ipcRenderer.once('template-opened', onTemplateOpened)

		return () => {
			ipcRenderer.removeListener('template-opened', onTemplateOpened)
		}
	}, [distributionDispatch, ipcRenderer, templateIdentifier])

	return (
		<GridWrap flexDirection={'column'}>
			{templateOpened ? (
				<>
					<Cell gridOffset={4} gridColumn={4} mt={9}>
						<SubHeading mb={2}>Print Templates</SubHeading>
					</Cell>
					<Cell gridOffset={4} gridColumn={4} mt={3}>
						<Text>
							Please print out the PDF template and continue here
							afterwards.
						</Text>

						<Button
							mt={3}
							to={'../../enter-seed'}
							variant={'filled'}
						>
							Yes, I've printed the templates
						</Button>
					</Cell>
				</>
			) : (
				<>
					<Cell gridOffset={4} gridColumn={4} mt={9}>
						<SubHeading mb={2}>Print Templates</SubHeading>
					</Cell>
					<Cell gridOffset={4} gridColumn={4} mt={3}>
						<Text>Is your printer connected to this device?</Text>

						<Flex
							flexDirection={'column'}
							alignItems={'flex-end'}
							mt={3}
						>
							<Button onClick={onCopyToDrive} mb={1}>
								No, copy Templates-PDF to a USB-Drive
							</Button>
							<Button onClick={openTemplateInWindow}>
								Yes, open Templates-PDF
							</Button>
						</Flex>
					</Cell>
				</>
			)}
		</GridWrap>
	)
}

export default PrintTemplate
