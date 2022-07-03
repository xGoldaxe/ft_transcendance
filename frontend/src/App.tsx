import React, {useRef} from 'react';
import ChatIcon from './component/ChatIcon';
// import Game from './component/Game';
import Home from './pages/Home';
import Header from './component/Header';
import './main.scss'
import ProfilBox from './component/ProfilBox';
import { motion } from "framer-motion"
import Profile from './component/Profile';

function App() {
	const constraintsRef = useRef(null);

	return (
		<div className="App" ref={constraintsRef}>
			<ChatIcon constraintsRef={constraintsRef}/>
			<Header />
			<motion.div
				className="workZone flexContainer"
				drag
				dragSnapToOrigin={true}
				dragConstraints={constraintsRef}
				dragMomentum={false}
			>
				<ProfilBox name={'pleveque'} />
				{/* <Home /> */}
				<Profile name={'tbelhomm'}/>
			</motion.div>
			<Header />
		</div>
	);
}

export default App;