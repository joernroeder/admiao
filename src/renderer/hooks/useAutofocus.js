import { useRef, useEffect } from 'react'

export function useAutofocus() {
	const ref = useRef()

	useEffect(() => {
		ref.current.focus()
	}, [ref])

	return ref
}
