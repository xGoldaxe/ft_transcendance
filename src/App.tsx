import React, {useRef} from 'react';
import ChatIcon from './component/ChatIcon';
// import Game from './component/Game';
import Home from './pages/Home';
import Header from './component/Header';
import './main.scss'
import ProfilBox from './component/ProfilBox';
import { motion } from "framer-motion"
import Profile from './pages/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	const constraintsRef = useRef(null);

	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<div className='workZone' ref={constraintsRef}>
					<ChatIcon constraintsRef={constraintsRef}/>
					<motion.div
						className="workZone__page flexContainer"
						drag
						dragSnapToOrigin={true}
						dragConstraints={constraintsRef}
						dragMomentum={false}
					>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path='profile' element={<Profile />} />
							</Routes>
					</motion.div>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;