import styled from '@emotion/styled'

import { Link } from '@reach/router'
import { space, color } from 'styled-system'
import {
	verticalRhythm,
	verticalRhythmProps,
} from '../utils/styled-system-rhythm'

const StyledLink = styled(Link)`
	${color};
	${space};
	${verticalRhythm};
	//font-weight: bold;
	display: inline-block;
	text-decoration: none;

	&:hover,
	&:focus {
		text-decoration: underline;
	}
`

StyledLink.defaultProps = {
	...verticalRhythmProps(0),
	color: 'grayText',
}

export default StyledLink
