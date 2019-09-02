import styled from '@emotion/styled'
import { background, color, space, minWidth } from 'styled-system'
import {
	verticalRhythm,
	verticalRhythmProps,
} from '../../../../utils/styled-system-rhythm'

const CurrentValue = styled.div`
	${background};
	${color};
	${space};
	${verticalRhythm};
	${minWidth};
	font-weight: bold;
	display: inline-block;
	text-align: center;
`

CurrentValue.defaultProps = {
	px: 1,
	py: 2,
	...verticalRhythmProps(2),
	background: 'black',
	color: 'white',
	setWidth: false,
	minWidth: '8rem',
}

export default CurrentValue
