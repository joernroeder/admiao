import React from 'react'

import { act, fireEvent, render } from '@testing-library/react'
import { DistributionProvider } from '../../../store/DistributionStore'

import PrintTemplate from '../distributeparts/PrintTemplate'

describe('Print Templates', () => {
	beforeEach(() => {
		global.ipcRenderer = {
			send: jest.fn(),
			once: jest.fn(),
			removeListener: jest.fn(),
		}
	})

	const renderWithProviders = (children, renderFunction = render) => {
		return renderFunction(
			<DistributionProvider>{children}</DistributionProvider>
		)
	}

	test('it should render correctly', () => {
		const { getByText, container } = renderWithProviders(<PrintTemplate />)

		expect(getByText('Print Templates')).toBeInTheDocument()

		expect(
			getByText(/No, copy Templates-PDF/i, { exact: false })
		).toBeInTheDocument()
		expect(
			getByText(/Yes, open Templates-PDF/i, { exact: false })
		).toBeInTheDocument()

		expect(container.firstChild).toMatchSnapshot()
	})

	describe('open template via external app', () => {
		test('it should send a `open-template` message via ipc on button click', () => {
			const { getByText, unmount } = renderWithProviders(
				<PrintTemplate templateIdentifier={'abc'} />
			)

			fireEvent.click(getByText(/Yes, open/i))

			expect(global.ipcRenderer.send).toBeCalledTimes(1)
			expect(global.ipcRenderer.send).toHaveBeenCalledWith(
				'open-template',
				{ identifier: 'abc' }
			)

			// register listener
			expect(global.ipcRenderer.once).toHaveBeenCalledWith(
				'template-opened',
				expect.any(Function)
			)

			// test cleanup
			unmount()
			expect(global.ipcRenderer.removeListener).toHaveBeenCalledWith(
				'template-opened',
				expect.any(Function)
			)
		})

		describe('it should update once it received `template-opened` message', () => {
			test('valid response', () => {
				const { getByText, container } = renderWithProviders(
					<PrintTemplate templateIdentifier={'abc'} />
				)
				const [
					channel,
					callback,
				] = global.ipcRenderer.once.mock.calls[0]

				expect(channel).toEqual('template-opened')

				act(() => {
					callback(null, { identifier: 'abc', isOpen: true })
				})

				expect(
					getByText(/printed the templates/i, { exact: false })
				).toBeInTheDocument()

				expect(container.firstChild).toMatchSnapshot()
			})

			test('invalid identifier', () => {
				const { getByText } = renderWithProviders(
					<PrintTemplate templateIdentifier={'abc'} />
				)
				const [_, callback] = global.ipcRenderer.once.mock.calls[0]

				act(() => {
					callback(null, { identifier: 'some-other', isOpen: true })
				})

				expect(
					getByText(/Yes, open Templates-PDF/i, { exact: false })
				).toBeInTheDocument()
			})

			// todo, return to the user that the pdf could not be opened by the external app
			test('could not open', () => {
				const { getByText } = renderWithProviders(
					<PrintTemplate templateIdentifier={'abc'} />
				)
				const [_, callback] = global.ipcRenderer.once.mock.calls[0]

				act(() => {
					callback(null, { identifier: 'abc', isOpen: false })
				})

				expect(
					getByText(/Yes, open Templates-PDF/i, { exact: false })
				).toBeInTheDocument()
			})
		})

		test('it should call the passed in ´onCopyToDrive` function', () => {
			const onCopyToDrive = jest.fn()
			const { getByText } = renderWithProviders(
				<PrintTemplate onCopyToDrive={onCopyToDrive} />
			)

			fireEvent.click(getByText(/No, copy Templates/i, { exact: false }))

			expect(onCopyToDrive).toBeCalledTimes(1)
		})
	})
})
