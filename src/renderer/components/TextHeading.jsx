import styled from '@emotion/styled'
import { color, space, textAlign } from 'styled-system'

import {
	verticalRhythm,
	verticalRhythmProps,
} from '../utils/styled-system-rhythm'

const TextHeading = styled.h3`
	${color};
	${space};
	${textAlign};
	${verticalRhythm};

	letter-spacing: 0.015em;
	text-rendering: geometricPrecision;
	-webkit-font-smoothing: antialiased;
	font-variant-ligatures: common-ligatures;
`

TextHeading.defaultProps = {
	...verticalRhythmProps(1),
	color: 'black',
	mt: 0,
	mb: 1,
}

export default TextHeading
