import React from 'react'
import { Router } from '@reach/router'

import { ThemeProvider } from 'emotion-theming'
import { darkTheme } from '../../../../utils/theme'

import GridWrap from '../../../GridWrap'
import Cell from '../../../Cell'

import Intro from './Intro'
import IntroSidebar from './IntroSidebar'
import WriteDownSidebar from './WriteDownSidebar'
import ConfirmPartSidebar from './ConfirmPartSidebar'
import WriteDown from './WriteDown'
import ConfirmPart from './ConfirmPart'

//import Enter from './enterseed/WriteDown';
//import EnterSidebar from './enterseed/EnterSidebar';

const WriteDownView = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<GridWrap minHeight={'100vh'}>
				<Cell gridOffset={1} gridColumn={3} mt={9}>
					<Router>
						<IntroSidebar default />
						<WriteDownSidebar path="copy/:partIndex" />
						<ConfirmPartSidebar path="confirm/:partIndex" />
					</Router>
				</Cell>
				<Cell gridOffset={1} gridColumn={6}>
					<Router>
						<Intro default />
						<WriteDown path="copy/:partIndex" />
						<ConfirmPart path="confirm/:partIndex" />
					</Router>
				</Cell>
			</GridWrap>
		</ThemeProvider>
	)
}

export default WriteDownView
