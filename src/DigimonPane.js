import React from 'react';

import { FamilySelect } from './digimon/paneFamilySelect.js';
import { TypeInput } from './digimon/paneTypeInput.js';
import { WoundBoxes } from './digimon/paneWoundBoxes.js';
import { DigimonStats } from './digimon/paneDigimonStats.js';
import { DigimonQualityList } from './digimon/paneDigimonQualityList.js';
import { DigimonAttackList } from './digimon/paneDigimonAttackList.js';

import { ArraySelect } from './htmlComponents/ArraySelect.js';
import { TableDetails } from './htmlComponents/TableDetails.js';

var DigimonData = require('./digimon/DigimonData.js');

/**
 * The DigimonPane acts as the root object for displaying Digimon character sheets
 */
class DigimonPane extends React.Component {	
	constructor (props) {
		super(props);

		this.state = {
			digimon: props.digimon,
			stage: props.digimon.getProperty('stage'),
			sizeIndex: 0
		}
	}

	/**
	 * Updates the DigimonPane with a new Digimon object
	 */
	componentWillReceiveProps(nextProps) {
		this.setState({
			digimon: nextProps.digimon
		});

		setTimeout(() => {
			this.updateStateDetails(() => { });
		}, 100);
	}

	/**
	 * Updates all values to be displayed on the DigimonPane after a Digimon change	
	 */
	updateStateDetails () {
		// Update Fields
		this.updateStageField(this.state.digimon, 'name');
		this.updateStageField(this.state.digimon, 'stage');
		this.updateStageField(this.state.digimon, 'attributeIndex');
		this.updateStageField(this.state.digimon, 'sizeIndex');
		this.updateStageField(this.state.digimon, 'details');

		// Update Attacks
		let digimonAttacks = this.state.digimon.getProperty('attacks');
		for (let i = 0; i < digimonAttacks.length; i++) {
			let aName = document.getElementById('aName_' + i);
			aName.value = digimonAttacks[i].name;
			aName.disabled = false;

			let aType = document.getElementById('aType_' + i);
			aType.value = digimonAttacks[i].type;
			aType.disabled = false;

			let aDamage = document.getElementById('aDamage_' + i);
			aDamage.checked = digimonAttacks[i].damage;
			aDamage.disabled = false;

			document.getElementById('aSelectTag_' + i).disabled = false;
		}
	}
	
	/**
 	 * Callback function passed to the DigimonAttackList, used to update properties of attacks
	 */
	onModifyAttack (property, index, event) {
		let attackRow = event.target.parentElement.parentElement;
		for (let i = 0; i < attackRow.children.length; i++) {
			if (attackRow.children[i].firstChild.nodeName !== 'BUTTON') {
				attackRow.children[i].firstChild.disabled = true;
			}
		}

		let attacks = this.state.digimon.getProperty('attacks');

		switch (property) {
			case 'name':
				attacks[index][property] = event.target.value;
				break;
			case 'type':
				attacks[index][property] = event.target[event.target.selectedIndex].value;
				break;
			case 'tags':
				if (event.target.nodeName === 'BUTTON' && event.target.className === 'roundedButton') {
					let tagName = event.target.parentElement.lastChild.innerHTML;
					this.state.digimon.applyAttackTag(index, tagName, true);
				} else {
					let tagName = event.target[event.target.selectedIndex].value;
					this.state.digimon.applyAttackTag(index, tagName, false);

					let aSelectTag = document.getElementById('aSelectTag_' + index);
					aSelectTag.selectedIndex = 0;
				}
				break;
			case 'damage':
				attacks[index][property] = event.target.checked;
				break;
			default:
		}

		setTimeout(() => {
			this.updateStateDetails(() => { });
		}, 100);
	}

	/**
	 * Updates a specific field on the Pane
	 */
	updateStageField (currentDigimon, fieldProperty) {
		switch (fieldProperty) {
			case 'name':
				var digimonTitle = document.getElementById('digimonTitle');
				digimonTitle.innerHTML = currentDigimon.getProperty('name');

				var digimonNameField = document.getElementById('digimonName');
				digimonNameField.value = currentDigimon.getProperty('name');
				break;
			case 'stage':
				var digimonStage = document.getElementById('digimonStage');
				digimonStage.value = currentDigimon.getProperty('stage');
				break;
			case 'attributeIndex':
				var digimonAttributeField = document.getElementById('digimonAttribute');
				digimonAttributeField.selectedIndex = currentDigimon.getProperty('attributeIndex');
				break;
			case 'sizeIndex':
				var digimonSizeField = document.getElementById('digimonSize');
				var sizeIndex = currentDigimon.getProperty('sizeIndex')
				digimonSizeField.selectedIndex = sizeIndex;
				this.setState({sizeIndex: sizeIndex});
				break;
			case 'details':
				var digimonDetailsField = document.getElementById('digimonDetails');
				digimonDetailsField.value = currentDigimon.getProperty('details');
				break;
			default:
				break;
		}
	}
	
	/**
	 * Refreshes the Pane when a field of the Digimon object active in the DigimonLine is modified
	 */
	onDigimonStageFieldChange (fieldProperty, fieldLocation, event) {
		var currentDigimon = this.state.digimon;
		currentDigimon.setProperty(fieldProperty, event.target[fieldLocation]);

		this.updateStageField(currentDigimon, fieldProperty);
	}
	
	/**
	 * Refreshes the Pane when a stat of the Digimon object active in the DigimonLine is modified
	 */
	onDigimonStatChange (statName, statChange, event) {
		this.state.digimon.changeStat(statName, statChange);

		setTimeout(() => {
			this.updateStateDetails(() => { });
		}, 100);
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

			reader.onload = (function(theFile, currentDigimon) {
				return function(e) {
					currentDigimon.setProperty('digimonImage', e.target.result);
				};
			})(f, this.state.digimon);

			reader.readAsDataURL(f);

			setTimeout(() => {
				this.updateStateDetails(() => { });
			}, 100);
		}
	}
	
	/**
	 * Refreshes the Pane when the Wound Boxes of the active Digimon are checked
	 */
	updateWounds (event) {
		this.state.digimon.changeHealth(event.target.checked);

		setTimeout(() => {
			this.updateStateDetails(() => { });
		}, 100);
	}
	
	/**
	 * Refreshes the Pane when the active Digimon either has a Family added or removed
	 */
	onFamilySelectChange (selectText, removeName, addText, event) {
		if (removeName !== false) {
			this.state.digimon.setStageArrayProperty('digimonFamilies', removeName, true);

			setTimeout(() => {
				this.updateStateDetails(() => { });
			}, 100);
		}
		else {
			var selectedIndex = event.target.selectedIndex;
			var selectedOption = event.target.options[selectedIndex];
			event.target.selectedIndex = 0;

			if (selectedOption.value !== selectText && selectedOption.value !== '') {
				var familyName = selectedOption.value;

				if (familyName === addText) {
					familyName = window.prompt('Please enter a new Family', '');
				}

				if (familyName !== null) {
					this.state.digimon.setStageArrayProperty('digimonFamilies', familyName, false);

					setTimeout(() => {
						this.updateStateDetails(() => { });
					}, 100);
				}
			}
		}
	}
	
	/**
	 * Refreshes the Pane when the active Digimon either has a Type added or removed
	 */
	onTypeChange (defaultText, removeName, event) {
		var inputType = event.target.value;
		event.target.value = defaultText;

		if (removeName !== false) {
			this.state.digimon.setStageArrayProperty('digimonTypes', removeName, true);

			setTimeout(() => {
				this.updateStateDetails(() => { });
			}, 100);
		}
		else if (inputType !== '') {
			this.state.digimon.setStageArrayProperty('digimonTypes', inputType, false);

			setTimeout(() => {
				this.updateStateDetails(() => { });
			}, 100);
		}
	}

	/**
	 * Callback function when a Quality is purchased or removed, ensuring it can be modified and raising an alert if not
	 */
	onPurchaseQuality (quality, qualityObject, removeFlag, event) {
		if (removeFlag === true) {
			let err = this.state.digimon.purchaseQuality(quality, qualityObject, removeFlag);
			if (err !== null && err !== false) {
				alert(err);
			}
			else {			
				setTimeout(() => {
					this.updateStateDetails(() => { });
				}, 100);
			}
		}
		else {
			let err = this.state.digimon.purchaseQuality(quality, qualityObject, removeFlag);

			if (err === null) {
				document.getElementById('digimonQualityPane').classList.add('hidden');
				document.getElementById('digimonQualityAdvancedPane').classList.add('hidden');
				document.getElementById('digimonQualityDigizoidPane').classList.add('hidden');
			}
			else {
				alert(err);
			}
			
			setTimeout(() => {
				this.updateStateDetails(() => { });
			}, 100);
		}

	}

	/**
	 * Calls the modifyDigiPoints function with the increaseFlag attached on the current active Digimon
	 */
	modifyDigiPoints (increaseFlag) {
		this.state.digimon.modifyDigiPoints(increaseFlag);

		setTimeout(() => {
			this.updateStateDetails(() => { });
		}, 50);
	}

	/**
	 * Calls the modifyBurstIndex function with the increaseFlag attached on the current active Digimon
	 */
	modifyBurstIndex (increaseFlag) {
		this.state.digimon.modifyBurstIndex(increaseFlag);

		setTimeout(() => {
			this.updateStateDetails(() => { });
		}, 50);
	}

	render () {
		let burstLevels = '';
		let burstIndex = this.state.digimon.getProperty('burstIndex');
		if (Number.isInteger(burstIndex)) {
			burstLevels = (
				<p>
					<span className='labelTag'>Burst Level:</span>
					<button onClick={this.modifyBurstIndex.bind(this, false)}>-</button>
					<span className='labelValue'>{burstIndex}</span>
					<button onClick={this.modifyBurstIndex.bind(this, true)}>+</button>
				</p>
			);
		}

		return (
			<div>
				<h1 id='digimonTitle'>{this.state.digimon.getProperty('name')}</h1>
				<div className='divRow'>
					<div className='firstColumn'>
						<p>
							<span className='labelTag'>Stage:</span>
							<input readOnly='true' className='labelInput' id='digimonStage'
								defaultValue={this.state.digimon.getProperty('stage')} />
						</p>
						<p>
							<span className='labelTag'>Digi-Points:</span>
							<button onClick={this.modifyDigiPoints.bind(this, false)}>-</button>
							<span className='labelValue'>
								{this.state.digimon.getProperty('digiPoints')}
								/
								{this.state.digimon.getProperty('totalDigiPoints')}
							</span>
							<button onClick={this.modifyDigiPoints.bind(this, true)}>+</button>
						</p>
						{burstLevels}
						<br/>
						<p><u>Details</u></p>
						<p>
							<span className='labelTag'>Name:</span>
							<input className='labelInput' id='digimonName'
								defaultValue={this.state.digimon.getProperty('name')}
								onBlur={this.onDigimonStageFieldChange.bind(this, 'name', 'value')} />
						</p>

						<ArraySelect values={DigimonData.DigimonAttributes} id='digimonAttribute' tag='Attribute:'
							defaultValue={DigimonData.DigimonAttributes[this.state.digimon.getProperty('attributeIndex')]}
							onChange={this.onDigimonStageFieldChange.bind(this, 'attributeIndex', 'selectedIndex')} />

						<FamilySelect values={DigimonData.DigimonFamilies} id='digimonFamilies' tag='Family:'
							outputList={this.state.digimon.getProperty('digimonFamilies')}
							onChange={this.onFamilySelectChange.bind(this)} />

						<TypeInput id='digimonType' tag='Type:'
							outputList={this.state.digimon.getProperty('digimonTypes')}
							onChange={this.onTypeChange.bind(this)} />

						<ArraySelect values={DigimonData.DigimonSizes} id='digimonSize' tag='Size:'
							defaultValue={DigimonData.DigimonSizes[this.state.digimon.getProperty('sizeIndex')]}
							onChange={this.onDigimonStageFieldChange.bind(this, 'sizeIndex', 'selectedIndex')} />
					</div>

					<div className='secondColumn'>
						<p><u>Digimon Picture</u></p>
						<input type='file' id='files' onChange={this.handleFileSelect.bind(this)} />
						<br/>
						<img className='characterImage' alt='' src={this.state.digimon.getProperty('digimonImage')} />
					</div>
				</div>

				<WoundBoxes
					health={this.state.digimon.getProperty('woundBoxes')}
					maxHealth={this.state.digimon.getWoundBoxesStat()}
					onClick={this.updateWounds.bind(this)}
				/>

				<div className='divRow'>
					<div className='firstColumn'>
						<p><u>Movement</u></p>
						<TableDetails
							values={this.state.digimon.getProperty('movementDetails')} />

						<p><u>Stats</u></p>
						<DigimonStats
							stats={this.state.digimon.getProperty('stats')}
							onClick={this.onDigimonStatChange.bind(this)}
						/>
					</div>
					<div className='secondColumn'>
						<p><u>Derived Stats</u></p>
						<DigimonStats stats={this.state.digimon.getProperty('derivedStats')} />
						<p><u>Spec Stats</u></p>
						<DigimonStats stats={this.state.digimon.getProperty('specValues')} />
					</div>
				</div>

				<DigimonQualityList 
					values={this.state.digimon.getProperty('qualities')}
					ranks={this.state.digimon.getProperty('qualityRanks')}
					flags={this.state.digimon.getProperty('qualityFlags')}
					stage={this.state.digimon.getProperty('stage')}
					onClick={this.onPurchaseQuality.bind(this)} />

				<DigimonAttackList
					stage={this.state.digimon.getProperty('stage')}
					attacks={this.state.digimon.getProperty('attacks')}
					tags={this.state.digimon.getProperty('attackTags')}
					flags={this.state.digimon.getProperty('qualityFlags')}
					onChange={this.onModifyAttack.bind(this)} />

				<div>
					<p><u>Additional Details</u></p>
					<textarea className='detailsTextArea' id='digimonDetails'
						defaultValue={this.state.digimon.getProperty('details')}
						onBlur={this.onDigimonStageFieldChange.bind(this, 'details', 'value')} />
				</div>
			</div>
		);
	}
}

export { DigimonPane }