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

import transition from '../utils/transition'

// --- arrow styles ---

const arrowTranslateX = 0.4

export const iconStyle = `
	.icon {
		display: inline-block;
    	${transition.default(['transform'])}
    }
    
    &:hover {
    	.icon {
    		${transition.hover()}
    	}
    	
    	.icon.next {
    		transform: translateX(${arrowTranslateX}em);
    	}
    	
    	.icon.prev {
    		transform: translateX(${-arrowTranslateX}em);
    	}
    	
    	.icon.flip {
    		transform: rotate(90deg);
    	}
    }
`

// --- variants styles ---

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

const hoverVariants = {
	variants: {
		outlined: {
			bg: 'blackTransparent',
		},
		filled: {
			bg: 'whiteTransparent',
		},
		white: {
			bg: 'blackTransparent',
		},
		black: {
			bg: 'whiteTransparent',
		},
	},
}

// --- hover styles ---

export const Directions = {
	FORWARD: 'FORWARD',
	BACKWARDS: 'BACKWARDS',
	UP: 'UP',
	DOWN: 'DOWN',
	ABORT: 'ABORT',
	NONE: 'NONE',
}

const isHorizontal = direction => {
	return [Directions.FORWARD, Directions.BACKWARDS].includes(direction)
}

const HoverBg = styled('span', {
	shouldForwardProp: isPropValid,
})`
	${variant(hoverVariants)};

	display: block;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	opacity: 0;

	transform: skew(
			${({ direction }) => {
				return isHorizontal(direction) ? '-14deg' : 0
			}},
			0
		)
		translateX(
			${({ direction }) => {
				const offsetX = 10

				if (!isHorizontal(direction)) {
					return 0
				}
				const flip = Directions.FORWARD === direction ? -1 : 1

				return (100 + offsetX) * flip
			}}%
		)
		translateY(
			${({ direction }) => {
				if (isHorizontal(direction)) {
					return 0
				}

				if ([Directions.ABORT, Directions.DOWN].includes(direction)) {
					return -100
				}

				return 100
			}}%
		);

	${transition.default(['transform', 'opacity'])};

	*:hover > &,
	*:focus > & {
		opacity: 1;
		${transition.hover()};
		transform: translateX(
				${({ direction }) => {
					if (!isHorizontal(direction)) {
						return 0
					}

					const flip = direction === Directions.FORWARD ? -1 : 1

					return `${(arrowTranslateX + 1.5) * flip}em`
				}}
			)
			translateY(0)
			skew(
				${({ direction }) => {
					return isHorizontal(direction) ? '-14deg' : 0
				}},
				0
			);
	}
`

// --- button styles ---

const StyledButton = styled(Link, {
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

	display: inline-block;
	text-decoration: none;
	font-weight: 700;
	box-sizing: border-box;
	position: relative;
	z-index: 10;
	overflow: hidden;
	justify-content: space-between;

	text-rendering: geometricPrecision;
	-webkit-font-smoothing: antialiased;
	cursor: pointer;

	${iconStyle};

	& > span:first-of-type {
		position: relative;
		z-index: 10;
		display: flex;
		justify-content: space-between;
	}
`

// --- defaults ---

const defaultVariant = 'outlined'

HoverBg.defaultProps = {
	variant: defaultVariant,
}

StyledButton.defaultProps = {
	...verticalRhythmProps([0]),
	//color: 'black',
	borderWidth: 2,
	borderColor: 'black',
	borderStyle: 'solid',
	px: 2,
	py: 1,
	letterSpacing: '0.025em',
}

/*
 todo test if i makes sense to include useAutoFocus for 'filled' variant as they
 tend to be used for primary interactions without other dependencies.
 */
const Button = props => {
	const { direction, variant, to, children } = props

	const [prevIcon, nextIcon] = (() => {
		const nextArrow = (
			<>
				&nbsp;<span className="icon next">→</span>
			</>
		)
		const prevArrow = (
			<>
				<span className="icon prev">←</span>&nbsp;
			</>
		)
		const abortIcon = (
			<>
				<span className="icon flip cross">&times;</span>&nbsp;
			</>
		)

		switch (direction) {
			case Directions.FORWARD:
				return [null, nextArrow]

			case Directions.BACKWARDS:
				return [prevArrow, null]

			case Directions.ABORT:
				return [abortIcon, null]

			default:
				return [null, null]
		}
	})()

	const content = (() => {
		return (
			<>
				<span>
					{prevIcon}
					{children}
					{nextIcon}
				</span>
				<HoverBg variant={variant} direction={direction} />
			</>
		)
	})()

	return (
		<StyledButton as={!to ? 'button' : undefined} {...props}>
			{content}
		</StyledButton>
	)
}

Button.defaultProps = {
	variant: defaultVariant,
	direction: Directions.FORWARD,
}

export default Button
export const HoverEffect = HoverBg
