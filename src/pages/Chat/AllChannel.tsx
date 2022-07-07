import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChannelContextMenu, getWindowDimensions } from './Chat'
import arrow from '../../images/arrow.svg'

function ChatBubble({ name='', roomId, location }
: {name?: string, roomId?: string, location: string}) {

	var [searchParams, setSearchParams] = useSearchParams()
	function onClick() {
		searchParams.set('roomLocation', location)
		if (roomId)
			searchParams.set('roomId', roomId)
		else
		{
			//reset
			searchParams.delete('roomId')
			searchParams.delete('p_msg')
		}
		setSearchParams(searchParams)
	}
	return (
		<ChannelContextMenu channel={'channel name'}>
			<div className='Chat__channels__bubble' onClick={onClick}>{name}</div>
		</ChannelContextMenu>
	)
}


export default function AllChannel() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
	const [open, setOpen] = useState<boolean>(false)

	function onClick(e: React.MouseEvent) {
		e.stopPropagation()
		setOpen(!open)
	}
	function hide() {
		setOpen(false)
	}
	useEffect(() => {
		if (windowDimensions.width > 700)
			setOpen(true)
	}, [windowDimensions])
	
	return (
		<div className='Chat__channels--container' onClick={hide}>
			<div className='Chat__channels' onClick={hide}>
				<div className='Chat__channels__home'>
					<ChatBubble location={'home'}/>
				</div>
				{open &&
				<>
					<hr/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
					<ChatBubble roomId={'very good room'} location={'room/home'}/>
				</>
				}
				{windowDimensions.width <= 700 &&
				<div className='Chat__channels__image' onClick={onClick}>
					{open ? <img src={arrow} alt='' style={{transform: 'rotate(90deg)'}}/>
					: <img src={arrow} alt='' style={{transform: 'rotate(-90deg)'}}/>}
				</div>
				}
			</div>
		</div>
	)
}
