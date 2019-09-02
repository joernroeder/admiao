//import styled from 'styled-components';
import styled from '@emotion/styled'
import { color, space } from 'styled-system'

import {
	verticalRhythm,
	verticalRhythmProps,
} from '../utils/styled-system-rhythm'

const ChapterHeading = styled.h1`
	${color};
	${space};
	${verticalRhythm};
	font-family: 'SpaceGrotesk', sans-serif;
	letter-spacing: -0.02em;
	text-rendering: geometricPrecision;
	-webkit-font-smoothing: antialiased;
	font-variant-ligatures: common-ligatures;
`

ChapterHeading.defaultProps = {
	...verticalRhythmProps([2, 2, 3]),
	color: 'black',
	my: 0,
}

export default ChapterHeading
