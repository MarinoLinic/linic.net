import ML from '../assets/ML'

interface Props {
	width?: string
	height?: string
}

const Loader = ({ width = 'w-40', height = 'h-screen' }: Props) => {
	return (
		<div className={`flex items-center justify-center ${height}`}>
			<div className={`${width} animate-pulse`}>
				<ML />
			</div>
		</div>
	)
}

export default Loader
