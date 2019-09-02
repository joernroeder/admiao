import React, { forwardRef } from 'react'
import styled from '@emotion/styled' // todo makro
/** @jsx jsx */
import { jsx } from '@emotion/core'

import { background, color, space } from 'styled-system'
import css from '@styled-system/css'

import {
	verticalRhythm,
	verticalRhythmProps,
} from '../../../utils/styled-system-rhythm'

const seedWordMargin = 1
const seedWordPadding = 1

const StyledUl = styled.ul`
	margin: 0;
	${space};
	list-style: none;
	padding: 0;
`

StyledUl.defaultProps = {
	mx: -seedWordMargin,
}

const SeedWord = styled.li`
	${background};
	${color};
	${space};
	${verticalRhythm};
	display: inline-block;
	font-weight: bold;
	user-select: none;
	transition: background-color 0.15s ease-in, border-radius 0.15s ease-in;
	border-radius: 1rem;

	&[hidden] {
		${css({
			color: 'black',
			backgroundColor: 'black',
		})} )
	}

	&[hidden].show-on-hover {
		cursor: help;

		&:hover {
			${css({
				color: 'black',
				backgroundColor: '#333',
				borderRadius: '.5rem',
			})} )
		}
	}
`

SeedWord.defaultProps = {
	...verticalRhythmProps(1),
	color: 'black',
	backgroundColor: 'lightGray',
	mx: seedWordMargin,
	px: seedWordPadding,
	mb: 2,
}

const SeedWordsList = forwardRef(
	({ children, hidePredecessors, hideAll, showOnHover, words }, ref) => {
		return (
			<StyledUl ref={ref}>
				{words.map((word, index, array) => {
					const isHidden =
						hideAll ||
						(hidePredecessors && index < array.length - 1)

					return (
						<SeedWord
							key={index}
							hidden={isHidden}
							className={
								isHidden && showOnHover ? 'show-on-hover' : ''
							}
						>
							{word}
						</SeedWord>
					)
				})}
				{children && (
					<li css={{ display: 'inline-block' }}>{children}</li>
				)}
			</StyledUl>
		)
	}
)

SeedWordsList.defaultProps = {
	hidePredecessors: true,
	showOnHover: false,
}

export default SeedWordsList
