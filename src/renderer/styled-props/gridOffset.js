import { system } from 'styled-system'

export default system({
	gridOffset: {
		property: 'marginLeft',
		scale: 'gridOffset',
		defaultScale: [0],
		transform: (value, scale) => {
			if (!scale || isNaN(scale[value])) {
				return ''
			}

			const val = scale[value] * 100

			return val ? `${val}%` : val
		},
	},
})
