import React, { useEffect } from 'react'
import ProfilBox from './ProfilBox'

function History({ name }: { name: string }) {

	return (
		<div className='History'>
			<p className='History__title'>History</p>
			<p className='History__game'>27 jul. 2022 14:18 4
				<span> {name} vs random </span>
			2</p>
		</div>
	)
}

export default function Profile({ name }: { name: string }) {


	/* player */
	return (
		<div>
			<ProfilBox name={name} />
			<History name={name}/>
		</div>
	)
}
