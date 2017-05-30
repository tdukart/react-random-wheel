import React from 'react';
import ReactDOM from 'react-dom';
import RandomWheel from '../src/index';

const App = () => {
	const segments = [
		{
			name: 'Red',
			color: 'red'
		},
		{
			name: 'Green',
			color: 'green'
		},
		{
			name: 'Blue',
			color: 'blue'
		},
	];

	let wheel;

	const onSpinClick = () => {
		wheel.spinWheel();
	};
	const onSpinComplete = ( result ) => {
		console.log( 'spin complete', result );
	};

	return (
		<div>
			<RandomWheel
				segments={segments}
				onComplete={onSpinComplete}
				ref={( wheelRef ) => {
					wheel = wheelRef;
				}}
			/>
			<button onClick={onSpinClick}>
				Spin
			</button>
		</div>
	);
};

const init = () => {
	const appRoot = document.createElement( 'div' );
	document.body.appendChild( appRoot );

	ReactDOM.render(
		<App/>,
		appRoot
	)
};

init();
