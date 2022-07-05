import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import Logo from '../images/talk.svg'
import Modal, { useModal } from './Modal'
import ModalBox from './ModalBox';
import Chat from '../pages/Chat';
import { useLocation } from 'react-router-dom'

export default function ChatIcon({ constraintsRef } :
{ constraintsRef: React.MutableRefObject<null> }) {

	// const [draggin, setDraggin] = useState<boolean>(false);
	var { modal, setOpen } = useModal(<Chat />);
	let location = useLocation();

	useEffect(() => {
		setOpen(false);
	}, [location]);
	

	// var tap = () => {
	// 	var drag = draggin;
	// 	return () => {
	// 		console.log('taptap ' + drag)
	// 		if (drag === true)
	// 			setDraggin(false);
	// 		else	
	// 			setOpen(true);
	// 	}
	// }
	// function drag() {
	// 	console.log(draggin)
	// 	setDraggin(true)
	// }
	return (
		<>
			<motion.img
			className='chatIcon'
			whileHover={{ scale: 1.2 }}
			drag
			dragConstraints={constraintsRef}
			dragMomentum={false}
			src={Logo} alt='logo'

			// onDragStart={drag}
			onClick={()=>{setOpen(true)}}
			// onTap={tap()}
			// onTapCancel={tap()}
			>
			</motion.img>
			{modal}
		</>
	)
}