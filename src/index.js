import React from 'react';
import PropTypes from 'prop-types';
import Wheel from './components/Wheel';
import Easing from 'easing';
import random from 'lodash.random';

import './styles/react-wheel.scss';

export default class ReactWheel extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			activeSegment: false
		};
	}

	static get defaultProps() {
		return {
			spinTime: 2500,
			onComplete: ( result ) => {
			}
		}
	}

	static get propTypes() {
		let segmentType = PropTypes.shape( {
			name: PropTypes.string.isRequired,
			color: PropTypes.oneOf( [ 'red', 'blue', 'green' ] ),
			data: PropTypes.object,
		} );

		return {
			segments: PropTypes.arrayOf( segmentType ).isRequired,
			spinTime: PropTypes.number,
			onComplete: PropTypes.func,
		}
	}

	spinWheel() {
		let numSegments = this.props.segments.length;

		this.setState( {
			animating: true
		} );

		let currentValue = this.state.activeSegment || 0;

		// We'll want to run the animation through approximately five cycles.
		let cycles = random( 4, 6, false );

		let numSteps = (cycles * numSegments) + (random( 0, numSegments - 1, false ));
		let easing = Easing( numSteps, 'quadratic' );

		let easedValues = easing.map( ( fraction, index ) => {
			return {
				segment: (currentValue + index) % numSegments,
				time: fraction * this.props.spinTime,
			}
		} );
		let finalValue = easedValues[ easedValues.length - 1 ].segment;

		if ( 'development' === process.env.NODE_ENV ) {
			console.log( `easing through ${numSteps} steps to ${finalValue}`, JSON.stringify( easedValues ) );
		}

		easedValues.forEach( ( { segment, time } ) => {
			setTimeout( () => {
				this.setState( { activeSegment: segment } )
			}, time )
		} );

		// Flash the final segment.
		for ( let i = 0; i < 3; i++ ) {
			let flashTime = (this.props.spinTime / 10);
			setTimeout( () => {
				this.setState( {
					activeSegment: false
				} );
			}, this.props.spinTime + i * flashTime );
			setTimeout( () => {
				this.setState( {
					activeSegment: finalValue,
					animating: (i !== 2)
				} );
				if ( i === 2 ) {
					this.props.onComplete( this.props.segments[ finalValue ] );
				}
			}, this.props.spinTime + i * flashTime + flashTime / 2 );
		}

		return finalValue;
	}

	render() {
		return (
			<div>
				<RandomWheel {...this.props} activeSegment={this.state.activeSegment}/>
			</div>
		);
	}
}
