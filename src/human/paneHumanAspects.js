import React from 'react';

/**
 * HumanAspects Objects act as a div containing all of a Human's Major and Minor Aspects
 * Aspects are stored in the human object, and represented by editable text fields
 *
 * A HumanAspects Object requires as props to the React.Component
 *	@human		- the human object to manage the aspects of
 *	@updatePane	- function to call in order to update the Pane
 */

class HumanAspects extends React.Component {
	/**
	 * Adds a new major or minor aspect to the human
	 */
	addAspect (aspectType) {
		let aspectIndex = this.props.human.getProperty(aspectType).length;
		this.props.human.updateAspect(aspectType, '', aspectIndex, false);

		this.props.updatePane();
	}

	/**
	 * Updates or removes an aspect from a human
	 */
	modifyAspect (aspectType, index, removeFlag, event) {
		let aspect = event.target.value;
		this.props.human.updateAspect(aspectType, aspect, index, removeFlag);

		this.props.updatePane();
	}

	/**
	 * Detects an enter key press on the input field and runs the onBlur function for the element
	 */
	checkEnter (event) {
		if (event.key === 'Enter') {
			event.target.blur();
		}
	}

	/**
	 * Creates two lists of aspects, for major and minor, for a human
	 */
	buildAspectsList (aspectType, aspectLabel, aspectId) {
		let aspects = this.props.human.getProperty(aspectType);
		let aspectsList = [];
		for (let index in aspects) {
			aspectsList.push(
				<p key={index}>
					<span className='longTag'>{aspectLabel}</span>
					<input className='longInput' id={aspectId + index} onBlur={this.modifyAspect.bind(this, aspectType, index, false)} onKeyPress={this.checkEnter} defaultValue={aspects[index]} />&nbsp;
					<button className='roundedButton' onClick={this.modifyAspect.bind(this, aspectType, index, true)}>X</button>
				</p>
			);
		}

		return aspectsList;
	}

	render () {
		let majorAspectsList = this.buildAspectsList('majorAspects', 'Major Aspect (+4/-4):', 'aMajor_');
		let minorAspectsList = this.buildAspectsList('minorAspects', 'Minor Aspect (+2/-2):', 'aMinor_');
		return (
			<div>
				<p><u>Aspects</u></p>
				<p className='aspectButtons'>
					<button className='aspectButtons' type='button' onClick={this.addAspect.bind(this, 'majorAspects')}>Add Major Aspect</button>
					<button className='aspectButtons' type='button' onClick={this.addAspect.bind(this, 'minorAspects')}>Add Minor Aspect</button>
				</p>
				{majorAspectsList}
				{minorAspectsList}
			</div>
		);
	}
}


export { HumanAspects }