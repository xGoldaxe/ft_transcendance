import React from 'react'
import { motion } from "framer-motion"

export default function ChatIcon({ constraintsRef } :
{ constraintsRef: React.MutableRefObject<null> }) {
  return (
	<motion.div
		className='chatIcon'
		whileHover={{ scale: 1.2 }}
		drag
		dragConstraints={constraintsRef}
		dragMomentum={false}
	/>
  )
}