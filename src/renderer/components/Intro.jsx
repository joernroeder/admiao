import React from 'react'

/** @jsx jsx */
import { jsx } from '@emotion/core'

import { Link } from '@reach/router'

import SubHeading from './SubHeading'

const Intro = () => {
	return (
		<>
			<ul css={{ mt: 8, listStyle: 'none' }}>
				<li>
					<Link to={'/create'}>
						<SubHeading>Create Seed Backup</SubHeading>
					</Link>
				</li>
				<li>
					<Link to={'/'}>
						<SubHeading>Restore Seed from Backup</SubHeading>
					</Link>
				</li>
			</ul>
		</>
	)
}

export default Intro
