import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Listing({name, data}: {name: string, data: string[]}) {

	const [expanded, setExpanded] = useState<boolean>(false)

	return (
		<div className='Listing'>
			<div className='Listing__name' onClick={()=>{setExpanded(!expanded)}}>{name}</div>
			<AnimatePresence>
				{expanded &&
					<motion.div
					initial={{ scaleY: 0 }}
					animate={{ scaleY: 1 }}
					exit={{ scaleY:0, height: 0 }}
					style={{ transformOrigin: 'top center' }}
					>
						{data.map((elem: string)=> <div className='Listing__element'>{elem}</div>)}
					</motion.div>
				}
			</AnimatePresence>
		</div>
	)
}
