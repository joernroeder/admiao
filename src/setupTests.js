import React from 'react'

// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect'
import { matchers } from 'jest-emotion'

import { render } from '@testing-library/react'
import {
	createHistory,
	createMemorySource,
	LocationProvider,
} from '@reach/router'

expect.extend(matchers)

const gridGutter = 8

global.gridGutter = gridGutter
global.halfGridGutterInPixel = `${gridGutter / 2}px`
global.gridGutterInPixel = `${gridGutter}px`

// this is a handy function that I would utilize for any component
// that relies on the router being in context
const renderWithRouter = (
	ui,
	{ route = '/', history = createHistory(createMemorySource(route)) } = {}
) => {
	return {
		...render(<LocationProvider history={history}>{ui}</LocationProvider>),
		// adding `history` to the returned utilities to allow us
		// to reference it in our tests (just try to avoid using
		// this to test implementation details).
		history,
	}
}

global.renderWithRouter = renderWithRouter
