import React from 'react'
import { render } from '@testing-library/react'

import Cell from '../Cell'

describe('Cell component', () => {
	it('should correctly have 1/2 of the grid gutter as horizontal padding', () => {
		const { container } = render(<Cell />)
		const cell = container.firstChild

		expect(cell).toHaveStyleRule(
			'padding-left',
			global.halfGridGutterInPixel
		)
		expect(cell).toHaveStyleRule(
			'padding-right',
			global.halfGridGutterInPixel
		)

		expect(cell).toMatchSnapshot()
	})
})
