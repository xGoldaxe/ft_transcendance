import React, { ReactElement, useState } from 'react'
import ReactDOM from 'react-dom';

export function useModal(children: ReactElement<any, any>) {

	const [open, setOpen] = useState(false);
	const modal = <Modal open={open} setOpen={setOpen}>{children}</Modal>
	return { 
		modal: modal,
		setOpen: setOpen
	}
}

export default function Modal({ children, open, setOpen }:
{ children: ReactElement<any, any>, open: boolean, setOpen: (arg0: boolean)=>void }) {

	return (
		ReactDOM.createPortal((
			open 
			? <div className='Modal' style={{
				width: '100vw',
				height: '100vh',
				position: 'absolute',
				top: 0,
				zIndex: 99999
			}}>
				<div className="Modal__bg" style={{
					width: '100vw',
					height: '100vh',
					position: 'absolute',
					backgroundColor: 'grey',
					opacity: '70%'
				}}
				onClick={()=>{setOpen(false)}}
				></div>
				<div className="Modal__content" style={{
					position: 'absolute',
					zIndex: 2
				}}>{children}</div>
			</div>
			: <></>
		), document.getElementById('root')! )
	)
}
