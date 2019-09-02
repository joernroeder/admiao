import React from 'react'

import { useSeedPartsState } from '../../store/SeedPartsStore'

import SelectNewParts from './selectparts/SelectParts'
import ContinueWithSelection from './selectparts/ContinueWithSelection'

const SelectParts = () => {
	const { recoveredFromPreviousSelection } = useSeedPartsState()

	return recoveredFromPreviousSelection ? (
		<ContinueWithSelection />
	) : (
		<SelectNewParts />
	)
}

export default SelectParts
