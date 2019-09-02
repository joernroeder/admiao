//import {createGlobalStyle} from 'styled-components';
import { css } from '@emotion/core'
import styledComponentsRhythm from './styled-components-rhythm'

// --- Config ---

const baseFontSize = 1
const defaultLineHeight = 1.6
const rhythmHeight = 0.5

// styled system range
const rangeLength = 30

// grid
const gridColumns = 14

// --- Helpers ---

// returns an array filled with [0 ... length]
// @see https://stackoverflow.com/a/3746849/520544
const range = length => {
	return Array.from({ length }, (_, i) => i)
}

// converts the passed in amount of grid lines into pixels
const rhythm = lines => {
	return lines * rhythmHeight * 16
}

// --- Vertical Rhythm Setup ---

const {
	theme: rhythmTheme,
	global: globalRhythmStyle,
} = styledComponentsRhythm({
	baseFontSize, // 1rem. Browser default makes this 16px
	defaultLineHeight, // unitless line-height, see: https://css-tricks.com/almanac/properties/l/line-height/#comment-1587658
	rhythmHeight, // rem units. With browser default, this is 16px * 0.5rem == 8px
	capHeights: {
		// Calculated with https://codepen.io/sebdesign/pen/EKmbGL?editors=0011
		Lato: 0.73,
		SpaceGrotesk: 0.75,
	},
	debug: true,
})

const rhythms = rhythmTheme.createRhythms('SpaceGrotesk', [
	{
		fontSize: 0.875,
		desiredLineHeight: 1.5,
	},
	{
		fontSize: 1.3125, //1.5,
		desiredLineHeight: 1.375, //1.25
	},
	{
		fontSize: 4.5,
		desiredLineHeight: 0.972,
	},
	{
		fontSize: 9,
		desiredLineHeight: 0.8,
	},
	{
		fontSize: 13.875,
		desiredLineHeight: 0.8,
	},
])

// vertical rhythm debug grid
export const verticalRhythmStyle = css`
	${globalRhythmStyle}
`

let fontWeight = {
	light: 300,
	regular: 400,
	medium: 500,
	semiBold: 600,
	bold: 700,
}

export const fontStyle = css`
	@font-face {
		font-family: 'Space Grotesk';
		src: url('/fonts/SpaceGrotesk-Light.woff2') format('woff2'),
			url('/fonts/SpaceGrotesk-Light.woff') format('woff');
		font-weight: ${fontWeight.light};
		font-style: normal;
	}

	@font-face {
		font-family: 'Space Grotesk';
		src: url('/fonts/SpaceGrotesk-Regular.woff2') format('woff2'),
			url('/fonts/SpaceGrotesk-Regular.woff') format('woff');
		font-weight: ${fontWeight.regular};
		font-style: normal;
	}

	@font-face {
		font-family: 'Space Grotesk';
		src: url('/fonts/SpaceGrotesk-Medium.woff2') format('woff2'),
			url('/fonts/SpaceGrotesk-Medium.woff') format('woff');
		font-weight: ${fontWeight.medium};
		font-style: normal;
	}

	@font-face {
		font-family: 'Space Grotesk';
		src: url('/fonts/SpaceGrotesk-SemiBold.woff2') format('woff2'),
			url('/fonts/SpaceGrotesk-SemiBold.woff') format('woff');
		font-weight: ${fontWeight.semiBold};
		font-style: normal;
	}

	@font-face {
		font-family: 'SpaceGrotesk';
		src: url('/fonts/SpaceGrotesk-Bold.woff2') format('woff2'),
			url('/fonts/SpaceGrotesk-Bold.woff') format('woff');
		font-weight: ${fontWeight.bold};
		font-style: normal;
	}

	body,
	button,
	input,
	textarea,
	select {
		font-family: 'Space Grotesk', sans-serif;
	}
`

// --- Theme ---
const sizes = range(rangeLength).map(rhythm)

export const theme = {
	...rhythmTheme,
	space: sizes,
	sizes: sizes,
	fontSizes: rhythms.get('fontSize'),
	lineHeights: rhythms.get('lineHeight'),
	rhythmTransforms: rhythms.get('transform'),
	gridColumns: [gridColumns], // this is a dirty hack right now.
	gridOffset: range(gridColumns).map(val => val / gridColumns),
	colors: {
		black: '#000',
		white: '#fff',
		lightGray: '#eaeaea',
		//lightGray: '#d8d8d8',
		grayText: '#9a9a9a',
		gray: '#262626',
	},
	fontWeight,
}

export const darkTheme = {
	...theme,
	colors: {
		...theme.colors,
		black: 'rgba(255,255,255, 0.8)',
		white: 'rgba(0,0,0, 0.8)',
		lightGray: '#262626',
	},
}
