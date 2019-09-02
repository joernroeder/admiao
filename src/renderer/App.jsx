import React from 'react'
import { Router } from '@reach/router'

import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { fontStyle, theme, verticalRhythmStyle } from './utils/theme'

import { SeedPartsProvider } from './store/SeedPartsStore'
import { SeedWordsProvider } from './store/SeedWordsStore'
import { DistributionProvider } from './store/DistributionStore'

import Intro from './components/Intro'
import BackupIntro from './components/backup/BackupIntro'

import SelectParts from './components/backup/SelectParts'
import ConfirmSelection from './components/backup/ConfirmSelection'

import HowToDistributeParts from './components/backup/DistributeParts'
import GenerateTemplate from './components/backup/distributeparts/GenerateTemplate'

import PrepareDisks from './components/backup/PrepareDisks'
import EnterSeedView from './components/backup/EnterSeedView'
import Generate from './components/backup/Generate'
import WriteDownView from './components/backup/generateparts/distributelocal/WriteDownView'
import { GeneratedPartsProvider } from './store/GeneratedPartsStore'
import BackupOutro from './components/backup/BackupOutro'

const NestedRoute = ({ children }) => <div>{children}</div>

const CreateBackupProviderRoute = ({ children }) => {
	return (
		<DistributionProvider>
			<SeedPartsProvider>
				<SeedWordsProvider>{children}</SeedWordsProvider>
			</SeedPartsProvider>
		</DistributionProvider>
	)
}

const UseGeneratedPartsStoreRoute = ({ children }) => {
	return <GeneratedPartsProvider>{children}</GeneratedPartsProvider>
}

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<>
				<Global styles={verticalRhythmStyle} />
				<Global styles={fontStyle} />

				<Router>
					<Intro default />
					<CreateBackupProviderRoute path="create">
						<BackupIntro path="/" default />
						<SelectParts path="select-parts" />
						<ConfirmSelection path="confirm-selection" />
						<NestedRoute path="how-to-distribute">
							<HowToDistributeParts path="/" />
							<GenerateTemplate path="print-template" />
						</NestedRoute>
						<PrepareDisks path="prepare-disks" />
						<EnterSeedView path="enter-seed/*" />
						{/* todo wrap in seed parts store */}
						<UseGeneratedPartsStoreRoute path="generate">
							<Generate path="/" />
							<WriteDownView path="distribute-local/*" />
						</UseGeneratedPartsStoreRoute>
						<BackupOutro path="done" />
					</CreateBackupProviderRoute>
				</Router>
			</>
		</ThemeProvider>
	)
}

export default App
