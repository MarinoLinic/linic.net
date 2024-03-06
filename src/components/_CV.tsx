import { useEffect } from 'react'
import Loader from './_Loader'

const CV = () => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.location.href = 'https://drive.google.com/file/d/1stck_UD2-hou52xonZVw2vUvJRqh9od4/view?usp=sharing'
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
