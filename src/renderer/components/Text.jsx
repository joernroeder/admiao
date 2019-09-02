import styled from '@emotion/styled'
import { space, typography, color } from 'styled-system'
import {
	verticalRhythm,
	verticalRhythmProps,
} from '../utils/styled-system-rhythm'

const Text = styled.p`
	${color};
	${space};
	${typography};
	${verticalRhythm};
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	font-variant-ligatures: common-ligatures;
`

Text.defaultProps = {
	color: 'black',
	mt: 0,
	mb: 0,
	...verticalRhythmProps(0),
}

export default Text
