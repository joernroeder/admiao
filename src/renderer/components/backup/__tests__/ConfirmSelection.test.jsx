import React from 'react'

import { ThemeProvider } from 'emotion-theming'
import { fireEvent, render } from '@testing-library/react'

import ConfirmSelection from '../ConfirmSelection'
import { SeedPartsProvider } from '../../../store/SeedPartsStore'

describe('Confirm Selection', () => {
	const theme = {
		colors: {},
	}

	beforeEach(() => {
		localStorage.clear()
	})

	describe('part selection should be displayed correctly', () => {
		test('correctly display 2 of 3', () => {
			const { getByText, container } = render(
				<ThemeProvider theme={theme}>
					<SeedPartsProvider>
						<ConfirmSelection />
					</SeedPartsProvider>
				</ThemeProvider>
			)

			expect(getByText('2 of 3')).toBeInTheDocument()
			expect(
				container.querySelectorAll('.pieSVG path[fill="#f00"]').length
			).toEqual(2)
			expect(
				container.querySelectorAll('.pieSVG path[fill="#ccc"]').length
			).toEqual(1)

			expect(container.firstChild).toMatchSnapshot()
		})

		test('correctly display 5 of 8', () => {
			// i know that this is an implementation detail which i am manipulating here...
			localStorage.setItem(
				'SeedPartsState',
				'{"uniquePartsN":8,"requiredPartsT":5}'
			)

			const { getByText, container } = render(
				<ThemeProvider theme={theme}>
					<SeedPartsProvider>
						<ConfirmSelection />
					</SeedPartsProvider>
				</ThemeProvider>
			)

			expect(getByText('5 of 8')).toBeInTheDocument()
			expect(
				container.querySelectorAll('.pieSVG path[fill="#f00"]').length
			).toEqual(5)
			expect(
				container.querySelectorAll('.pieSVG path[fill="#ccc"]').length
			).toEqual(3)

			expect(container.firstChild).toMatchSnapshot()
		})
	})

	test('next button should link to /how-to-distribute page', () => {
		const { history, getByText, debug } = global.renderWithRouter(
			<ThemeProvider theme={theme}>
				<SeedPartsProvider>
					<ConfirmSelection />
				</SeedPartsProvider>
			</ThemeProvider>
		)

		// headline
		expect(getByText('Confirm Selection')).toBeInTheDocument()
		expect(getByText('2 of 3')).toBeInTheDocument()

		fireEvent.click(getByText('Yes, looks good!'))

		expect(history.location.pathname).toEqual('/how-to-distribute')
	})

	test('back button should link to /select-parts page', () => {
		localStorage.setItem(
			'SeedPartsState',
			'{"uniquePartsN":8,"requiredPartsT":4}'
		)

		const { history, getByText, debug } = global.renderWithRouter(
			<ThemeProvider theme={theme}>
				<SeedPartsProvider>
					<ConfirmSelection />
				</SeedPartsProvider>
			</ThemeProvider>
		)

		// headline
		expect(getByText('Confirm Selection')).toBeInTheDocument()
		expect(getByText('4 of 8')).toBeInTheDocument()

		fireEvent.click(getByText('Nope, go back.'))

		expect(history.location.pathname).toEqual('/select-parts')
	})
})
