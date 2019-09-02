import { cloneElement, useState } from 'react'

/** @jsx jsx */
import { jsx } from '@emotion/core'

import styled from '@emotion/styled/macro'
import { ThemeProvider } from 'emotion-theming'
import { background, color, space } from 'styled-system'
import css from '@styled-system/css'
import { themeGet } from '@styled-system/theme-get'

import {
	verticalRhythm,
	verticalRhythmProps,
} from '../utils/styled-system-rhythm'
import { theme } from '../utils/theme'

import Text from './Text'

const ENTER_KEY = 13
const TAB_KEY = 9
const ESCAPE_KEY = 27
const BACKSPACE_KEY = 8
const ARROW_UP_KEY = 38
const ARROW_DOWN_KEY = 40

const StyledUl = styled.ul`
	${color};
	${background};
	${space};
	${verticalRhythm};
	list-style: none;
	width: 60%;
`

StyledUl.defaultProps = {
	backgroundColor: 'white',
	color: 'black',
	m: 0,
	mt: 1,
	p: 0,
	pb: 2,
}

const StyledLi = styled.li`
	${color};
	${space};
	${verticalRhythm};
	font-weight: bold;
	cursor: pointer;

	&:hover,
	&.active {
		background: ${themeGet('colors.lightGray')};
	}
`

StyledLi.defaultProps = {
	...verticalRhythmProps(1),
	px: 2,
	py: 1,
	mb: -1,
}

const SuggestionsList = ({
	css,
	className,
	suggestions,
	activeIndex,
	onItemClick,
}) => {
	if (!!suggestions.length) {
	}

	return (
		<ThemeProvider theme={theme}>
			<StyledUl {...{ css, className }}>
				{suggestions.map((suggestion, index) => {
					return (
						<StyledLi
							onClick={() => onItemClick(suggestion)}
							key={suggestion}
							className={index === activeIndex ? 'active' : ''}
						>
							{suggestion}
						</StyledLi>
					)
				})}
			</StyledUl>
		</ThemeProvider>
	)
}

const Autocomplete = ({
	children,
	list = [],
	cleanOnSelect = false,
	minLength = 0,
	onSelect,
	onEmptyBackspace,
}) => {
	const [showSuggestions, setShowSuggestions] = useState(true)
	const [filteredSuggestions, setFilteredSuggestions] = useState([])
	const [activeIndex, setActiveIndex] = useState(0)
	const [value, setValue] = useState('')

	function resetSuggestions() {
		setShowSuggestions(false)
		setActiveIndex(-1)
		setFilteredSuggestions([])
	}

	function onChange(e) {
		const userInput = e.currentTarget.value || e.currentTarget.innerText

		setValue(userInput)

		if (minLength && (!userInput || userInput.length < minLength)) {
			resetSuggestions()
			return
		}

		const filteredSuggestions = list.filter(suggestion => {
			return suggestion.toLowerCase().startsWith(userInput.toLowerCase())
		})

		//setValue(userInput);
		setFilteredSuggestions(filteredSuggestions)
		setActiveIndex(0)
		setShowSuggestions(true)
	}

	function onClick(suggestion) {
		resetSuggestions()
		setValue(cleanOnSelect ? '' : suggestion)
		onSelect(suggestion)
	}

	function onKeyDown(e) {
		if (e.keyCode === ENTER_KEY || e.keyCode === TAB_KEY) {
			e.preventDefault()

			const val = filteredSuggestions[activeIndex]

			if (!val) {
				return
			}

			setValue(cleanOnSelect ? '' : val)
			onSelect(val)

			resetSuggestions()
		} else if (e.keyCode === BACKSPACE_KEY) {
			if (value) {
				return
			}

			if (!onEmptyBackspace) {
				return
			}

			onEmptyBackspace()
		} else if (e.keyCode === ARROW_UP_KEY) {
			e.preventDefault()
			// cycle through suggestions @see https://youtu.be/wXLf18DsV-I?t=763
			setActiveIndex(
				(activeIndex - 1 + filteredSuggestions.length) %
					filteredSuggestions.length
			)
		} else if (e.keyCode === ARROW_DOWN_KEY) {
			e.preventDefault()
			setActiveIndex((activeIndex + 1) % filteredSuggestions.length)
		} else if (e.keyCode === ESCAPE_KEY) {
			resetSuggestions()
		}
	}

	const getSuggestionsList = () => {
		if (!value || !showSuggestions) {
			return
		}

		if (!filteredSuggestions.length) {
			return <Text>Nothing here :(</Text>
		}

		return (
			<SuggestionsList
				suggestions={filteredSuggestions}
				activeIndex={activeIndex}
				onItemClick={onClick}
				css={css({
					position: 'absolute',
					minWidth: '10rem',
				})}
			/>
		)
	}

	return (
		<div
			css={css({
				position: 'relative',
				zIndex: 100,
			})}
		>
			{/* input element gets passed in as a child,
			adding event listeners and selected value as props */}
			{cloneElement(children, {
				onInput: onChange,
				onBlur: onChange,
				onKeyDown,
				value,
			})}
			{getSuggestionsList()}
		</div>
	)
}

export default Autocomplete
