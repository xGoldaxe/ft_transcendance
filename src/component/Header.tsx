import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Header() {

	let navigate = useNavigate();
	return (
		<div 
		onClick={()=>{navigate(`/`)}}
		className='header'
		>
			CLASSICAL PONG
		</div>
	)
}
