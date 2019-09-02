import React from 'react'
import renderer from 'react-test-renderer'
import { theme } from './theme'
import { ThemeProvider } from 'styled-components'

export function renderWithTheme(component: React.ReactChild) {
	return renderer.create(
		<ThemeProvider theme={theme}>{component}</ThemeProvider>
	)
}
