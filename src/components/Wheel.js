import React from 'react';

class RandomWheel extends React.Component {
	constructor( props ) {
		super( props );
	}

	static get defaultProps() {
		return {
			segments: [],
			activeSegment: false
		}
	}

	render() {
		let activeSegment = null;
		if ( this.props.activeSegment !== false ) {
			if ( 0 === this.props.segments.length ) {
				activeSegment = 0;
			} else {
				activeSegment = this.props.activeSegment % this.props.segments.length;
			}
		}

		let colorCycle = [ 'red', 'blue' ];

		let segments = this.props.segments.map( ( segment, index ) => {
			let classes = [ 'random-wheel__segment' ];
			if ( activeSegment === index ) {
				classes.push( 'random-wheel__segment--active' );
			}
			if ( segment.color ) {
				classes.push( segment.color );
			} else {
				classes.push( colorCycle[ index % colorCycle.length ] );
			}
			return (
				<div className={classes.join( ' ' )} key={`segment-${index}`}>
					{segment.name}
				</div>
			)
		} );

		return (
			<div className="random-wheel">
				<div className="random-wheel__segment-container">
					{segments}
				</div>
			</div>
		);
	}
}

export default RandomWheel;
