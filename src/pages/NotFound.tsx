import BackButton from '../components/_BackButton'
import { usePageSEO } from '../hooks/usePageSEO'

const NotFound = () => {
	usePageSEO()
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4">
			<BackButton />
			<h1 className="text-quarternary">404</h1>
			<p className="text-muted">Page not found.</p>
		</div>
	)
}

export default NotFound
