import React, {useEffect, useRef, useState} from 'react'
import BigButton from '../component/BigButton'
import Game from '../component/Game'


export default function Home() {
	return (
		<div className={'wholeSpaceContainer home'}>
			<div className={'home__buttons'}>
				<BigButton name={'play ranked'}/>
			</div>
			<div className={'home__game'}>
				<Game />
			</div>
		</div>
	)
}