import React from 'react';

let HumanData = require('./HumanData.js');
let HumanTormentData = HumanData.HumanTorments;

/**
 * A Component that creates and manages all three forms of a Human's torments, Minor, Major, and Terrible
 */
class HumanTorments extends React.Component {
	/**
	 * Adds a new torment to the human
	 */
	addTorment (tormentType) {
		let tormentIndex = this.props.human.getProperty(tormentType).length;
		this.props.human.updateTorment(tormentType, '', tormentIndex, false);

		this.props.updatePane();
	}

	/**
	 * Updates or removes an torment from a human
	 */
	modifyTorment (tormentType, index, removeFlag, event) {
		let torment = event.target.value;
		this.props.human.updateTorment(tormentType, torment, index, removeFlag);

		this.props.updatePane();
	}
	
	/**
	 * Refreshes the Pane when a Torment Box of the active Human is checked
	 */
	checkTorment (torment, index, event) {
		this.props.human.checkTorment(torment, index, event.target.checked);

		this.props.updatePane();
	}

	/**
	 * Builds a list of a character's torments for display and modification
	 */
	buildTormentsList (tormentType, tormentLabel, tormentId) {
		let torments = this.props.human.getProperty(tormentType);
		let tormentsList = [];
		let tormentBoxesCount = HumanTormentData[tormentType].boxes;

		for (let index in torments) {
			tormentsList.push(
				<div key={index}>
					<span className='textareaLabelTag'>{tormentLabel}</span>
					<textarea className='tormentTextArea' id={tormentId + index} onBlur={this.modifyTorment.bind(this, tormentType, index, false)} defaultValue={torments[index].id} />
					<button className='textareaRoundedButton' onClick={this.modifyTorment.bind(this, tormentType, index, true)}>X</button>
					<div className='tormentBoxes'>
						{this.generateTormentBoxes(tormentType, index, torments[index].checked, tormentBoxesCount)}
					</div>
				</div>
			);
		}

		return tormentsList;
	}

	/**
	 * returns an array of <input> elements of type checkbox, the array containing a number of checkboxes
	 * relative to the torment with which it is associated
	 */
	generateTormentBoxes (tormentType, index, tormentBoxesChecked, tormentBoxesCount) {
		var tormentBoxes = [];
		var checked = true;

		for (var i = 0; i < tormentBoxesCount; i++) {
			checked = i < tormentBoxesChecked ? true : false;
			tormentBoxes.push(<input key={'torment_' + i} className='tormentbox' type='checkbox' checked={checked} onClick={this.checkTorment.bind(this, tormentType, index)} />);
		}

		return tormentBoxes;
	}

	render () {
		let minorTormentList = this.buildTormentsList('minorTorments', 'Minor Torment:', 'tMinor_');
		let majorTormentList = this.buildTormentsList('majorTorments', 'Major Torment:', 'tMajor_');
		let terribleTormentList = this.buildTormentsList('terribleTorments', 'Terrible Torment:', 'tTerrible_');

		return (
			<div>
				<p><u>Torments</u></p>
				<p className='aspectButtons'>
					<button className='aspectButtons' type='button' onClick={this.addTorment.bind(this, 'minorTorments')}>Add Minor Torment</button>
					<button className='aspectButtons' type='button' onClick={this.addTorment.bind(this, 'majorTorments')}>Add Major Torment</button>
					<button className='aspectButtons' type='button' onClick={this.addTorment.bind(this, 'terribleTorments')}>Add Terrible Torment</button>
				</p>
				{minorTormentList}
				{majorTormentList}
				{terribleTormentList}
			</div>
		);
	}
}

export { HumanTorments }