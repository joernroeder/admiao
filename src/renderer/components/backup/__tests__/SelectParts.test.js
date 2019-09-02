import React from 'react'
import { LocalStorageMock } from '@react-mock/localstorage'

import { fireEvent, render, cleanup } from '@testing-library/react'

import SelectParts from '../SelectParts'
import { SeedPartsProvider } from '../../../store/SeedPartsStore'

describe('SelectParts view', () => {
	test('to render the default view if no status is present', () => {
		const { container, debug, getByText, getByLabelText } = render(
			<LocalStorageMock>
				<SeedPartsProvider>
					<SelectParts />
				</SeedPartsProvider>
			</LocalStorageMock>
		)

		// headline
		expect(getByText(/Select Parts/i)).toBeInTheDocument()
	})

	describe('part selector', () => {
		test('to be able to increment and decrement total parts', () => {
			const { getByText, getByLabelText } = render(
				<LocalStorageMock>
					<SeedPartsProvider>
						<SelectParts />
					</SeedPartsProvider>
				</LocalStorageMock>
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
				<LocalStorageMock>
					<SeedPartsProvider>
						<SelectParts />
					</SeedPartsProvider>
				</LocalStorageMock>
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
})
