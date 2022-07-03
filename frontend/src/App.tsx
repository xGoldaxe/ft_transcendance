import React, {useRef} from 'react';
import ChatIcon from './component/ChatIcon';
import Game from './component/Game';
import Header from './component/Header';
import './main.scss'

function App() {
	const constraintsRef = useRef(null);

	return (
		<div className="App">
			<Header />
			<div className="workZone flexContainer" ref={constraintsRef}>
				<ChatIcon constraintsRef={constraintsRef}/>
				<Game />
			</div>
			<Header />
		</div>
	);
}

export default App;