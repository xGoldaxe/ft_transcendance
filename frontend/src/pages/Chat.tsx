import React, { useRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize';
import ModalBox from '../component/ModalBox';
import ProfilBox, { NameWithMenu } from '../component/ProfilBox';
import send from '../images/send.svg'
import menu from '../images/menu.svg'
import useContextMenu from '../lib/generateMenu';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import InvisibleInput, { InvisibleInputSelect } from '../component/InvisibleInput';
import Listing from '../component/Listing';


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
				<img className='ChatUi__input__button' src={send} alt={'send'} onClick={(e)=>sendMessage(e)}/>
			</div>
		</div>
	)
}

function ChannelParameter() {
	return (
		<div className='ChannelParameter--container'>
			<div className='ChannelParameter'>
				<div className='ChannelParameter__image'></div>
				<div className='ChannelParameter__name'>channel name</div>
				<InvisibleInputSelect name={'Server protection'} choices={[
					'Private',
					'Protected',
					'Public'
				]} />
				<InvisibleInput name={'Pass for room'} isLock={true}/>
				<Listing name={'Admins'} data={['pleveque', 'pleveque', 'pleveque']}/>
				<Listing name={'Banned'} data={['tbelhomm', 'tbelhomm', 'tbelhomm']}/>
				{/* <div>Admins</div>
				<div>Banned</div>
				<div>muted</div> */}
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

function ChatBubble({ name='' }: {name?: string}) {

	return (
		<ChannelContextMenu channel={'channel name'}>
			<div className='Chat__channels__bubble'>{name}</div>
		</ChannelContextMenu>
	)
}

function ChannelContextMenu({ children, channel, isOnClick=false }:
{ children: JSX.Element, channel: string, isOnClick?: boolean }) {

	const generateMenu = useContextMenu([
		{
			name: 'Channel parameter',
			func: function renamePage() {
				console.log("weq");
			}
		},
		{
			name: 'Leave channel',
			func: function renamePage() {
				console.log('add ' + "ewqe" + ' as friend');
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

export default function Chat() {

	return (
		<ModalBox>
			<div className='Chat'>
				<div className='Chat__channels'>
					<div className='Chat__channels__home'>
						<ChatBubble name={'HOME'}/>
						<hr />
					</div>
					{/* get all channels and put them here */}
					<ChatBubble />
					<ChatBubble />
					<ChatBubble />
					<ChatBubble />
					<ChatBubble />
					<ChatBubble />
					<ChatBubble />
					<ChatBubble />
					<ChatBubble />
					<ChatBubble />
					<ChatBubble />
					<ChatBubble />
					<ChatBubble />
					<ChatBubble />
					<ChatBubble />
				</div>

				<div className='Chat__right'>
					<ChannelContextMenu channel={'channel name'} isOnClick={true}>
						<div className='Chat__right__roomName'>
							<div className='Chat__right__roomName__image'></div>
							SUPER NAME FOR ROOM
							<img className='Chat__right__roomName__menu' src={menu} alt='' />
						</div>
					</ChannelContextMenu>

					{getChannelRoute('/parameter')}
				</div>
			</div>
		</ModalBox>
	)
}

function getChannelRoute(route: string) {
	if (route === '/home')
		return (<ChatChannelHome />)
	if (route === '/parameter')
		return (<ChatChannelParameter />)
}
		

/* pages */
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
