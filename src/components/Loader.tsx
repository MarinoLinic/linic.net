import ML from '../assets/ML'

interface props {
	width: string
	height: string
}

const Loader = (props: props) => {
	return (
		<div className={`flex items-center justify-center ${props.height}`}>
			<div className={`${props.width} animate-pulse`}>
				<ML />
			</div>
		</div>
	)
}

Loader.defaultProps = {
	width: 'w-40',
	height: 'h-screen'
}

export default Loader
