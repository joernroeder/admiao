import React from 'react'
import { Link } from '@reach/router'

import styled from '@emotion/styled'
import isPropValid from '../utils/isPropValid'
import {
	border,
	color,
	height,
	space,
	typography,
	width,
	variant,
} from 'styled-system'

import {
	verticalRhythm,
	verticalRhythmProps,
} from '../utils/styled-system-rhythm'

// --- styles ---

const arrow = `
	.arrow {
		display: inline-block;
    	margin-left: 0.5em;
    	transition: transform 0.25s ease-in;
    }
    
    &:hover {
    	.arrow {
    		transform: translateX(0.30em);
    		transition-timing-function: ease-out;
    		transition-duration: 0.15s;
    	}
    }
`

const variants = {
	variants: {
		outlined: {
			color: 'black',
			bg: 'transparent',
		},
		filled: {
			color: 'white',
			bg: 'black',
		},
	},
}

const ButtonEl = styled.button`
	${border};
	${color};
	${space};
	${width};
	${height};
	${typography};
	${verticalRhythm};
	${variant(variants)};
	//background: none;
	display: inline-block;
	box-sizing: border-box;
	font-weight: 700;
	text-rendering: geometricPrecision;
	-webkit-font-smoothing: antialiased;

	cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
	${arrow};
`

const StyledLink = styled(Link, {
	shouldForwardProp: isPropValid,
})`
	${border};
	${color};
	${space};
	${width};
	${height};
	${typography};
	${verticalRhythm};
	${variant(variants)};
	//background: none;
	display: inline-block;
	text-decoration: none;
	font-weight: 700;
	//background: black;
	box-sizing: border-box;

	text-rendering: geometricPrecision;
	-webkit-font-smoothing: antialiased;
	${arrow};
`

// --- props ---

const defaultProps = {
	...verticalRhythmProps([0]),
	//color: 'black',
	borderWidth: 2,
	borderColor: 'black',
	borderStyle: 'solid',
	px: 2,
	py: 1,
	letterSpacing: '0.025em',
	variant: 'outlined',
}

ButtonEl.defaultProps = defaultProps
StyledLink.defaultProps = defaultProps

const Button = props => {
	const nextArrow = props.showArrow ? <span className="arrow">→</span> : null

	if (props.to) {
		return (
			<StyledLink {...props}>
				{props.children}
				{nextArrow}
			</StyledLink>
		)
	}
	return (
		<ButtonEl {...props}>
			{props.children}
			{nextArrow}
		</ButtonEl>
	)
}

Button.defaultProps = {
	showArrow: true,
}

export default Button
