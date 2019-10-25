import React from 'react'

import { act, fireEvent, render } from '@testing-library/react'

import CopyTemplateToUsb from '../distributeparts/CopyTemplateToUsb'

describe('Print Templates', () => {
	beforeEach(() => {
		global.ipcRenderer = {
			send: jest.fn(),
			sendSync: jest.fn(),
			on: jest.fn(),
			once: jest.fn(),
			removeListener: jest.fn(),
		}
	})

	test('it should correctly render the "insert drive" view', () => {
		// no drives attached
		global.ipcRenderer.sendSync.mockReturnValueOnce([])

		const { getByText, container } = render(<CopyTemplateToUsb />)

		expect(getByText('Insert USB-Drive')).toBeInTheDocument()

		expect(global.ipcRenderer.sendSync).toBeCalledTimes(1)
		expect(global.ipcRenderer.sendSync).toBeCalledWith(
			'get-usb-mountpoints'
		)

		expect(container.firstChild).toMatchSnapshot()
	})

	test('it should correctly render the "drive attached" view', () => {
		// drive attached
		global.ipcRenderer.sendSync.mockReturnValueOnce([
			{
				label: 'Drive Name',
				path: '/path/to/drive',
			},
		])

		const { getByText, container } = render(<CopyTemplateToUsb />)

		expect(global.ipcRenderer.on).toHaveBeenCalledTimes(2)

		expect(getByText('Found USB-Drive')).toBeInTheDocument()

		// Drive name should be in te text
		expect(getByText(/Drive Name/, { exact: false })).toBeInTheDocument()

		// buttons should exist
		expect(getByText('Yes, copy Templates-PDF')).toBeInTheDocument()
		expect(getByText('No, ignore it')).toBeInTheDocument()

		expect(container.firstChild).toMatchSnapshot()

		//expect(global.ipcRenderer.on).toBeCalledTimes(1)
		fireEvent.click(getByText('No, ignore it'))

		expect(getByText('Insert USB-Drive')).toBeInTheDocument()
	})

	test('it should correctly update when a drive gets attached', () => {
		// drive attached
		global.ipcRenderer.sendSync.mockReturnValueOnce([])

		const { getByText, container } = render(<CopyTemplateToUsb />)

		const [channel, callback] = global.ipcRenderer.on.mock.calls[0]
		expect(channel).toEqual('drive-attached')
		expect(typeof callback).toEqual('function')

		act(() => {
			callback(null, {
				drive: {
					label: 'Drive Name',
					path: '/path/to/drive',
				},
			})
		})

		// Drive name should be in te text
		expect(getByText(/Drive Name/, { exact: false })).toBeInTheDocument()

		// buttons should exist
		expect(getByText('Yes, copy Templates-PDF')).toBeInTheDocument()
		expect(getByText('No, ignore it')).toBeInTheDocument()

		expect(container.firstChild).toMatchSnapshot()
	})

	test('it should correctly send `copy-template` message via ipc', () => {
		// drive attached
		global.ipcRenderer.sendSync.mockReturnValueOnce([
			{
				label: 'Drive Name',
				path: '/path/to/drive',
			},
		])

		const { getByText } = render(
			<CopyTemplateToUsb templateIdentifier={'abc'} />
		)

		fireEvent.click(getByText('Yes, copy Templates-PDF'))

		expect(global.ipcRenderer.send).toBeCalledTimes(1)
		expect(global.ipcRenderer.send).toBeCalledWith('copy-template', {
			identifier: 'abc',
			path: '/path/to/drive',
		})
	})

	describe('it should correctly react  `copy-template` message via ipc', () => {
		// todo test ipcRenderer cleanup
		test('copy to disk succeeds', () => {
			// drive attached
			global.ipcRenderer.sendSync.mockReturnValueOnce([
				{
					label: 'Drive Name',
					path: '/path/to/drive',
				},
			])

			const { getByText, container } = render(
				<CopyTemplateToUsb templateIdentifier={'abc'} />
			)

			fireEvent.click(getByText('Yes, copy Templates-PDF'))

			const [channel, callback] = global.ipcRenderer.once.mock.calls[0]
			expect(channel).toEqual('template-copied')

			act(() => {
				callback(null, { identifier: 'abc', copied: true })
			})

			expect(
				getByText('Copied Template-PDF Successfully!')
			).toBeInTheDocument()
			expect(container.firstChild).toMatchSnapshot()
		})

		test('it should navigate to the `enter-seed` page afterwards', () => {
			// drive attached
			global.ipcRenderer.sendSync.mockReturnValueOnce([
				{
					label: 'Drive Name',
					path: '/path/to/drive',
				},
			])

			const { history, getByText } = global.renderWithRouter(
				<CopyTemplateToUsb templateIdentifier={'abc'} />
			)

			// sends via ipc
			fireEvent.click(getByText('Yes, copy Templates-PDF'))

			const [channel, callback] = global.ipcRenderer.once.mock.calls[0]

			// ipc returns
			act(() => {
				callback(null, { identifier: 'abc', copied: true })
			})

			fireEvent.click(getByText("Yes, I've printed the templates"))
			expect(history.location.pathname).toEqual('/enter-seed')
		})

		// todo test ipcRenderer cleanup
		test('copy to disk failed', () => {
			// drive attached
			global.ipcRenderer.sendSync.mockReturnValueOnce([
				{
					label: 'Drive Name',
					path: '/path/to/drive',
				},
			])

			const { getByText, container } = render(
				<CopyTemplateToUsb templateIdentifier={'abc'} />
			)

			fireEvent.click(getByText('Yes, copy Templates-PDF'))

			const [_, callback] = global.ipcRenderer.once.mock.calls[0]

			act(() => {
				callback(null, { identifier: 'abc', copied: false })
			})

			expect(
				getByText('Copying to the drive failed!')
			).toBeInTheDocument()
			expect(container.firstChild).toMatchSnapshot()
		})
	})
})
