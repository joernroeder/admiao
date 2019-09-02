import { system } from 'styled-system'

export default system({
	gridColumn: {
		property: 'width',
		defaultScale: [12], // this is a dirty hack right now.
		scale: 'gridColumns',
		transform: (value, scale) => {
			if (!scale || isNaN(scale[0])) {
				return ''
			}

			const val = (value / scale[0]) * 100

			return val ? `${val}%` : val
		},
	},
})
