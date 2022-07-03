import React from 'react'

export default function ProfilBox({ name }: { name: string }) {
	
	return (
		<div className='ProfilBox'>
			<div className='ProfilBox__image'></div>
			<p className='ProfilBox__name'>{name}</p>
			
		</div>
	)
}
