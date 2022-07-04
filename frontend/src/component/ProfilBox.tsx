import { useNavigate } from 'react-router-dom';
import useContextMenu from '../lib/generateMenu';

export function NameWithMenu({ name }: { name: string }) {

	const generateMenu = useContextMenu([
		{
			name: 'View profile',
			func: function renamePage() {
				console.log(name);
			}
		},
		{
			name: 'Add to friends',
			func: function renamePage() {
				console.log('add ' + name + ' as friend');
			}
		},
		{
			name: 'Block user',
			func: function renamePage() {
				console.log('block ' + name);
			}
		}
	])
	let navigate = useNavigate();

	return (
		<span
		className={'NameWithMenu'}
		onContextMenu={(e)=>generateMenu(e)}
		onClick={()=>{navigate(`/profile?name=${name}`)}}
		>
			{name}
		</span>
	)
}

export default function ProfilBox({ name }: { name: string }) {
	
	return (
		<div className='ProfilBox'>
			<div className='ProfilBox__image'></div>
			<p className={'ProfilBox__name'}>
				<NameWithMenu name={name}/>
			</p>
		</div>
	)
}
