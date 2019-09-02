import React from 'react'

import { render } from '@testing-library/react'

import GridWrap from '../GridWrap'

describe('GridWrap component', () => {
	it('should correctly even out the outer cell gutter', () => {
		const { container } = render(<GridWrap />)
		const wrap = container.firstChild

		const margin = '-4px'

		expect(wrap).toHaveStyleRule('margin-left', margin)
		expect(wrap).toHaveStyleRule('margin-right', margin)

		expect(wrap).toMatchSnapshot()
	})
})
