import React, {useEffect, useRef, useState} from 'react'
import BigButton from '../component/BigButton'
import Game from '../component/Game'
import ProfilBox from '../component/ProfilBox'


export default function Home() {
	return (
		<div className={'home'}>
			<div className={'home__buttons'}>
				<BigButton name={'play ranked'}/>
			</div>
			<div className={'home__game'}>
				<Game />
			</div>
			<ProfilBox name={'pleveque'} />
		</div>
	)
}