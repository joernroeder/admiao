import React from 'react'

import { render } from '@testing-library/react'

import Button from '../Button'

describe('Button component', () => {
	it('matches the snapshot and contains the next arrow', () => {
		const { container } = render(<Button>Button Label</Button>)
		const button = container.firstChild

		expect(button).toHaveTextContent('Button Label')
		expect(button).toContainHTML('<span class="arrow">→</span>')

		expect(button).toMatchSnapshot()
	})
})
