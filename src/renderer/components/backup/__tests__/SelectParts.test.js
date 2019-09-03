import React from 'react'

import { fireEvent, render } from '@testing-library/react'

import SelectParts from '../SelectParts'
import { SeedPartsProvider } from '../../../store/SeedPartsStore'
import { DistributionProvider } from '../../../store/DistributionStore'

describe('SelectParts view', () => {
	const renderWithRouterAndProviders = children => {
		return renderWithProviders(children, global.renderWithRouter)
	}

	const renderWithProviders = (children, renderfn = render) => {
		return renderfn(
			<DistributionProvider>
				<SeedPartsProvider>{children}</SeedPartsProvider>
			</DistributionProvider>
		)
	}

	afterEach(() => {
		localStorage.clear()
	})

	test('to render the default view if no status is present', () => {
		const { getByText } = renderWithProviders(<SelectParts />)

		// headline
		expect(getByText(/Select Parts/i)).toBeInTheDocument()
	})

	describe('part selector component', () => {
		test('to be able to increment and decrement total parts', () => {
			const { getByText, getByLabelText } = renderWithProviders(
				<SelectParts />
			)

			const totalParts = getByText('3')
			expect(totalParts).toBeInTheDocument()

			fireEvent.click(getByLabelText('Decrement Total Parts'))
			fireEvent.click(getByLabelText('Decrement Total Parts'))
			expect(totalParts).toHaveTextContent('1')

			// at least one share is required
			fireEvent.click(getByLabelText('Decrement Total Parts'))
			expect(totalParts).toHaveTextContent('1')

			fireEvent.click(getByLabelText('Increment Total Parts'))
			expect(totalParts).toHaveTextContent('2')

			fireEvent.click(getByLabelText('Increment Total Parts'))
			expect(totalParts).toHaveTextContent('3')
		})

		test('to be able to increment and decrement required parts limited by the total selection', () => {
			const { getByText, getByLabelText, debug } = renderWithProviders(
				<SelectParts />
			)

			const totalParts = getByText('3')
			expect(totalParts).toBeInTheDocument()

			const requiredParts = getByText('2')
			expect(requiredParts).toBeInTheDocument()

			fireEvent.click(getByLabelText('Decrement Required Parts'))
			expect(requiredParts).toHaveTextContent('1')

			// at least one share is required
			fireEvent.click(getByLabelText('Decrement Required Parts'))
			expect(requiredParts).toHaveTextContent('1')

			fireEvent.click(getByLabelText('Increment Required Parts'))
			expect(requiredParts).toHaveTextContent('2')

			fireEvent.click(getByLabelText('Increment Required Parts'))
			expect(requiredParts).toHaveTextContent('3')

			// upper boundary <= total parts
			fireEvent.click(getByLabelText('Increment Required Parts'))
			expect(requiredParts).toHaveTextContent('3')

			// move boundary up by incrementing total parts
			fireEvent.click(getByLabelText('Increment Total Parts'))
			fireEvent.click(getByLabelText('Increment Required Parts'))
			expect(requiredParts).toHaveTextContent('4')
		})
	})

	test('continue button should navigate to the parts confirmation page at "/confirm-selection"', () => {
		const { history, getByText } = renderWithRouterAndProviders(
			<SelectParts />
		)

		fireEvent.click(getByText('Continue'))

		expect(history.location.pathname).toEqual('/confirm-selection')
	})

	test('the ability to continue with a selection made previously', () => {
		// first visit
		const firstVisit = renderWithProviders(<SelectParts />)

		// 1. check that we are on the selection page.
		expect(firstVisit.getByText(/Select Parts/i)).toBeInTheDocument()
		expect(firstVisit.queryByText('Continue Seed Backup')).toBeNull()

		// 2. update the part selector
		fireEvent.click(firstVisit.getByLabelText('Increment Total Parts'))
		fireEvent.click(firstVisit.getByLabelText('Increment Total Parts'))
		fireEvent.click(firstVisit.getByLabelText('Increment Required Parts'))

		// 3. click next
		fireEvent.click(firstVisit.getByText('Continue'))

		firstVisit.unmount()

		// second visit
		const secondVisit = renderWithRouterAndProviders(<SelectParts />)

		expect(
			secondVisit.getByText('Continue Seed Backup')
		).toBeInTheDocument()
		expect(secondVisit.queryByText(/Select Parts/i)).toBeNull()

		expect(secondVisit.getByLabelText('Total Parts')).toHaveTextContent('5')
		expect(secondVisit.getByLabelText('Required Parts')).toHaveTextContent(
			'3'
		)

		fireEvent.click(secondVisit.getByText('Yes, continue seed backup!'))

		expect(secondVisit.history.location.pathname).toEqual(
			'/how-to-distribute'
		)

		secondVisit.unmount()

		// time passes by, the user selects a distribution type during second visit.
		// third visit, distribution selection is made, identifier is present.
		localStorage.setItem(
			'DistributionState',
			JSON.stringify({
				distributionIdentifier: 'some-identifier',
			})
		)

		const thirdVisit = renderWithRouterAndProviders(<SelectParts />)

		fireEvent.click(thirdVisit.getByText('Yes, continue seed backup!'))
		expect(thirdVisit.history.location.pathname).toEqual('/enter-seed')
	})

	test('the ability to reset a selection made previously', () => {
		// first visit
		const firstVisit = renderWithProviders(<SelectParts />)

		// 1. change selection
		fireEvent.click(firstVisit.getByLabelText('Increment Total Parts'))
		fireEvent.click(firstVisit.getByLabelText('Increment Total Parts'))
		fireEvent.click(firstVisit.getByLabelText('Increment Required Parts'))

		// 2. click next button
		fireEvent.click(firstVisit.getByText('Continue'))

		firstVisit.unmount()

		// second visit
		const secondVisit = renderWithProviders(<SelectParts />)

		// 1. we are on the "continue previous selection" page
		expect(
			secondVisit.getByText('Continue Seed Backup')
		).toBeInTheDocument()

		expect(secondVisit.getByLabelText('Total Parts')).toHaveTextContent('5')
		expect(secondVisit.getByLabelText('Required Parts')).toHaveTextContent(
			'3'
		)

		// 2. but we dont want to continue -> resetting
		fireEvent.click(secondVisit.getByText('No, i want to start over'))

		// 3. reset to the regular selection page
		expect(firstVisit.getByText(/Select Parts/i)).toBeInTheDocument()
		expect(firstVisit.queryByText('Continue Seed Backup')).toBeNull()

		expect(secondVisit.getByLabelText('Total Parts')).toHaveTextContent('3')
		expect(secondVisit.getByLabelText('Required Parts')).toHaveTextContent(
			'2'
		)

		secondVisit.unmount()

		// third visit
		const thirdVisit = renderWithProviders(<SelectParts />)

		// 4. still on the regular selection page
		expect(thirdVisit.getByText(/Select Parts/i)).toBeInTheDocument()
		expect(thirdVisit.queryByText('Continue Seed Backup')).toBeNull()
	})
})
