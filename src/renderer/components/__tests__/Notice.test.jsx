import React from 'react'

import { render } from '@testing-library/react'

import Notice from '../Notice'

describe('Notice component', () => {
	it('should render correctly', () => {
		const { container } = render(<Notice>Hello from the other side</Notice>)
		const notice = container.firstChild

		expect(notice).toMatchSnapshot()
	})
})
