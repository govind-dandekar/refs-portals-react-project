import { useState, useRef } from 'react';

import ResultModal from './ResultModal';

// global variables shared by all components
function TimerChallenge({title, targetTime}){
	// ref usage is not limited to html elements
	// ref will not be cleared when component re-executed
	const timer = useRef();
	const dialog = useRef();

	const [timerStarted, setTimerStarted] = useState(false);
	const [timerExpired, setTimerExpired] = useState(false);

	function handleStart(){
		// set timeout returns a pointer
		// set timer ref.current to timer pointer
		timer.current = setTimeout(() => {
			setTimerExpired(true);
			dialog.current.open();
		}, targetTime * 1000);
		
		setTimerStarted(true);
	}

	function handleStop(){
		// clearTimeout requires a pointer to timer
		clearTimeout(timer.current);
	}
	
	return (
		<>
			<ResultModal 
				ref={dialog}
				result="lost"
				targetTime={targetTime}
			/>
			<section className="challenge">
				<h2>{title}</h2>
				<p className="challenge-time">
					{targetTime} second{targetTime > 1 && 's'}
				</p>
				<p>
					<button onClick={timerStarted ? handleStop : handleStart}>
						{timerStarted ? 'Stop' : 'Start'} Challenge
					</button>
				</p>
				<p className={timerStarted ? 'active' : undefined}>
					{timerStarted ? 'Time is running...' : 'Timer inactive'}
				</p>
			</section>
		</>
	)
}

export default TimerChallenge;