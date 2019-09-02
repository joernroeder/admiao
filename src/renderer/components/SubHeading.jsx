import styled from '@emotion/styled'
import { color, space } from 'styled-system'

import {
	verticalRhythm,
	verticalRhythmProps,
} from '../utils/styled-system-rhythm'

const SubHeading = styled.h2`
	${color};
	${space};
	${verticalRhythm};
	font-family: 'SpaceGrotesk', sans-serif;
	letter-spacing: 0.01em;
	text-rendering: geometricPrecision;
	-webkit-font-smoothing: antialiased;
	font-variant-ligatures: common-ligatures;
`

SubHeading.defaultProps = {
	...verticalRhythmProps([1, 2, 2]),
	color: 'black',
	mt: 0,
	mb: 0,
}

export default SubHeading
