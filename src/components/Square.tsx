// Square.js
import React, { useState } from 'react'

const Square = ({ filled, index }: any) => {
	const [hovered, setHovered] = useState(false)
	const weekNumber = index + 1

	const toggleHover = () => {
		setHovered(!hovered)
	}

	return (
		<div
			style={{
				width: '20px',
				height: '20px',
				backgroundColor: filled ? 'red' : 'white',
				border: '1px solid black',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative'
			}}
			onMouseEnter={toggleHover}
			onMouseLeave={toggleHover}>
			{hovered && (
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
					Week: {weekNumber}
				</div>
			)}
		</div>
	)
}

export default Square
