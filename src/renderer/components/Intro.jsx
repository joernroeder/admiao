import React from 'react'

/** @jsx jsx */
import { jsx } from '@emotion/core'

import styled from '@emotion/styled'
import { space, typography } from 'styled-system'

import { Flex } from 'reflexbox'
import { Link } from '@reach/router'

import gridColumn from '../styled-props/gridColumn'
import gridOffset from '../styled-props/gridOffset'

import GridWrap from './GridWrap'
import Cell from './Cell'
import SubHeading from './SubHeading'
import Text from './Text'
import { iconStyle } from './Button'

import isPropValid from '../utils/isPropValid'
import transition from '../utils/transition'

const IntroLink = styled(Link, {
	shouldForwardProp: isPropValid,
})`
	${typography};
	${space};
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	text-decoration: none;
	position: relative;
	z-index: 2;
	${transition.default(['background-color', 'color'])};

	&:hover,
	&:focus {
		background: black;
		${transition.hover()};

		h2,
		p {
			color: white;
		}
	}

	${iconStyle};
`

IntroLink.defaultProps = {
	pb: 5,
}

const Divider = styled.div`
	${gridColumn};
	${gridOffset};
	margin-top: -1px;
	margin-bottom: 0;
	padding: 0;
	border-top: 1px solid;
	border-color: ${props => props.theme.colors.lightGray};

	position: absolute;
	top: 50%;
	z-index: 1;
`

Divider.defaultProps = {}

const Intro = () => {
	return (
		<Flex flexDirection={'column'} height={'100vh'} alignItems={'stretch'}>
			<IntroLink to={'/create'}>
				<GridWrap backgroundColor={'transparent'}>
					<Cell gridColumn={5} gridOffset={2}>
						<SubHeading>
							Backup Seed&nbsp;
							<span className="icon next">→</span>
						</SubHeading>
					</Cell>
					<Cell gridColumn={5} alignSelf={'flex-end'}>
						<Text>
							Create a backup of your wallet seed words by
							splitting them securely into multiple shares.
						</Text>
					</Cell>
				</GridWrap>
			</IntroLink>

			<Divider gridColumn={12} gridOffset={1} />

			<IntroLink to={'/'} textAlign={'right'}>
				<GridWrap backgroundColor={'transparent'}>
					<Cell
						gridColumn={5}
						height={9}
						alignItems={'flex-end'}
						display={'flex'}
						gridOffset={2}
					>
						<Text>
							Recover the seed words of a wallet by  combining the
							distributed shares.
						</Text>
					</Cell>
					<Cell gridColumn={5} gridOffset={0}>
						<SubHeading>
							Restore Seed&nbsp;
							<span className="icon next">→</span>
						</SubHeading>
					</Cell>
				</GridWrap>
			</IntroLink>
		</Flex>
	)
}

export default Intro
