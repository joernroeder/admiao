import React from 'react'

import { fireEvent, render } from '@testing-library/react'

import DistributeShares from '../DistributeShares'
import { DistributionProvider } from '../../../store/DistributionStore'
import { SeedPartsProvider } from '../../../store/SeedPartsStore'

describe('DistributeParts view', () => {
	const renderWithRouterAndProviders = children => {
		return renderWithProviders(children, global.renderWithRouter)
	}

	const renderWithProviders = (children, renderFunction = render) => {
		return renderFunction(
			<DistributionProvider>
				<SeedPartsProvider>{children}</SeedPartsProvider>
			</DistributionProvider>
		)
	}

	afterEach(() => {
		localStorage.clear()
	})

	describe('it should render and buttons should link correctly', () => {
		test('it should render correctly', () => {
			const { getByText } = renderWithProviders(<DistributeShares />)

			expect(
				getByText('How will you distribute your shares?')
			).toBeInTheDocument()

			// distribution types
			expect(
				getByText(/local printer/i, { exact: false })
			).toBeInTheDocument()
			expect(
				getByText(/print them later/i, { exact: false })
			).toBeInTheDocument()
			expect(
				getByText(/hand them out digitally/i, { exact: false })
			).toBeInTheDocument()
			expect(
				getByText(/don't know yet/i, { exact: false })
			).toBeInTheDocument()
		})

		test('local print button should link to the parts generation page', () => {
			const { history, getByText } = renderWithRouterAndProviders(
				<DistributeShares />
			)

			fireEvent.click(getByText(/local printer/i, { exact: false }))

			expect(history.location.pathname).toEqual('//print-template')
		})

		test('remote print button should link to the "Prepare USB-Drives" page', () => {
			const { history, getByText } = renderWithRouterAndProviders(
				<DistributeShares />
			)

			fireEvent.click(getByText(/print them later/i, { exact: false }))

			expect(history.location.pathname).toEqual('/prepare-disks')
		})

		test('digital distribution button should link to the "Prepare USB-Drives" page', () => {
			const { history, getByText } = renderWithRouterAndProviders(
				<DistributeShares />
			)

			fireEvent.click(
				getByText(/hand them out digitally/i, { exact: false })
			)

			expect(history.location.pathname).toEqual('/prepare-disks')
		})

		test('do not know page should link to the warning page', () => {
			const { history, getByText } = renderWithRouterAndProviders(
				<DistributeShares />
			)

			fireEvent.click(getByText(/don't know yet/i, { exact: false }))

			expect(history.location.pathname).toEqual('//warn-file-system')
		})
	})
})
