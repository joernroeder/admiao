/**
 * Styled Components Rhythm
 *
 * A tiny helper to construct vertical typographic rhythms.
 * This is a (shameless 🙈) modification of https://github.com/ceteio/styled-components-rhythm
 * influenced by @see https://www.youtube.com/watch?v=TGHbkTGVqoU and @see https://github.com/ianrose/typesettings/
 *
 * You can use the `rhythm(lines)` helper it in your styled components to add spacing based on grid or
 * adjust the font size via `setFontWithRhythm('fontName', lines)`.
 * Head over to https://github.com/ceteio/styled-components-rhythm#options-object and
 * https://github.com/ceteio/styled-components-rhythm#using-the-theme-values to read more about the setup.
 *
 * The purpose of it's modification is to make it compatible with styled-system and its flexible and responsive
 * theme config. Head over to ./styled-system-rhythm to see how it's used.
 *
 * @example
 *
 * const H1 = styled.h1`
 *   ${props => props.theme.setFontWithRhythm('Lato', 1.5)}
 *   padding-top: ${props => props.theme.rhythm(10)};
 *   margin-bottom: ${props => props.theme.rhythm(10)};
 * `;
 */
const StyledComponentsRhythm = function({
	baseFontSize,
	defaultLineHeight,
	// Works best when it divides evenly into (baseFontSize * lineHeight)
	rhythmHeight,
	// Object of <font name>: scale (0-1)
	// Calculate with a tool like https://codepen.io/sebdesign/pen/EKmbGL?editors=0011
	capHeights,
	debug = false,
}) {
	function rhythmShift(font, lineHeightRem, fontSizeRem = baseFontSize) {
		const capHeightFraction = capHeights[font]
		const capHeight = fontSizeRem * capHeightFraction

		return (lineHeightRem - capHeight) / 2
	}

	function roundToMultiple(value, multiple, direction = 'nearest') {
		const valueRoundedDown = Math.floor(value / multiple) * multiple

		// purposely avoiding floating point and division
		const isHalfOrOver = (value - valueRoundedDown) * 2 >= multiple

		if (direction === 'up' || (direction === 'nearest' && isHalfOrOver)) {
			// force rounding up
			return valueRoundedDown + multiple
		} else {
			// force rounding down
			return valueRoundedDown
		}
	}

	function rhythmLineHeight(
		font,
		fontSizeRem,
		desiredLineHeight = defaultLineHeight
	) {
		const capHeight = capHeights[font]

		const baseFontSizePx = baseFontSize * 16
		const fontSizePx = fontSizeRem * baseFontSizePx
		const desiredHeightPx = desiredLineHeight * fontSizePx
		const capHeightPx = capHeight * fontSizePx
		const rhythmHeightPx = rhythmHeight * baseFontSizePx

		// Rounded to the nearest rhythm line
		let roundedHeightPx = roundToMultiple(desiredHeightPx, rhythmHeightPx)

		// Disallow line heights below the cap height
		if (roundedHeightPx < capHeightPx) {
			roundedHeightPx = roundToMultiple(capHeightPx, rhythmHeightPx, 'up')
		}

		// convert back to a value relative to the font size rem
		return roundedHeightPx / baseFontSizePx
	}

	function rhythmSizing(multiple) {
		return rhythmHeight * multiple
	}

	function getFontStyleWithRhythm(
		fontName,
		fontSizeInRem,
		desiredLineHeight
	) {
		const lineHeight = rhythmLineHeight(
			fontName,
			fontSizeInRem,
			desiredLineHeight
		)
		const shift = rhythmShift(
			fontName,
			lineHeight,
			fontSizeInRem * baseFontSize
		)

		return {
			fontFamily: fontName,
			fontSize: `${fontSizeInRem}rem`,
			transform: `translateY(${shift}rem)`,
			lineHeight: `${lineHeight}rem`,
		}
	}

	function createRhythms(fontName, config) {
		const rhythms = config.map(({ fontSize, desiredLineHeight }) =>
			getFontStyleWithRhythm(fontName, fontSize, desiredLineHeight)
		)

		return {
			get(key) {
				return rhythms.map(rhythm => rhythm[key])
			},
		}
	}

	const theme = {
		rhythmHeight,
		setFontWithRhythm(fontName, fontSizeInRem, desiredLineHeight) {
			const {
				fontFamily,
				fontSize,
				transform,
				lineHeight,
			} = getFontStyleWithRhythm(
				fontName,
				fontSizeInRem,
				desiredLineHeight
			)

			return `
				font-family: ${fontFamily};
				font-size: ${fontSize};
				transform: ${transform};
				line-height: ${lineHeight};
			`
		},
		getFontStyleWithRhythm,
		createRhythms,
		rhythmSizing,
		rhythm(multiple) {
			return rhythmSizing(multiple) + 'rem'
		},
	}

	const global = `
    	${
			debug
				? `
    		html {
    			background: linear-gradient(rgba(255, 0, 0, 0.15), rgba(255, 0, 0, 0.15) 1px, transparent 1px);
    			background-size: 1px ${rhythmHeight}rem;
    		}
    	`
				: ''
		}

    	/* Specify our global font size */
    	body {
    		font-size: ${baseFontSize * 100}%;
    	}
    `

	return {
		theme,
		global,
	}
}

export default StyledComponentsRhythm
