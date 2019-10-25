import React from 'react'

import { fireEvent, render } from '@testing-library/react'

import BackupIntro from '../BackupIntro'

describe('BackupIntro view', () => {
	test('to have headline, description and button', () => {
		const { getByText, container, debug } = render(<BackupIntro />)

		// headline
		expect(getByText('Backup Seed')).toBeInTheDocument()

		// description
		expect(getByText(/Donec/i, { exact: false })).toBeInTheDocument()

		// next button
		expect(getByText('Start Backup')).toBeInTheDocument()

		expect(container.firstChild).toMatchSnapshot()
	})

	test('start button should navigate to the part selection at "//select-parts"', () => {
		const { history, getByText } = global.renderWithRouter(<BackupIntro />)

		fireEvent.click(getByText('Start Backup'))

		expect(history.location.pathname).toEqual('//select-parts')
	})
})
