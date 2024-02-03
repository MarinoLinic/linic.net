// Square.js
import React, { useState } from 'react'

const Square = ({ filled, index, unit }: any) => {
	const [clicked, setClicked] = useState(false)
	const weekNumber = index + 1

	const handleClick = () => {
		setClicked(!clicked)
	}

	return (
		<div
			style={{
				width: '20px',
				height: '20px',
				backgroundColor: filled ? 'red' : 'white',
				border: `solid ${clicked === true ? 'blue 2px' : 'black 1px'}`,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative'
			}}
			onClick={handleClick}>
			{clicked && (
				<div
					style={{
						position: 'absolute',
						bottom: '25px', // Adjusted to display above the square
						left: '50%',
						transform: 'translateX(-50%)',
						backgroundColor: 'rgba(0, 0, 0, 0.7)',
						color: 'white',
						padding: '5px',
						borderRadius: '5px',
						fontSize: '12px'
					}}>
					{unit}: {weekNumber}
				</div>
			)}
		</div>
	)
}

export default Square
