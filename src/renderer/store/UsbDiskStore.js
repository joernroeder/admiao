import React, { createContext, useContext, useReducer } from 'react'

const initialState = {
	useManagedDisks: true,
}

function reducer(state, action) {
	switch (action.type) {
		case 'USE_PREPARED_DISKS': {
			return {
				...state,
				useManagedDisks: true,
			}
		}

		case 'DISABLE_DISK_MANAGEMENT': {
			return {
				...state,
				useManagedDisks: false,
			}
		}

		default:
			return state
	}
}

const UsbDiskStateContext = createContext(undefined)
const UsbDiskDispatchContext = createContext(undefined)

function UsbDiskProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<UsbDiskStateContext.Provider value={state}>
			<UsbDiskDispatchContext.Provider value={dispatch}>
				{children}
			</UsbDiskDispatchContext.Provider>
		</UsbDiskStateContext.Provider>
	)
}

function useUsbDiskState() {
	const context = useContext(UsbDiskStateContext)

	if (context === undefined) {
		throw new Error('useUsbDiskState must be used within a UsbDiskProvider')
	}
	return context
}

function useUsbDiskDispatch() {
	const context = useContext(UsbDiskDispatchContext)

	if (context === undefined) {
		throw new Error(
			'useUsbDiskDispatch must be used within a UsbDiskProvider'
		)
	}
	return context
}

export { UsbDiskProvider, useUsbDiskState, useUsbDiskDispatch }
