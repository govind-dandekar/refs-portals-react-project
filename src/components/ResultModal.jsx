import { forwardRef, useImperativeHandle, useRef } from 'react';

// ref is received as second element in function (props, ref)
const ResultModal = forwardRef(function ResultModal({ result, targetTime}, ref ){
	// goal is to detach dialog from outer components for abstraction
	const dialog = useRef();

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
	
	return(
		// dialog is by default invisible;
		// open dialog programatically to get built-in backdrop
		<dialog 
			ref={dialog} 
			className="result-modal"
		>
			<h2>Your {result}</h2>
			<p>The target time was <strong>{targetTime} seconds</strong></p>
			<p>You stopped the timer with <strong>X seconds left</strong></p>
			{/* method=dialog makes button close dialog automatically*/}
			<form method="dialog">
				<button>Close</button>
			</form>
		</dialog>
	)
});

export default ResultModal;