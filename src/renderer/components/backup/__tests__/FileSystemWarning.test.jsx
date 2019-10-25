import React from 'react'

import { fireEvent, render } from '@testing-library/react'
import { ThemeProvider } from 'emotion-theming'
import { DistributionProvider } from '../../../store/DistributionStore'

import FileSystemWarning from '../distributeparts/FileSystemWarning'

describe('File-System Warning', () => {
	const renderWithProviders = (children, renderFunction = render) => {
		const theme = { colors: { lightGray: '#ccc' }, rhythm: size => size }

		return renderFunction(
			<ThemeProvider theme={theme}>
				<DistributionProvider>{children}</DistributionProvider>
			</ThemeProvider>
		)
	}

	test('it should render correctly', () => {
		const { getByText, container } = renderWithProviders(
			<FileSystemWarning />
		)

		expect(getByText(/be careful/i, { exact: false })).toBeInTheDocument()

		expect(container.firstChild).toMatchSnapshot()
	})

	test('it should correctly navigate to `/` on back button click', () => {
		const { getByText, history } = renderWithProviders(
			<FileSystemWarning />,
			global.renderWithRouter
		)

		fireEvent.click(getByText('No, go back'))

		expect(history.location.pathname).toEqual('/')
	})

	test('it should correctly navigate to `/enter-seed` on forward button click', () => {
		const { getByText, history } = renderWithProviders(
			<FileSystemWarning />,
			global.renderWithRouter
		)

		fireEvent.click(getByText('Yes, i take the risk'))

		expect(history.location.pathname).toEqual('/enter-seed')
	})
})
