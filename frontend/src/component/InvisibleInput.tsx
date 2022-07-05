import React, {useRef, useState} from 'react'

export function InvisibleInputSelect({name, choices, isLock=false }:
{name: string, choices: string[], isLock?: boolean}) {

	const [isFocus, setIsFocus] = useState<boolean>(false)

	return (
		<div className='InvisibleInput'>
			<span className='InvisibleInput__title'>{name}</span>
			<div className='InvisibleInput__container'>
				{(isFocus) && <div className='InvisibleInput--bg'></div>}
				{(isLock) && <div className='InvisibleInput--lock'></div>}
				<select
				className='InvisibleInput__input'
				onFocus={()=>setIsFocus(true)}
				onBlur={()=>setIsFocus(false)}
				>
					{choices.map((opt: string)=><option>{opt}</option>)}
				</select>
			</div>
		</div>
	)
}
export default function InvisibleInput({name, isLock=false}: {name: string, isLock?: boolean}) {

	const [isFocus, setIsFocus] = useState<boolean>(false)

	return (
		<div className='InvisibleInput'>
			<span className='InvisibleInput__title'>{name}</span>
			<div className='InvisibleInput__container'>
				{(isFocus) && <div className='InvisibleInput--bg'></div>}
				{(isLock) && <div className='InvisibleInput--lock'></div>}
				<input
				className='InvisibleInput__input'
				onFocus={()=>setIsFocus(true)}
				onBlur={()=>setIsFocus(false)}
				/>
			</div>
		</div>
	)
}