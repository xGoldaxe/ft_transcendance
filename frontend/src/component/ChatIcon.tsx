import React, { useState } from 'react'
import { motion } from "framer-motion"
import Logo from '../images/talk.svg'
import Modal, { useModal } from './Modal'

export default function ChatIcon({ constraintsRef } :
{ constraintsRef: React.MutableRefObject<null> }) {

	const [draggin, setDraggin] = useState<boolean>(false);
	var { modal, setOpen } = useModal(<p>Hey</p>);

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
			onDoubleClick={()=>{setOpen(true)}}
			// onTap={tap()}
			// onTapCancel={tap()}
			>
			</motion.img>
			{modal}
		</>
	)
}