import { Link } from 'react-router-dom'

const BackButton = () => (
	<div className="fixed top-4 left-4 z-40">
		<Link
			to="/"
			className="block p-2 bg-surface/80 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/25 transition-all">
			<img src="/logo.svg" alt="Home" className="w-5 h-5 border-0 hover:border-0" />
		</Link>
	</div>
)

export default BackButton
