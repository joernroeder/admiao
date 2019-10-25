const path = require('path')

const fontName = style =>
	path.resolve(
		__dirname,
		'../../../public/fonts/',
		`SpaceGrotesk-${style}.otf`
	)

const fonts = {
	SpaceGrotesk: {
		normal: fontName('Regular'),
		bold: fontName('Bold'),
	},
}

const styles = {
	defaultStyle: {
		font: 'SpaceGrotesk',
	},
	styles: {
		title: {
			fontSize: 64,
			lineHeight: 0.75,
			bold: true,
			margin: [0, 0, 160, 70], // [left, top, right, bottom]
		},
		body: {
			fontSize: 10,
			lineHeight: 1.6,
			margin: [95, 0, 0, 16],
		},
	},
	pageMargins: [70, 70, 90, 0],
}

module.exports = {
	fonts,
	styles,
}
