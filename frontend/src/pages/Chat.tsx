import React, { useEffect, useRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize';
import ModalBox from '../component/ModalBox';
import ProfilBox, { NameWithMenu } from '../component/ProfilBox';
import send from '../images/send.svg'
import menu from '../images/menu.svg'
import cross from '../images/cross.svg'
import game from '../images/game.svg'
import chat from '../images/chat.svg'
import friendAdd from '../images/friendAdd.svg'
import useContextMenu from '../lib/generateMenu';
import InvisibleInput, { InvisibleInputSelect } from '../component/InvisibleInput';
import Listing from '../component/Listing';
import SaveBox from '../component/SaveBox';
import _ from 'lodash'
import ImageUploader from '../component/ImageUploader';
import { useSearchParams } from 'react-router-dom';


function Message({ content, user, direction='left' }: { content: string, user: string, direction?: string }) {

	if (direction === 'right')
	{
		return (
			<div className='Message Message__right'>
				<div className='Message__data'>
					<p className='Message__name Message__right__name'>
						<span className='Message__date Message__right__date'>11:52</span>
						<NameWithMenu name={user} />
					</p>
					<div className='Message__content Message__right__content'>{content}</div>
				</div>
				<div className='Message__image Message__right__image'></div>
			</div>
		)
	}
	return (
		<div className='Message'>
			<div className='Message__image Message__left__image'></div>
			<div className='Message__data'>
				<p className='Message__name'>
					<NameWithMenu name={user} />
					<span className='Message__date Message__left__date'>11:52</span>
				</p>
				<div className='Message__content Message__left__content'>{content}</div>
			</div>
		</div>
	)
}

function ChatUi() {

	const ref = useRef<any>()
	const [value, setValue] = useState<string>('')

	function focus() {
		if(ref.current) ref.current.focus(); 
	}
	function sendMessage(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation()
		if (value.length > 0)
			console.log(value)
		else
			console.log('empty message!')
		setValue('')
	}
	
	return (
		<div className='ChatUi'>
			<div className='ChatUi__message'>
				<div className='ChatUi__message__container'>
					<Message content={'hello world'} user={'pleveque'} />
					<Message content={'hello world'} user={'pleveque'} />
					<Message content={'hello world'} user={'pleveque'} />
					<Message content={'hello world'} user={'pleveque'} />
					<Message content={'hello world'} user={'pleveque'} />
					<Message content={'hello world'} user={'pleveque'} />
					<Message content={'hello world'} user={'pleveque'} />
					<Message content={'hello world'} user={'pleveque'} />
					<Message content={'hello world'} user={'pleveque'} />
					<Message content={'hello world'} user={'pleveque'} />
					<Message content={'hello world this is a verty longn messag hello world this is a verty longn messag hello world this is a verty longn messag'} user={'pleveque'} />
					<Message direction={'right'} content={'hello world this is a verty longn messag hello world this is a verty longn messag hello world this is a verty longn messag'} user={'pleveque'} />
				</div>
			</div>
			<div className='ChatUi__input' onClick={focus}>
				<ReactTextareaAutosize
				ref={ref}
				onChange={ev => setValue(ev.target.value)}
				value={value}
				/>
				<img className='ChatUi__input__button' src={game} alt={'game'} onClick={(e)=>sendMessage(e)}/>
				<img className='ChatUi__input__button' src={send} alt={'send'} onClick={(e)=>sendMessage(e)}/>
			</div>
		</div>
	)
}

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

type ServerProtection = 'Private' | 'Protected' | 'Public'

interface RoomOpt {
	image: any | string,
	name: string,
	serverProtection: string,
	pass: string,
	admin: string[],
	muted: string[],
	banned: string[]
}

function ChannelParameter() {

	const [global, setGlobal] = useState<RoomOpt>({
		image: 'https://pierreevl.vercel.app/image/logo.jpg',
		name: 'Super name for room',
		serverProtection: 'Public',
		pass: '',
		admin: ['pleveque0', 'pleveque1', 'pleveque2'],
		muted: ['pleveque0', 'pleveque1', 'pleveque2'],
		banned: ['pleveque0', 'pleveque1', 'pleveque2']
	})
	const [local, setLocal] = useState<RoomOpt>({image: '', name: '',serverProtection: 'Private',pass: '',admin: [],muted: [],banned: []})
	const [modified, setModified] = useState<boolean>(false)
	useEffect(() => {setLocal(Object.assign({}, global))}, [global])
	var [searchParams, setSearchParams] = useSearchParams()

	function close() {
		searchParams.set('roomLocation', 'room/home')
		setSearchParams(searchParams)
	}
	
	/*update local */
	function setImage(image: any) {
		var newLocal: RoomOpt = Object.assign({}, local);
		newLocal.image = image
		setLocal(newLocal)
	}
	function resetImage() {
		var newLocal: RoomOpt = Object.assign({}, local);
		newLocal.image = global.image
		setLocal(newLocal)
	}
	function setServerProtection(value: string) {
		var newLocal: RoomOpt = Object.assign({}, local);
		newLocal.serverProtection = value
		setLocal(newLocal)
	}
	function setAdmin(admins: string[]) {
		var newLocal: RoomOpt = Object.assign({}, local);
		newLocal.admin = admins
		setLocal(newLocal)
	}
	function setMuted(muteds: string[]) {
		var newLocal: RoomOpt = Object.assign({}, local);
		newLocal.muted = muteds
		setLocal(newLocal)
	}
	function setBanned(banneds: string[]) {
		var newLocal: RoomOpt = Object.assign({}, local);
		newLocal.banned = banneds
		setLocal(newLocal)
	}
	function setRoomName(name: string) {
		var newLocal: RoomOpt = Object.assign({}, local);
		newLocal.name = name
		setLocal(newLocal)
	}
	function setRoomPass(pass: string) {
		var newLocal: RoomOpt = Object.assign({}, local);
		newLocal.pass = pass
		setLocal(newLocal)
	}
	/*update local */

	function compareState() {
		if (_.isEqual(local, global) === false)
			setModified(true)
		else
			setModified(false)
	}

	function reset() {
		setLocal(Object.assign({}, global))
	}

	useEffect(() => {
		compareState()
	}, [local])

	return (
		<div className='ChannelParameter--container'>
			<div className='ChannelParameter'>
				<img onClick={close} src={cross} className='ChannelParameter__cross' alt='' />
				<div className='ChannelParameter__image'>
					<img
					alt="not fount"
					src={typeof(local.image) === 'string' ? local.image
					: URL.createObjectURL(local.image)}
					onError={resetImage}
					/>
					<ImageUploader setSelectedImage={setImage}/>
				</div>
				<InvisibleInput name={'Room name'} value={local.name} setValue={setRoomName}/>
				<InvisibleInputSelect name={'Server protection'} choices={[
					'Private',
					'Protected',
					'Public'
				]} setSelected={setServerProtection} selected={local.serverProtection}/>
				<InvisibleInput name={'Pass for room'} isLock={local.serverProtection !== 'Protected'}
				value={local.pass} setValue={setRoomPass}/>
				<Listing name={'Admins'} data={local.admin} setData={setAdmin}/>
				<Listing name={'Muted'} data={local.muted} setData={setMuted}/>
				<Listing name={'Banned'} data={local.banned} setData={setBanned}/>
				{modified && <SaveBox onReset={reset} onSave={()=>console.log('send')}/>}
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
