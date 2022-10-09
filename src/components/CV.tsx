import { useEffect } from 'react'

const CV = () => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.location.href = 'https://drive.google.com/file/d/1jsVgAzWsNqjsLoU98-ROOF7SjNWPai7E/view?usp=sharing'
		}
	}, [])
}

export default CV
