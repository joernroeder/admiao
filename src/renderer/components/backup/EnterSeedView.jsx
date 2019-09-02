import React from 'react'
import { Router } from '@reach/router'

import { ThemeProvider } from 'emotion-theming'
import { darkTheme } from '../../utils/theme'

import GridWrap from '../GridWrap'
import Cell from '../Cell'

import Intro from './enterseed/Intro'
import IntroSidebar from './enterseed/IntroSidebar'

import Enter from './enterseed/Enter'
import EnterSidebar from './enterseed/EnterSidebar'

const EnterSeed = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<GridWrap minHeight={'100vh'}>
				<Cell gridOffset={2} gridColumn={3} mt={9}>
					<Router>
						<IntroSidebar default />
						<EnterSidebar path="enter" />
					</Router>
				</Cell>
				<Cell gridOffset={1} gridColumn={5}>
					<Router>
						<Intro default />
						<Enter path="enter" />
					</Router>
				</Cell>
			</GridWrap>
		</ThemeProvider>
	)
}

export default EnterSeed
