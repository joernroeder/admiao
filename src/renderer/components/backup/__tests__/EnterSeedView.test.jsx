import React from 'react'

import { act, fireEvent, render } from '@testing-library/react'
import { DistributionProvider } from '../../../store/DistributionStore'

import EnterSeedView from '../EnterSeedView'

describe('Enter Seed', () => {
	beforeEach(() => {
		global.ipcRenderer = {
			send: jest.fn(),
			once: jest.fn(),
			on: jest.fn(),
			removeListener: jest.fn(),
		}
	})

	const renderWithProviders = (children, renderFunction = render) => {
		return renderFunction(
			<DistributionProvider>{children}</DistributionProvider>
		)
	}

	test('it should render correctly', () => {
		const { getByText, container } = renderWithProviders(<EnterSeedView />)

		expect(getByText('Enter Seed')).toBeInTheDocument()

		expect(container.firstChild).toMatchSnapshot()
	})
})
