import useContextMenu from '../lib/generateMenu';

export default function ProfilBox({ name }: { name: string }) {
	
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

	return (
		<div className='ProfilBox'>
			<div className='ProfilBox__image'></div>
			<p 
			className='ProfilBox__name'
			onContextMenu={(e)=>generateMenu(e)}
			>{name}</p>
		</div>
	)
}
