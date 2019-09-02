import React from 'react'

import { render } from '@testing-library/react'

import Heading from '../Heading'

describe('Heading component', () => {
	// todo test media queries: -> font-sizes and line-height
	// todo test vertical rhythm
	it('should render correctly', () => {
		const { container } = render(<Heading>Hello Jest</Heading>)
		const heading = container.firstChild

		expect(heading).toMatchSnapshot()
	})
})
