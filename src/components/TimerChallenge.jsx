import { useState, useRef } from 'react';

import ResultModal from './ResultModal';

// global variables shared by all components
function TimerChallenge({title, targetTime}){
	// ref usage is not limited to html elements
	// ref will not be cleared when component re-executed
	const timer = useRef();
	const dialog = useRef();

	const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

	const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000; 

	if (timeRemaining <= 0){
		clearInterval(timer.current);
		// no inf loop because in if statement that
		// is not met when sTR() called		
		dialog.current.open();
	}

	function handleReset(){
		setTimeRemaining(targetTime * 1000)
	}

	function handleStart(){
		// set timeout returns a pointer
		// set timer ref.current to timer pointer
		// setInterval every time set time expires (10ms)
		timer.current = setInterval(() => {
			setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);		
		}, 10);
	}

	function handleStop(){
		// manually stopped timer so player won
		dialog.current.open();
		// clearTimeout requires a pointer to timer
		// clearInterval clears setInterval
		clearInterval(timer.current);
	}
	
	return (
		<>
			<ResultModal 
				ref={dialog}
				targetTime={targetTime}
				remainingTime={timeRemaining}
				onReset={handleReset}
			/>
			<section className="challenge">
				<h2>{title}</h2>
				<p className="challenge-time">
					{targetTime} second{targetTime > 1 && 's'}
				</p>
				<p>
					<button onClick={timerIsActive ? handleStop : handleStart}>
						{timerIsActive ? 'Stop' : 'Start'} Challenge
					</button>
				</p>
				<p className={timerIsActive ? 'active' : undefined}>
					{timerIsActive ? 'Time is running...' : 'Timer inactive'}
				</p>
			</section>
		</>
	)
}

export default TimerChallenge;