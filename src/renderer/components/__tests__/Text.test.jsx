import React from 'react'

import { render } from '@testing-library/react'

import Text from '../Text'

describe('Text component', () => {
	it('should render correctly', () => {
		const { container } = render(<Text />)
		const text = container.firstChild

		expect(text).toMatchSnapshot()
	})
})
