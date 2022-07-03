import React, { useEffect, useState } from 'react'

interface gameData {
	width: number,
	height: number,
	widthUnit: number,
	heightUnit: number,
	playerWidth: number,
	playerHeight: number
}

function Player({ gameData, y, position }: { gameData: gameData, y: number, position: string }) {

	y = y < 0 ? 0 : y;
	y = y > 100 ? 100 : y;
	let realY = y * (gameData.height - gameData.playerHeight) / 100;
	return (
		position === "left" ?
			<rect x={gameData.widthUnit*5} y={realY} width={gameData.widthUnit*2}
				height={gameData.heightUnit*30} fill="black"/>
		:
			<rect x={ gameData.width - gameData.widthUnit*5 - gameData.widthUnit*2 } y={realY}
				width={gameData.playerWidth} height={gameData.playerHeight} fill="black"/>
	)
}

export default function Game() {

	var width : number = 800;
	var gameData: gameData = {
		width: width,
		height: width / 2,
		widthUnit: width / 100,
		heightUnit: width / 2 / 100,
		playerWidth: width / 100 * 2,
		playerHeight: width / 2 / 100 * 30
	}


	/* player */
	var [playerY, setPlayerY] = useState<number>(50);
	var [keyPress, setKeyPress] = useState<string>('');

	const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
		setKeyPress(event.code);
	}

	useEffect(() => {
		while(1)
		{
			var newY = playerY;
			if (keyPress === 'KeyA')
				newY = (newY+1 > 100) ? 100 : newY + 1;
			else if (keyPress === 'KeyD')
				newY = (newY-1 < 0) ? 0 : newY - 1;
			setPlayerY(newY);
		}
	}, [])
	
	
	return (
		<div className='gameArena' tabIndex={0} onKeyDown={keyDownHandler}>
			<svg width={gameData.width} height={gameData.height} version="1.1" xmlns="http://www.w3.org/2000/svg">
				
				<rect x={0} y={0} width={gameData.width} height={gameData.height} fill="white" strokeWidth="5"/>
				<line x1={gameData.width/2} x2={gameData.width/2} y1={0} y2={gameData.height} stroke="black" strokeWidth="5" strokeDasharray={`${gameData.heightUnit*4} ${gameData.heightUnit*2}`}/>

				<Player gameData={gameData} y={playerY} position={"left"} />
				<Player gameData={gameData} y={50} position={"right"} />
			</svg>
		</div>
	)
}
