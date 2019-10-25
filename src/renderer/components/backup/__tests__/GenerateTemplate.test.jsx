import React from 'react'

import { act, fireEvent, render } from '@testing-library/react'
import { SeedPartsProvider } from '../../../store/SeedPartsStore'

import GenerateTemplate from '../distributeparts/GenerateTemplate'

let onCopyToDrive = null
let testIdentifier = null

jest.mock('../distributeparts/PrintTemplate', () => {
	return ({ onCopyToDrive: callback, templateIdentifier }) => {
		onCopyToDrive = callback
		testIdentifier = templateIdentifier
		return 'PrintTemplateComponent'
	}
})

jest.mock('../distributeparts/CopyTemplateToUsb', () => {
	return () => 'CopyTemplateToUsbComponent'
})

describe('Print Templates', () => {
	beforeEach(() => {
		//jest.resetModules();
		//jest.resetAllMocks()
		onCopyToDrive = null
		testIdentifier = null

		global.ipcRenderer = {
			send: jest.fn(),
			once: jest.fn(),
			on: jest.fn(),
			removeListener: jest.fn(),
		}
	})

	const renderWithProviders = (children, renderFunction = render) => {
		return renderFunction(<SeedPartsProvider>{children}</SeedPartsProvider>)
	}

	test('it should render correctly the print template', () => {
		const { getByText } = renderWithProviders(
			<GenerateTemplate defaultPrintLocation={'local'} />
		)

		expect(getByText('PrintTemplateComponent')).toBeInTheDocument()
	})

	test('it should render correctly the copy to usb template', () => {
		const { getByText } = renderWithProviders(
			<GenerateTemplate defaultPrintLocation={'remote'} />
		)

		expect(getByText('CopyTemplateToUsbComponent')).toBeInTheDocument()
	})

	test('it should correctly update whenever the onCopyToDrive prop of the PrintTemplate component gets called', () => {
		const { getByText, container } = renderWithProviders(
			<GenerateTemplate />
		)

		expect(getByText('PrintTemplateComponent')).toBeInTheDocument()
		act(() => onCopyToDrive())
		expect(getByText('CopyTemplateToUsbComponent')).toBeInTheDocument()

		expect(container.firstChild).toMatchSnapshot()
	})

	test('it should send a `generate-template` message via ipc if no template identifier is set', () => {
		renderWithProviders(<GenerateTemplate />)

		expect(global.ipcRenderer.send).toBeCalledTimes(1)
		expect(global.ipcRenderer.send).toBeCalledWith('generate-template', {
			requiredPartsT: 2,
			uniquePartsN: 3,
		})

		renderWithProviders(
			<GenerateTemplate
				defaultTemplateIdentifier={'default-identifier'}
			/>
		)
		expect(global.ipcRenderer.send).toBeCalledTimes(1)
	})

	test('it should correctly update the template identifier once received via ipc', () => {
		renderWithProviders(<GenerateTemplate />)

		expect(global.ipcRenderer.on).toBeCalledTimes(1)
		const [channel, callback] = global.ipcRenderer.on.mock.calls[0]

		expect(channel).toEqual('template-generated')

		act(() => {
			callback(null, {
				error: null,
				data: {
					identifier: 'abc',
				},
			})
		})

		expect(testIdentifier).toEqual('abc')
	})
})
