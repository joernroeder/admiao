import gridOffset from '../gridOffset'

describe('gridOffset prop type', () => {
	it('should return nothing if the theme lacks gridOffset config', () => {
		const theme = {}
		const offset = gridOffset({ gridOffset: [0, 1, 2], theme })

		expect(offset).toMatchInlineSnapshot(`
		Object {
		  "@media screen and (min-width: 40em)": Object {
		    "marginLeft": "",
		  },
		  "@media screen and (min-width: 52em)": Object {
		    "marginLeft": "",
		  },
		  "marginLeft": 0,
		}
	`)
	})

	it('should return the offset as marginLeft', () => {
		const theme = {
			gridOffset: [0.1, 0.5, 1],
		}

		const offset = gridOffset({ gridOffset: [0, 1, 2], theme })

		expect(offset).toMatchInlineSnapshot(`
				Object {
				  "@media screen and (min-width: 40em)": Object {
				    "marginLeft": "50%",
				  },
				  "@media screen and (min-width: 52em)": Object {
				    "marginLeft": "100%",
				  },
				  "marginLeft": "10%",
				}
		`)
	})
})
