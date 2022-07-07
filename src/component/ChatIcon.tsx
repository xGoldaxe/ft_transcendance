import React, { useEffect } from 'react'
import { motion } from "framer-motion"
import Logo from '../images/talk.svg'
import Chat from '../pages/Chat/Chat';
import { useSearchParams } from 'react-router-dom'
import { useModal } from './Modal';

export default function ChatIcon({ constraintsRef } :
{ constraintsRef: React.MutableRefObject<null> }) {

	// const [draggin, setDraggin] = useState<boolean>(false);
	var { isOpen, modal, setOpen } = useModal(<Chat />);
	var [searchParams, setSearchParams] = useSearchParams();

	useEffect(()=>{
		var isOpen = searchParams.get('chat')
		if (isOpen === 'open')
			setOpen(true)
		else
			setOpen(false)
	}, [searchParams])

	useEffect(() => {
		searchParams.delete('chat')
		if (isOpen === true)
			searchParams.append('chat', 'open')
		setSearchParams(searchParams, {replace: true})
	}, [isOpen])
	
	function onClick() {
		setOpen(true)
	}
	function goHome() {
		
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
			<div className='chatBox'>
				<img src={Logo} alt='' onClick={onClick}/>
				<img src={Logo} alt='' onClick={goHome}/>
				<img src={Logo} alt='' onClick={goHome}/>
			</div>
			{modal}
		</>
	)
}