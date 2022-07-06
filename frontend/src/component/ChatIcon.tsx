import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import Logo from '../images/talk.svg'
import Modal, { useModal } from './Modal'
import ModalBox from './ModalBox';
import Chat from '../pages/Chat';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export default function ChatIcon({ constraintsRef } :
{ constraintsRef: React.MutableRefObject<null> }) {

	// const [draggin, setDraggin] = useState<boolean>(false);
	var { isOpen, modal, setOpen } = useModal(<Chat />);
	var [searchParams, setSearchParams] = useSearchParams();

	useEffect(()=>{
		var isOpen = searchParams.get('chat')
		if (isOpen === 'open')
			setOpen(true)
	}, [searchParams])

	useEffect(() => {
		searchParams.delete('chat')
		if (isOpen === true)
			searchParams.append('chat', 'open')
		setSearchParams(searchParams)
	}, [isOpen])
	
	function onClick() {
		setOpen(true)
	}

	return (
		<>
			<motion.img
			className='chatIcon'
			whileHover={{ scale: 1.2 }}
			drag
			dragConstraints={constraintsRef}
			dragMomentum={false}
			src={Logo} alt='logo'
			onClick={onClick}
			>
			</motion.img>
			{modal}
		</>
	)
}