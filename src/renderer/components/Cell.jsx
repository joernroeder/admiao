import styled from '@emotion/styled'
import { Box } from 'reflexbox'
import { background } from 'styled-system'

import gridOffset from '../styled-props/gridOffset'
import gridColumn from '../styled-props/gridColumn'

const Cell = styled(Box)`
	${background};
	${gridOffset};
	${gridColumn};
`

Cell.defaultProps = {
	px: 1,
}

export default Cell
