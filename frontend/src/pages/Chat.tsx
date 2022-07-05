import React from 'react'
import ModalBox from '../component/ModalBox';
import ProfilBox from '../component/ProfilBox';

function ChatBubble({ name='' }: {name?: string}) {

	return (
		<div className='Chat__channels__bubble'>{name}</div>
	)
}

function ChatUi() {

	return (
		<div className='ChatUi'></div>
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
				</div>

				<div className='Chat__right'>
					<div className='Chat__right__roomName'>
						SUPER NAME FOR ROOM
					</div>

					<div className='Chat__right__room'>
						<ChatUi />
						<RoomUsers />
					</div>
				</div>
			</div>
		</ModalBox>
	)
}
