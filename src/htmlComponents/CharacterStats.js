import React from 'react';

/**
 * CharacterStats Objects act as a block of elements contained within a <div> which
 * displays all the stats in the provided stats property
 *
 * A CharacterStats Object requires as props to the React.Component
 *	@stats		- an object of stat:value pairs
 *	@onClick	- an optional property that specifies a stat is modifiable and on modifying uses the attached function
 */
class CharacterStats extends React.Component {
	/**
	 * creates a <span> element containing two <button> elements framing another <span> element
	 * the leftmost button is used to reduce the value of the stat while the rightmost button increase it
	 * the <span> contains the stat value
	 */
	numberControl (value, reduceStatFunc, increaseStatFunc) {
		return (
			<span>
				<button onClick={reduceStatFunc}>-</button>
				<span className='labelValue'>{value}</span>
				<button onClick={increaseStatFunc}>+</button>
			</span>
		);
	}

	/**
	 * renders a <div> element containing a number of <p> elements
	 * if the props.onClick property is set the <p> elements contain the results of
	 * the numberControl function for each stat
	 *
	 * if props.onClick is not set, each <p> element contains two <span> elements
	 * the first <span> contains the stat name, and the second the stat value
	 */
	render () {
		var statDetails = [];
		for (var key in this.props.stats) {
			if (this.props.stats.hasOwnProperty(key)) {
				if (this.props.onClick !== undefined) {
					statDetails.push(
						<p key={key}>
							<span className='labelTag'>{key}:</span>
							{
								this.numberControl(
									this.props.stats[key],
									this.props.onClick.bind(null, key, '-'),
									this.props.onClick.bind(null, key, '+')
								)
							}
						</p>
					)
				}
				else {
					statDetails.push(
						<p key={key}>
							<span className='labelTag'>{key}:</span>
							<span className='labelValue'>{this.props.stats[key]}</span>
						</p>
					)
				}
			}
		}

		return (
			<div>
				{statDetails}
			</div>
		);
	}
}

export { CharacterStats }