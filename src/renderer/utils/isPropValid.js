import isPropValid from '@emotion/is-prop-valid'

const customIsPropValid = prop => {
	return (
		isPropValid(prop) &&
		![
			'fontSize',
			'letterSpacing',
			'color',
			'lineHeight',
			'direction',
		].includes(prop)
	)
}

export default customIsPropValid
