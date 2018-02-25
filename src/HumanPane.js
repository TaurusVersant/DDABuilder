import React from 'react';

import { HumanAspects } from './human/paneHumanAspects.js';
import { HumanTorments } from './human/paneHumanTorments.js';

import { WoundBoxes } from './htmlComponents/WoundBoxes.js';
import { CharacterStats } from './htmlComponents/CharacterStats.js';

/**
 * The HumanPane acts as the root object for displaying Human character sheets
 */
class HumanPane extends React.Component {	
	constructor (props) {
		super(props);

		this.state = {
			human: props.human,
			age: props.human.getProperty('age')
		}
	}

	/**
	 * Updates the HumanPane with a new Human object
	 */
	componentWillReceiveProps(nextProps) {
		this.setState({
			human: nextProps.human
		});

		setTimeout(() => {
			this.updateStateDetails(() => { });
		}, 100);
	}

	/**
	 * Updates all values to be displayed on the HumanPane after a Human change	
	 */
	updateStateDetails () {
		this.updateStageField(this.state.human, 'creationComplete');
		this.updateStageField(this.state.human, 'name');
		this.updateStageField(this.state.human, 'age');
		this.updateStageField(this.state.human, 'details');


		// Update Aspects
		let humanMajorAspects = this.state.human.getProperty('majorAspects');
		let humanMinorAspects = this.state.human.getProperty('minorAspects');

		for (let i = 0; i < humanMajorAspects.length; i++) {
			let majorAspect = document.getElementById('aMajor_' + i);
			if (majorAspect !== null) {
				majorAspect.value = humanMajorAspects[i];
			}
		}

		for (let i = 0; i < humanMinorAspects.length; i++) {
			let minorAspect = document.getElementById('aMinor_' + i);
			if (minorAspect !== null) {
				minorAspect.value = humanMinorAspects[i];
			}
		}
		
		// Update Torments
		let humanMinorTorments = this.state.human.getProperty('minorTorments');
		let humanMajorTorments = this.state.human.getProperty('majorTorments');
		let humanTerribleTorments = this.state.human.getProperty('terribleTorments');
		
		for (let i = 0; i < humanMinorTorments.length; i++) {
			let torment = document.getElementById('tMinor_' + i);
			if (torment !== null) {
				torment.value = humanMinorTorments[i].id;
			}
		}
		
		for (let i = 0; i < humanMajorTorments.length; i++) {
			let torment = document.getElementById('tMajor_' + i);
			if (torment !== null) {
				torment.value = humanMajorTorments[i].id;
			}
		}
		
		for (let i = 0; i < humanTerribleTorments.length; i++) {
			let torment = document.getElementById('tTerrible_' + i);
			if (torment !== null) {
				torment.value = humanTerribleTorments[i].id;
			}
		}

		this.setState({updated: 'updated'});
	}

	/**
	 * Updates a specific field on the Pane
	 */
	updateStageField (currentHuman, fieldProperty) {
		switch (fieldProperty) {
			/*case 'creationComplete':
				let creationComplete = document.getElementById('creationComplete');
				creationComplete.checked = currentHuman.flags.startingCap !== true;
				break;*/
			case 'name':
				let humanTitle = document.getElementById('humanTitle');
				humanTitle.innerHTML = currentHuman.getProperty('name');

				let humanNameField = document.getElementById('humanName');
				humanNameField.value = currentHuman.getProperty('name');
				break;
			case 'age':
				let humanAge = document.getElementById('humanAge');
				humanAge.value = currentHuman.getProperty('age');
				break;
			case 'details':
				var humanDetailsField = document.getElementById('humanDetails');
				humanDetailsField.value = currentHuman.getProperty('details');
				break;
			default:
				break;
		}
	}
	
	/**
	 * Refreshes the Pane when a field of the Human object is modified
	 */
	onHumanFieldChange (fieldProperty, fieldLocation, event) {
		var currentHuman = this.state.human;
		currentHuman.setProperty(fieldProperty, event.target[fieldLocation]);

		this.updateStageField(currentHuman, fieldProperty);
	}

	/**
	 * http://www.onlywebpro.com/2012/01/24/create-thumbnail-preview-of-images-using-html5-api/
	 *
	 * Refreshes the Pane to display an image when it is uploaded to the screen
	 */
	handleFileSelect (event) {
		var files = event.target.files;
		if (files.length > 0) {
			var f = files[0];
			var reader = new FileReader();

			reader.onload = (function(theFile, currentHuman) {
				return function(e) {
					currentHuman.setProperty('humanImage', e.target.result);
				};
			})(f, this.state.human);

			reader.readAsDataURL(f);

			setTimeout(() => {
				this.updateStateDetails(() => { });
			}, 100);
		}
	}

	/**
	 * Calls the modifyCreationPoints function with the increaseFlag attached on the current Human
	 */
	modifyCreationPoints (increaseFlag) {
		this.state.human.modifyCreationPoints(increaseFlag);

		setTimeout(() => {
			this.updateStateDetails(() => { });
		}, 50);
	}

	/**
	 * Refreshes the Pane when a stat of the current Human is modified
	 */
	onHumanStatChange (statFunction, statName, statChange, event) {
		this.state.human[statFunction](statName, statChange);

		setTimeout(() => {
			this.updateStateDetails(() => { });
		}, 100);
	}
	
	/**
	 * Refreshes the Pane when the Wound Boxes of the active Human are checked
	 */
	updateWounds (event) {
		this.state.human.changeHealth(event.target.checked);

		setTimeout(() => {
			this.updateStateDetails(() => { });
		}, 100);
	}

	/**
	 * Updates the 
	 */
	completeCreation (event) {
		this.state.human.completeCreation(event.target.checked);
	}

	render () {
		return (
			<div>
				<h1 id='humanTitle'>{this.state.human.getProperty('name')}</h1>
				<div className='divRow'>
					<div className='firstColumn'>
						<p>
							<span className='labelTag'>Creation Points:</span>
							<button onClick={this.modifyCreationPoints.bind(this, false)}>-</button>
							<span className='labelValue'>
								{this.state.human.getProperty('creationPoints')}
								/
								{this.state.human.getProperty('totalCreationPoints')}
							</span>
							<button onClick={this.modifyCreationPoints.bind(this, true)}>+</button>
						</p>
						<p>
							<span className='labelTag'>Creation Complete:</span>
							<input className='labelCheckbox' id='creationComplete' type='checkbox' onClick={this.completeCreation.bind(this)} />
						</p>
						<p><u>Details</u></p>
						<p>
							<span className='labelTag'>Name:</span>
							<input className='labelInput' id='humanName'
								defaultValue={this.state.human.getProperty('name')}
								onBlur={this.onHumanFieldChange.bind(this, 'name', 'value')} />
						</p>
						<p>
							<span className='labelTag'>Age Group:</span>
							<input readOnly='true' className='labelInput' id='humanAge'
								defaultValue={this.state.human.getProperty('age')} />
						</p>
					</div>

					<div className='secondColumn'>
						<p><u>Human Picture</u></p>
						<input type='file' id='files' onChange={this.handleFileSelect.bind(this)} />
						<br/>
						<img className='characterImage' alt='' id='humanImage' src={this.state.human.getProperty('humanImage')} />
					</div>
				</div>

				<WoundBoxes
					health={this.state.human.getProperty('woundBoxes')}
					maxHealth={this.state.human.getWoundBoxesStat()}
					onClick={this.updateWounds.bind(this)}
				/>

				<div className='divRow'>
					<div className='firstColumn'>
						<p><u>Attributes</u></p>
						<CharacterStats
							stats={this.state.human.getProperty('attributes')}
							onClick={this.onHumanStatChange.bind(this, 'changeAttribute')}
						/>

						<p><u>Derived Stats</u></p>
						<CharacterStats stats={this.state.human.getProperty('derivedStats')} />

						<p><u>Special Stats</u></p>
						<p>
							<span className='labelTag'>Sanity Drain:</span>
							<button onClick={this.onHumanStatChange.bind(this, 'changeSpecialStat', 'sanityDrain', '-')}>-</button>
							<span className='labelValue'>
								{this.state.human.getProperty('sanityDrain')}
								/
								{this.state.human.getSanityDrainCap()}
							</span>
							<button onClick={this.onHumanStatChange.bind(this, 'changeSpecialStat', 'sanityDrain', '+')}>+</button>
						</p>
						<p>
							<span className='labelTag'>Inspiration:</span>
							<button onClick={this.onHumanStatChange.bind(this, 'changeSpecialStat', 'inspiration', '-')}>-</button>
							<span className='labelValue'>
								{this.state.human.getProperty('inspiration')}
								/
								{this.state.human.getInspirationCap()}
							</span>
							<button onClick={this.onHumanStatChange.bind(this, 'changeSpecialStat', 'inspiration', '+')}>+</button>
						</p>
					</div>

					<div className='secondColumn'>
						<p><u>Skills</u></p>
						<CharacterStats
							stats={this.state.human.getProperty('skills')}
							onClick={this.onHumanStatChange.bind(this, 'changeSkill')}
						/>
					</div>
				</div>

				<HumanAspects human={this.state.human} updatePane={this.updateStateDetails.bind(this)} />

				<HumanTorments human={this.state.human} updatePane={this.updateStateDetails.bind(this)} />
				<div>
					<p><u>Additional Details</u></p>
					<textarea className='detailsTextArea' id='humanDetails'
						defaultValue={this.state.human.getProperty('details')}
						onBlur={this.onHumanFieldChange.bind(this, 'details', 'value')} />
				</div>
			</div>
		);
	}
}

export { HumanPane }