import React from 'react'

import { navigate } from '@reach/router'

import GridWrap from '../../../GridWrap'
import Cell from '../../../Cell'
import SubHeading from '../../../SubHeading'
import Text from '../../../Text'
import Button from '../../../Button'

const SuccessfullySavedToDisk = ({ uniquePartsN, generatorState }) => {
	const { ipcRenderer } = window

	const onOpenDirectoryClick = () => {
		console.log(generatorState)
		const {
			meta: { savedToPath },
		} = generatorState

		ipcRenderer.once('directory-opened', ({ isOpen }) => {
			console.log('window opened', isOpen)
			navigate('/create/done')
		})

		ipcRenderer.send('open-directory', {
			path: savedToPath,
			//focusWindow: true
		})
	}

	return (
		<>
			<GridWrap>
				<Cell gridOffset={3} mt={14} gridColumn={6}>
					<SubHeading>
						{uniquePartsN}&nbsp;PDFs successfully saved!
					</SubHeading>
				</Cell>
			</GridWrap>
			<GridWrap>
				<Cell gridOffset={4} mt={3} gridColumn={3}>
					<Text>
						Successfully saved all PDFs with the shares to the file
						system.
					</Text>
				</Cell>
			</GridWrap>
			<GridWrap>
				<Cell gridOffset={4} mt={3} gridColumn={3}>
					<Button onClick={onOpenDirectoryClick} variant={'filled'}>
						Open Directory
					</Button>
				</Cell>
			</GridWrap>
		</>
	)
}

export default SuccessfullySavedToDisk
