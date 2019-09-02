import styled from '@emotion/styled'
import { background, color } from 'styled-system'

import Text from './Text'

const Notice = styled(Text)`
	${background};
	${color};
`

Notice.defaultProps = {
	p: 1,
	pl: 2,
	mr: -2,
	backgroundColor: 'black',
	color: 'white',
}

export default Notice
