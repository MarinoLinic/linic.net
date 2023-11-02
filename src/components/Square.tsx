const Square = ({ filled }: any) => {
	return (
		<div
			style={{
				width: '24px',
				height: '24px',
				backgroundColor: filled ? 'red' : 'white',
				border: '1px solid black'
			}}
		/>
	)
}

export default Square
