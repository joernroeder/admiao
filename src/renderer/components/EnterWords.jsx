import React, { useRef, useState, useEffect } from 'react'

/** @jsx jsx */
import { jsx } from '@emotion/core'

import styled from '@emotion/styled'
import { css } from '@styled-system/css'
import { space, height, border, color } from 'styled-system'

//import css from '@styled-system/css';

import SeedWordsList from './backup/enterseed/SeedWordsList' // todo move
import SeedWordInput from './backup/enterseed/SeedWordInput' // todo move

const Line = styled.div`
	${border};
	${color};
	${height};
	${space};
	border-bottom: 1px solid;
	box-sizing: border-box;

	transition: opacity 0.15s ease-out;

	&:nth-last-of-type(2) {
		opacity: 0.75;
	}
	&:last-child {
		opacity: 0.5;
	}
`

Line.defaultProps = {
	height: 6,
	color: 'lightGray',
}

const EnterWords = ({
	dispatch,
	words,
	total,
	isValid,
	suggestions,
	incompleteButtons,
	confirmButtons,
	invalidButtons,
}) => {
	const wordListRef = useRef(null)
	const lineRef = useRef(null)
	const [lines, setLines] = useState(1)

	const listIsComplete = words.length === total

	// inputFocus is passed down (via forcedFocus prop) and used as a dependency on the useFocus effect of the input field.
	// we're updating it with the current timestamp whenever we want to refocus. this might be hacky but works for now.
	// todo review it.
	const [inputFocus, setInputFocus] = useState(null)
	const setFocus = () => {
		if (words.length === total) {
			return
		}

		setInputFocus(Date.now())
	}

	// recalculate the amount of lines needed whenever the amount of entered words has changed
	useEffect(() => {
		if (!wordListRef.current) {
			return
		}

		setLines(
			Math.round(
				wordListRef.current.offsetHeight / lineRef.current.offsetHeight
			)
		)
	}, [wordListRef, lineRef, words.length])

	return (
		<>
			<div
				css={css({
					position: 'relative',
					color: 'black',
					//backgroundColor: 'lightGray',
					//mx: -4,
					mt: 3,
					mb: 3,
					//px: 4,
					//py: 1,
					cursor: listIsComplete ? 'default' : 'text',
				})}
			>
				<div
					css={css({
						position: 'relative',
						zIndex: 2,
						pb: Line.defaultProps.height,
					})}
					onClick={setFocus}
				>
					<SeedWordsList
						mt={5}
						ref={wordListRef}
						hideAll={listIsComplete}
						showOnHover={isValid && listIsComplete}
						words={words}
					>
						{!listIsComplete && (
							<SeedWordInput
								dispatch={dispatch}
								suggestions={suggestions}
								placeholder={`Enter Word ${words.length +
									1} / ${total}`}
								forceFocus={inputFocus}
							/>
						)}
					</SeedWordsList>
				</div>
				<div
					css={css({
						position: 'absolute',
						zIndex: 1,
						width: '100%',
						top: 0,
						mt: -2,
					})}
				>
					<Line ref={lineRef} />
					{Array(lines)
						.fill()
						.map((el, index) => (
							<Line key={index} />
						))}
				</div>
			</div>

			{!listIsComplete && incompleteButtons}
			{isValid && listIsComplete && confirmButtons}
			{!isValid && listIsComplete && invalidButtons}
		</>
	)
}

export default EnterWords
