import React from 'react'

import { fireEvent, render } from '@testing-library/react'

import SelectParts from '../SelectParts'
import { SeedPartsProvider } from '../../../store/SeedPartsStore'

describe('SelectParts view', () => {
	beforeEach(() => {
		localStorage.clear()
	})

	test('to render the default view if no status is present', () => {
		const { getByText } = render(
			<SeedPartsProvider>
				<SelectParts />
			</SeedPartsProvider>
		)

		// headline
		expect(getByText(/Select Parts/i)).toBeInTheDocument()
	})

	describe('part selector component', () => {
		test('to be able to increment and decrement total parts', () => {
			const { getByText, getByLabelText } = render(
				<SeedPartsProvider>
					<SelectParts />
				</SeedPartsProvider>
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
			const { getByText, getByLabelText, debug } = render(
				<SeedPartsProvider>
					<SelectParts />
				</SeedPartsProvider>
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
		const { history, getByText } = global.renderWithRouter(
			<SeedPartsProvider>
				<SelectParts />
			</SeedPartsProvider>
		)

		fireEvent.click(getByText('Continue'))

		expect(history.location.pathname).toEqual('/confirm-selection')
	})

	// todo test for confirmation and distribution selection and redirect accordingly
	test('the ability to continue with a selection made previously', () => {
		// first visit
		const firstVisit = render(
			<SeedPartsProvider>
				<SelectParts />
			</SeedPartsProvider>
		)

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
		const secondVisit = global.renderWithRouter(
			<SeedPartsProvider>
				<SelectParts />
			</SeedPartsProvider>
		)

		expect(
			secondVisit.getByText('Continue Seed Backup')
		).toBeInTheDocument()
		expect(secondVisit.queryByText(/Select Parts/i)).toBeNull()

		expect(secondVisit.getByLabelText('Total Parts')).toHaveTextContent('5')
		expect(secondVisit.getByLabelText('Required Parts')).toHaveTextContent(
			'3'
		)

		fireEvent.click(secondVisit.getByText('Yes, continue seed backup!'))

		expect(secondVisit.history.location.pathname).toEqual('/enter-seed')
	})

	test('the ability to reset a selection made previously', () => {
		// first visit
		const firstVisit = render(
			<SeedPartsProvider>
				<SelectParts />
			</SeedPartsProvider>
		)

		// 1. change selection
		fireEvent.click(firstVisit.getByLabelText('Increment Total Parts'))
		fireEvent.click(firstVisit.getByLabelText('Increment Total Parts'))
		fireEvent.click(firstVisit.getByLabelText('Increment Required Parts'))

		// 2. click next button
		fireEvent.click(firstVisit.getByText('Continue'))

		firstVisit.unmount()

		// second visit
		const secondVisit = render(
			<SeedPartsProvider>
				<SelectParts />
			</SeedPartsProvider>
		)

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
		const thirdVisit = render(
			<SeedPartsProvider>
				<SelectParts />
			</SeedPartsProvider>
		)

		// 4. still on the regular selection page
		expect(thirdVisit.getByText(/Select Parts/i)).toBeInTheDocument()
		expect(thirdVisit.queryByText('Continue Seed Backup')).toBeNull()
	})
})
