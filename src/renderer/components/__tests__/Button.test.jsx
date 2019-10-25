import React from 'react'

import { render } from '@testing-library/react'

import Button, { Directions } from '../Button'

describe('Button component', () => {
	test('matches the snapshot and contains the next icon', () => {
		const { container } = render(<Button>Button Label</Button>)
		const button = container.firstChild

		expect(button).toHaveTextContent('Button Label')
		expect(button).toContainHTML('<span class="icon next">→</span>')

		expect(button).toMatchSnapshot()
	})

	test('matches the snapshot and contains the prev icon', () => {
		const { container } = render(
			<Button direction={Directions.BACKWARDS}>Button Label</Button>
		)
		const button = container.firstChild

		expect(button).toContainHTML('<span class="icon prev">←</span>')

		expect(button).toMatchSnapshot()
	})

	test('default variant is outlined', () => {
		const { container } = render(<Button>Button Label</Button>)
		const button = container.firstChild

		expect(button).toHaveStyleRule('background-color', 'transparent')
		expect(button).toHaveStyleRule('color', 'black')
	})

	test('is filled', () => {
		const { container } = render(
			<Button variant={'filled'}>Button Label</Button>
		)
		const button = container.firstChild

		expect(button).toHaveStyleRule('background-color', 'black')
		expect(button).toHaveStyleRule('color', 'white')
	})
})
