import React from 'react';

/**
 * WoundBoxes Objects act as a block of elements contained within a <div> which
 * display a series of <input> checkboxes representing the Wound Boxes of a Digimon
 *
 * A WoundBoxes Object requires as props to the React.Component
 *	@maxHealth	- an int representing the maximum number of Wound Boxes the Digimon can have
 *	@health		- an int representing the current number of Wound Boxes the Digimon has
 *	@onClick	- a function reference to the function called when each Wound Box is clicked
 */
class WoundBoxes extends React.Component {	
	/**
	 * returns an array of <input> elements of type checkbox, the array containing props.maxHealth
	 * number of woundBoxes with props.health woundBoxes checked
	 */
	generateWoundBoxes () {
		var woundBoxes = [];
		var checked = true;
		for (var i = 0; i < this.props.maxHealth; i++) {
			checked = i < this.props.health ? false : true;
			woundBoxes.push(<input key={'wound_' + i} className='woundbox' type='checkbox' checked={checked} onClick={this.props.onClick} />);

			if ((i+1)%10 === 0) {
				woundBoxes.push(<br key={'br_' + i}/>);
			}
		}

		return woundBoxes;
	}

	/**
	 * renders a <div> element containing a <p> element containing two <span> elements and a set of woundBoxes
	 */
	render () {
		var woundBoxes = this.generateWoundBoxes();

		return (
			<div>
				<p>
					<span className='labelTag'>Wound Boxes:</span> 
					<span className='labelValue'>
						{this.props.health} / {this.props.maxHealth}
					</span><br/>
					{woundBoxes}
				</p>
			</div>
		);
	}
}

export { WoundBoxes }