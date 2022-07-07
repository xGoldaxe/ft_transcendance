import React, { useEffect, useRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize';
import ModalBox from '../../component/ModalBox';
import ProfilBox, { NameWithMenu } from '../../component/ProfilBox';
import menu from '../../images/menu.svg'
import chat from '../../images/chat.svg'
import friendAdd from '../../images/friendAdd.svg'
import useContextMenu from '../../lib/generateMenu';
import InvisibleInput, { InvisibleInputSelect } from '../../component/InvisibleInput';
import Listing from '../../component/Listing';
import SaveBox from '../../component/SaveBox';
import ImageUploader from '../../component/ImageUploader';
import { useSearchParams } from 'react-router-dom';
import ChatUi from './Message';
import { ChannelParameter } from './Settings';

function FriendListFriend({name, pending}: {name: string, pending?: boolean}) {

	var [searchParams, setSearchParams] = useSearchParams()

	function onClick() {
		if (pending) {
			console.log('accept ' + name + ' as friend')
			return
		}
		searchParams.set('p_msg', name)
		setSearchParams(searchParams)
	}

	return (
		<div className='FriendList__friend' onClick={onClick}>
			<div className='FriendList__friend__profile'>
				<div className='FriendList__friend__profile__image' />
				<NameWithMenu name={name} />
			</div>
			{pending ?
			<img className='FriendList__friend__chat' src={friendAdd} alt=''/>
			:
			<img className='FriendList__friend__chat' src={chat} alt=''/>
			}
		</div>
	)
}

function FriendList() {

	return (
		<div className='FriendList--container'>
			<div className='FriendList'>
				<h1>Friend list</h1>
				<p>Pending: </p>
				<FriendListFriend name={'friend1'} pending={true}/>
				<FriendListFriend name={'friend1'} pending={true}/>
				<FriendListFriend name={'friend1'} pending={true}/>
				<FriendListFriend name={'friend1'} pending={true}/>
				<FriendListFriend name={'friend1'} pending={true}/>
				<p>Friends: </p>
				<FriendListFriend name={'friend1'} />
				<FriendListFriend name={'friend1'} />
				<FriendListFriend name={'friend1'} />
				<FriendListFriend name={'friend1'} />
				<FriendListFriend name={'friend1'} />
				<FriendListFriend name={'friend1'} />
				<FriendListFriend name={'friend1'} />
				<FriendListFriend name={'friend1'} />
				<FriendListFriend name={'friend1'} />
				<FriendListFriend name={'friend1'} />
				<FriendListFriend name={'friend1'} />
				<FriendListFriend name={'friend4'} />
				<FriendListFriend name={'friend1'} />
				<FriendListFriend name={'friend1'} />
				<FriendListFriend name={'friend1'} />
			</div>
		</div>
	)
}

function ChannelJoin() {

	var message = 'This is a private room, you need to be invited!'
	const [pass, setPass] = useState<string>('')
	return (
		<div className='JoinRoom'>
			<div className='JoinRoom--container'>
				<div className='JoinRoom__image'></div>
				<div className='JoinRoom__name'>SUPER NAME ROOM</div>
				<div className='JoinRoom__message'>{message}</div>
				<InvisibleInput name={'Pass for room'} value={pass} setValue={setPass} />
				<button className='smallButton'>Join Us</button>
			</div>
		</div>
	)
}

function RoomUsers() {

	return (
		<div className='RoomUsers--container'>
			<div className='RoomUsers'>
				<div className='RoomUsers__section'>
					<div className='RoomUsers__section__name'>
						Super Admin -
					</div>
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} precClass={'RoomUsers__section__profile--red'}/>
				</div>

				<div className='RoomUsers__section'>
					<div className='RoomUsers__section__name'>
						Admins -
					</div>
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} precClass={'RoomUsers__section__profile--red'}/>
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} precClass={'RoomUsers__section__profile--red'}/>
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} precClass={'RoomUsers__section__profile--red'}/>
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} precClass={'RoomUsers__section__profile--gold'}/>
				</div>

				<div className='RoomUsers__section'>
					<div className='RoomUsers__section__name'>
						Users -
					</div>
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} />
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} />
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} />
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} />
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} />
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} />
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} />
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} />
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} />
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} />
					<ProfilBox name={'pleveque'} cName={'RoomUsers__section__profile'} />
				</div>
			</div>
		</div>
	)
}

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

function ChannelContextMenu({ children, channel, isOnClick=false }:
{ children: JSX.Element, channel: string, isOnClick?: boolean }) {

	var [searchParams, setSearchParams] = useSearchParams()
	const generateMenu = useContextMenu([
		{
			name: 'Create Invitation',
			func: function renamePage() {
				console.log("weq");
			}
		},
		{
			name: 'Channel settings',
			func: function renamePage() {
				searchParams.set('roomLocation', 'room/settings')
				setSearchParams(searchParams)
			}
		},
		{
			name: 'Leave channel',
			func: function renamePage() {
			}
		}
	])
	if (isOnClick)
		return (
			<div
			onContextMenu={(e)=>generateMenu(e)}
			onClick={(e)=>generateMenu(e)}
			>{children}</div>
		)
	return (
		<div onContextMenu={(e)=>generateMenu(e)}>{children}</div>
	)
}

interface Room {
	name: string
}

export default function Chat() {
	var [searchParams, setSearchParams] = useSearchParams();
	const [room, setRoom] = useState<Room | null>(null)

	useEffect(() => {
		var roomId = searchParams.get('roomId')
		if (roomId=== null)
		{
			setRoom(null)
			return
		}
		var newRoom: Room = Object.assign({}, room);
		newRoom.name = roomId
		setRoom(newRoom)
	}, [searchParams])
	
	return (
		<ModalBox>
			<div className='Chat'>
				<div className='Chat__channels'>
					<div className='Chat__channels__home'>
						<ChatBubble location={'home'}/>
						<hr />
					</div>
					{/* get all channels and put them here */}
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
				</div>

				<div className='Chat__right'>
					{room && <ChannelContextMenu channel={'channel name'} isOnClick={true}>
						<div className='Chat__right__roomName'>
							<div className='Chat__right__roomName__image'></div>
							{room.name}
							<img className='Chat__right__roomName__menu' src={menu} alt='' />
						</div>
					</ChannelContextMenu>}

					{getChannelRoute(searchParams.get('roomLocation'))}
				</div>
			</div>
		</ModalBox>
	)
}

function getChannelRoute(route: string | null) {
	if (route === null || route === 'home')
		return (<ChatHome />)
	else if (route === 'roon/home')
		return (<ChatChannelHome />)
	else if (route === 'room/settings')
		return (<ChatChannelParameter />)
	else if (route === 'room/join')
		return (<ChatChannelJoin />)
	else
		return (<ChatChannelHome />)
}
		

/* pages */
function ChatHome() {

	var [searchParams, setSearchParams] = useSearchParams()

	return (
		<div className='Chat__right__room'>
		{searchParams.has('p_msg') ? <ChatUi /> : <FriendList />}
		</div>
	)
}


function ChatChannelHome() {

	return (
		<div className='Chat__right__room'>
		<ChatUi />
		<RoomUsers />
		</div>
	)
}

function ChatChannelParameter() {
	return (
		<div className='Chat__right__room'>
		<ChannelParameter />
		<RoomUsers />
		</div>
	)
}

function ChatChannelJoin() {
	return (
		<div className='Chat__right__room'>
		<ChannelJoin />
		</div>
	)
}
