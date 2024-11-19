import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom'

// ref is received as second element in function (props, ref)
const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset}, ref ){
	// goal is to detach dialog from outer components for abstraction
	const dialog = useRef();

	const userLost = remainingTime <= 0;
	const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
	const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

	// define props and methods available
	// on components from outside component
	// first arg is fwd ref, second is function of exposed props / fx
	useImperativeHandle(ref,() => {
		return{
			open(){
				// connects to ref in ResultModal component
				dialog.current.showModal();
			}
		}
	});
	
	// 2nd arg is HTML element where portal should be attached
	return createPortal(
		// dialog is by default invisible;
		// open dialog programatically to get built-in backdrop
		<dialog 
			ref={dialog} 
			className="result-modal"
			onClose={onReset}
		>
			{userLost && <h2>You lost</h2>}
			{!userLost && <h2>Your Score: {score}</h2> }
			<p>The target time was <strong>{targetTime} seconds</strong></p>
			<p>You stopped the timer with <strong>{formattedRemainingTime} seconds left</strong></p>
			{/* method=dialog makes button close dialog automatically*/}
			<form method="dialog" onSubmit={onReset}>
				<button>Close</button>
			</form>
		</dialog>,
		document.getElementById('modal')
	)
});

export default ResultModal;