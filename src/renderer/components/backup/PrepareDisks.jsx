import React from 'react'
import styled from '@emotion/styled'
import { useSeedPartsState } from '../../store/SeedPartsStore'

import GridWrap from '../GridWrap'
import Cell from '../Cell'
import SubHeading from '../SubHeading'
import Text from '../Text'
import Button from '../Button'
import StyledLink from '../StyledLink'

import {
	useDistributionDispatch,
	DistributionTypes,
} from '../../store/DistributionStore'

const NoWrap = styled.span`
	white-space: nowrap;
`

const PrepareDisks = () => {
	const { requiredPartsT, requiredDisks, partsPerDisk } = useSeedPartsState()
	const dispatch = useDistributionDispatch()

	const enterSeedUrl = '../enter-seed'

	return (
		<GridWrap flexDirection={'column'}>
			<Cell gridOffset={4} gridColumn={6} mt={9}>
				<SubHeading mb={2}>
					Prepare
					<wbr /> <NoWrap>USB-Disks</NoWrap>
				</SubHeading>
			</Cell>
			<Cell gridOffset={3} gridColumn={5}>
				<Text mb={2}>
					In order to get your seed backup of this device in a secure
					way we’d suggest to have{' '}
					<strong>{requiredDisks} different</strong> USB-Disks
					prepared so we can store {partsPerDisk > 1 ? 'up to ' : ''}
					<strong>{partsPerDisk} parts on each disk</strong>.
				</Text>
				<Text>
					This means that even if the files of{' '}
					<strong>one disk</strong> get compromised during printing
					due to a malicious computer or printer, lost of the disk
					etc. the attacker has still access to less than the required{' '}
					<NoWrap>{requiredPartsT} parts.</NoWrap>
				</Text>
			</Cell>
			<Cell gridOffset={8}>
				<Button to={enterSeedUrl}>
					Yes, i have {requiredDisks} disks prepared
				</Button>
				<br />
				<StyledLink
					to={enterSeedUrl}
					onClick={() =>
						dispatch({ type: DistributionTypes.FILE_SYSTEM })
					}
					mt={1}
					pt={'4px'}
					ml={2}
					pl={'2px'}
				>
					No, i will handle that myself.
				</StyledLink>
			</Cell>
		</GridWrap>
	)
}

export default PrepareDisks
