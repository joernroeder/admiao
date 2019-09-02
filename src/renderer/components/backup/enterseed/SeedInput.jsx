import React, { useRef, useEffect } from 'react'

import styled from '@emotion/styled'
import themeGet from '@styled-system/theme-get'

import { width, color, background, space } from 'styled-system'
import {
	verticalRhythm,
	verticalRhythmProps,
} from '../../../utils/styled-system-rhythm'

import { useAutofocus } from '../../../hooks/useAutofocus'

const StyledInput = styled.span`
	${color};
	${background};
	${space};
	${width};
	${verticalRhythm};
	-webkit-appearance: none;
	border: none;
	box-sizing: border-box;
	font-weight: bold;
	display: inline-block;
	outline: none;
	//border: 1px solid red;

	letter-spacing: 0.015em;
	text-rendering: geometricPrecision;
	-webkit-font-smoothing: antialiased;
	font-variant-ligatures: common-ligatures;

	&:before {
		content: attr(data-placeholder);
		color: ${themeGet('colors.grayText')};
		position: absolute;
		top: 0;
		z-index: 100;
		white-space: nowrap;
		pointer-events: none;

		transition: opacity 0.15s ease-in;
	}

	&.hide-placeholder:before {
		opacity: 0;
		transition-timing-function: ease-out;
		//transition: opacity 0.15s ease-in;
	}
`

StyledInput.defaultProps = {
	...verticalRhythmProps(1),
	color: 'black',
	//backgroundColor: 'lightGray',
	px: 2,
	//py: 1,
	width: '100%',
}

const SeedInput = props => {
	const { value } = props
	// autocomplete events
	const { onInput, onKeyDown, onBlur } = props
	// styling props
	const { placeholder } = props

	const inputRef = useRef(null)

	// auto focus
	const { forceFocus } = props
	useEffect(() => {
		inputRef.current.focus()
	}, [inputRef, forceFocus])

	// cleaning up editable on input reset
	useEffect(() => {
		if (value) {
			return
		}

		inputRef.current.innerText = value
		inputRef.current.focus()
	}, [value, inputRef])

	if (inputRef.current) {
	}

	return (
		<StyledInput
			ref={inputRef}
			contentEditable={true}
			{...{ onInput, onKeyDown, onBlur }}
			data-placeholder={placeholder}
			className={value ? 'hide-placeholder' : ''}
			{...useAutofocus}
		/>
	)
}

export default SeedInput
