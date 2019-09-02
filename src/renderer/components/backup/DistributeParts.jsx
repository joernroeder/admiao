import React from 'react'
import { Flex } from 'reflexbox'

import GridWrap from '../GridWrap'
import Cell from '../Cell'
import SubHeading from '../SubHeading'
import Text from '../Text'
import Button from '../Button'
import StyledLink from '../StyledLink'
import {
	DistributionTypes,
	useDistributionDispatch,
} from '../../store/DistributionStore'

const HowToDistributeParts = () => {
	const dispatch = useDistributionDispatch()
	//const [_, setDistributionType] = useDistributionState();
	return (
		<>
			<GridWrap flexDirection={'column'}>
				<Cell>
					<GridWrap>
						<Cell gridColumn={8} gridOffset={4}>
							<SubHeading mt={8}>
								How will you distribute your shares?
							</SubHeading>
						</Cell>
					</GridWrap>
					<GridWrap>
						<Cell gridColumn={5} gridOffset={5} mt={4}>
							<Text>
								In order to get your shares as secure as
								possible of this device and into the hands of
								your trusted persons please select one of the
								following options.
							</Text>
						</Cell>
					</GridWrap>
					<GridWrap>
						<Cell gridColumn={4} gridOffset={5} mt={4}>
							<Flex flexDirection={'column'}>
								<Button
									to={'./print-template'}
									onClick={() =>
										dispatch({
											type: DistributionTypes.LOCAL_PRINT,
										})
									}
									mb={1}
								>
									On paper. I have a local printer available.
								</Button>

								<Button
									to={'../prepare-disks'}
									onClick={() =>
										dispatch({
											type:
												DistributionTypes.REMOTE_PRINT,
										})
									}
									mb={1}
								>
									On paper. I will print them later remotely.
								</Button>

								<Button
									to={'../prepare-disks'}
									onClick={() =>
										dispatch({
											type: DistributionTypes.DIGITAL,
										})
									}
									mb={1}
								>
									I will hand them out digitally.
								</Button>

								<StyledLink
									to={'../enter-seed'}
									onClick={() =>
										dispatch({
											type: DistributionTypes.FILE_SYSTEM,
										})
									}
									ml={2}
									pl={'2px'}
									py={'4px'}
									//onClick={() => dispatchUsbDisk({ type: 'DISABLE_DISK_MANAGEMENT' })}
								>
									Dont know yet. Just store the PDFs on disk
									for now.
								</StyledLink>
							</Flex>
						</Cell>
					</GridWrap>
				</Cell>
			</GridWrap>
		</>
	)
}
export default HowToDistributeParts
