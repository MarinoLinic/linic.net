import { useEffect } from 'react'
import Loader from './Loader'

const CV = () => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.location.href = 'https://drive.google.com/file/d/1jsVgAzWsNqjsLoU98-ROOF7SjNWPai7E/view?usp=sharing'
		}
	}, [])
	return (
		<>
			<Loader height="h-[60vh] md:h-[80vh]" />
			<h5 className="text-center text-quarnary uppercase">You might need to press return twice</h5>
		</>
	)
}

export default CV
