import gridColumn from '../gridColumn'

const column = (width, theme) => {
	return gridColumn({
		gridColumn: width,
		theme,
	})
}

describe('gridColumn prop type', () => {
	it('should return nothing if the theme lacks gridColumms config', () => {
		expect(column(0, {})).toEqual({ width: 0 })
	})

	it('should correctly return the column width', () => {
		const theme = {
			gridColumns: [12],
		}

		expect(column(1, theme)).toEqual({ width: '8.333333333333332%' })
		expect(column(2, theme)).toEqual({ width: '16.666666666666664%' })
		expect(column(3, theme)).toEqual({ width: '25%' })
		expect(column(4, theme)).toEqual({ width: '33.33333333333333%' })
		expect(column(5, theme)).toEqual({ width: '41.66666666666667%' })
		expect(column(6, theme)).toEqual({ width: '50%' })
		expect(column(7, theme)).toEqual({ width: '58.333333333333336%' })
		expect(column(8, theme)).toEqual({ width: '66.66666666666666%' })
		expect(column(9, theme)).toEqual({ width: '75%' })
		expect(column(10, theme)).toEqual({ width: '83.33333333333334%' })
		expect(column(11, theme)).toEqual({ width: '91.66666666666666%' })
		expect(column(12, theme)).toEqual({ width: '100%' })
	})
})
