import styled from '@emotion/styled'
import { Flex } from 'reflexbox'
import { height, minHeight } from 'styled-system'

const GridWrap = styled(Flex)`
	${height};
	${minHeight};
`

GridWrap.defaultProps = {
	mx: -1,
	backgroundColor: 'white',
	color: 'black',
}

export default GridWrap
