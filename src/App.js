import React from 'react';
import logo from './digivice.png';
import './App.css';

import { DigimonPane } from './js/DigimonPane.js';
import { DigimonSizes } from './js/DigimonData.js';
import { DigimonStages } from './js/DigimonData.js';
import { RibbonMenu } from './js/HtmlComponents.js';

let FileSaver = require('file-saver');
let Digimon = require('./js/Digimon.js');

/**
 * Container Class for the Project
 */
class App extends React.Component {
	/**		
	 * Sets title and builds state
	 *
	 * state.characters - array of Digimon and Human objects
	 * state.selectedIndex - index of state.characters which is active
	 */
	constructor (props) {
		super(props);

		document.title = 'DDA v1.2 Builder'

		let newDigimon = Digimon.createDigimon('Fresh', 'Botamon');
		
		this.state = {
			characters: [],
			selectedIndex: 0
		}
	}

	/**
	 * Adds event listeners to modal buttons and window for showing/hiding modal divs
	 */
	componentDidMount () {
		let addHumanModal = document.getElementById('addHumanModal');
		document.getElementById('addHumanButton').onclick = function() {
			addHumanModal.classList.remove('hidden');
		}

		let addDigimonModal = document.getElementById('addDigimonModal');
		document.getElementById('addDigimonButton').onclick = function() {
			addDigimonModal.classList.remove('hidden');
		}

		// When the user clicks anywhere outside of the modal, close it
		window.addEventListener('click', function (event){
			switch (event.target.id) {
				case 'addHumanModal':
					addHumanModal.classList.add('hidden');
					break;
				case 'addDigimonModal':
					addDigimonModal.classList.add('hidden');
					break;
				default:
			}			
		});
	}

	/**
	 * Creates and adds a new Human to the state.characters array
	 */
	addHuman () {
		console.log('Adding a human!');
	}

	/**
	 * Creates and adds a new Digimon to the state.characters array
	 */
	addDigimon () {
		// get Digimon name
		let digimonNameInput = document.getElementById('addDigimonName');
		let digimonName = digimonNameInput.value.trim();

		if (digimonName.length) {
			// if the name is set, get the stage and create a Digimon object
			let digimonStageSelect = document.getElementById('addDigimonStage');
			let digimonStage = digimonStageSelect.options[digimonStageSelect.selectedIndex].value;
			let newDigimon = Digimon.createDigimon(digimonStage, digimonName);

			// update the state with the new Digimon
			let updatedCharacters = this.state.characters.concat([newDigimon]);
			this.setState({
				characters: updatedCharacters,
				selectedIndex: updatedCharacters.length-1
			});

			// Reset the Digimon name and stage fields
			digimonNameInput.value = '';
			digimonStageSelect.selectedIndex = 0;

			// hide the Add Digimon Modal
			document.getElementById('addDigimonModal').classList.add('hidden');
		}
	}

	/**
	 * Swaps the active character when the element the changePane function is bound to is clicked
	 * or removes the character if the removeFlag is true
	 */
	changePane (index, removeFlag = false, event) {
		if (removeFlag) {
			// get the state.characters array and remove the character specified by the index of the clicked button from it
			let characterList = this.state.characters;
			let updatedCharacters = characterList.filter(function(character) { return character !== characterList[index] });

			// TODO: WHY IS SPLICE BROKEN
			//let updatedCharacters = characterList.splice(index, 1);

			let updatedIndex = this.state.selectedIndex !== 0 ? this.state.selectedIndex-1 : 0;

			this.setState({
				characters: updatedCharacters,
				selectedIndex: updatedIndex
			});
		} else {
			// changes to the character specified by the index property
			this.state.characters[index].onSwapTo();

			this.setState({
				selectedIndex: index
			});
		}
	}

	saveCharacter () {
		let currentCharacter = this.state.characters[this.state.selectedIndex];

		let characterName = currentCharacter.toString();
		let characterJSON = currentCharacter.saveToJSON();
		let characterBlob = new Blob([characterJSON], {type: "text/plain;charset=utf-8"});

		FileSaver.saveAs(characterBlob, characterName + ".json");
	}

	openCharacter () {
		let openCharacterInput = document.getElementById('openCharacterInput');
		openCharacterInput.click();
	}

	loadCharacter (event) {
		var file = event.target.files[0];
		if (!file) {
			return;
		}

		var reader = new FileReader();

		reader.onload = (function(app) {
			return function (event) {
				try {
					var contents = event.target.result;
					let characterObject = JSON.parse(contents);
					let characterClass = characterObject.class;
					switch (characterClass) {
						case 'Digimon':
							let newDigimon = Digimon.createDigimon(characterObject.stage, characterObject.name);
							newDigimon.loadFromJSON(characterObject);

							// update the state with the new Digimon
							let updatedCharacters = app.state.characters.concat([newDigimon]);
							app.setState({
								characters: updatedCharacters,
								selectedIndex: updatedCharacters.length-1
							});
							break;
						case 'Human':
							break;
						default:
					}
				} catch (event) {
					alert(event);
				}
			};
		})(this);

		reader.readAsText(file);
	}

	render () {
		// digimonStageSelect is used to choose a Digimon Stage in the add Digimon Modal
		let digimonStageSelect = [];
		for (let digimonStage in DigimonStages) {
			digimonStageSelect.push(<option key={digimonStage} value={digimonStage}>{digimonStage}</option>)
		}

		// ribbonCharacters is an array of all character names used to popular the Character Select Ribbon
		let ribbonCharacters = [];
		for (let index in this.state.characters) {
			ribbonCharacters.push(this.state.characters[index].toString());
		}

		return (
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo-still' alt='logo' />
					<h1 className='App-title'>Digimon Digital Adventures v1.2 Character Builder</h1>
				</header>

				<div id='addHumanModal' className='modal hidden'>
					<div className='appModal-content'>
						<h3>Add Human</h3>
						<label htmlFor='humanName'>Name: </label>
						<input id='humanName' type='text'></input>
					</div>
				</div>

				<div id='addDigimonModal' className='modal hidden'>
					<div className='appModal-content'>
						<h3>Add Digimon</h3>
						<label htmlFor='addDigimonName'>Name: </label>
						<input id='addDigimonName' type='text'></input>
						<br/><br/>
						<label htmlFor='addDigimonStage'>Stage: </label>
						<select id='addDigimonStage' className='labelInput'>
							{digimonStageSelect}
						</select>
						<br/><br/>
						<button type='button' onClick={this.addDigimon.bind(this)}>Create!</button>
					</div>
				</div>

				<hr/>
				<div className='addCharacterButtons'>
					<button id='addHumanButton' type='button'>Add Human</button>
					<button id='addDigimonButton' type='button'>Add Digimon</button>
					<button className='floatRight' onClick={this.saveCharacter.bind(this)}>Save Character</button>
					<button className='floatRight' onClick={this.openCharacter.bind(this)}>Load Character</button>
					<input className='hidden' type='file' id='openCharacterInput' onChange={this.loadCharacter.bind(this)} />
				</div>
				<hr/>

				<RibbonMenu
					id='characterRibbon'
					values={ribbonCharacters}
					selectedIndex={this.state.selectedIndex}
					onClick={this.changePane.bind(this)}
				/>

				<div className='pane'>
					{this.getPane()}
				</div>

				{this.getDebug()}
			</div>
		);
	}

	/**
	 * Builds a debug pane depending on the active character and returns it to the render method
	 */
	getDebug () {
		let currentCharacter = this.state.characters[this.state.selectedIndex];
		if (currentCharacter !== undefined && typeof currentCharacter.getClass === 'function') {
			switch (currentCharacter.getClass()) {
				case 'Digimon': return <DigimonDebug digimon={currentCharacter} />;
				default: alert(currentCharacter.getClass() + " not defined.");
			}
		}
		return '';
	}

	/**
	 * Builds a character pane depending on the active character and returns it to the render method
	 */
	getPane () {
		let currentCharacter = this.state.characters[this.state.selectedIndex];
		if (currentCharacter !== undefined && typeof currentCharacter.getClass === 'function') {
			switch (currentCharacter.getClass()) {
				case 'Digimon': return <DigimonPane digimon={currentCharacter} />;
				default: alert(currentCharacter.getClass() + " not defined.");
			}
		}
		return '';
	}
}

/** Debug Code **/
class DigimonDebug extends React.Component {
	/**
	 * Refreshes debug every half second to update debug display
	 */
	componentDidMount () {
		setInterval(() => {
			this.setState(() => {
				return { unseen: 'does not display' }
			});
		}, 500);
	}

	render () {
		var stage = this.props.digimon.getProperty('stage');
		var sizeIndex = this.props.digimon.getProperty('sizeIndex');
		var stageStats = DigimonStages[stage];
		var sizeStats = DigimonSizes[sizeIndex];

		return (
			<div className='pane' id='debugPane'>
				<h3>Stat Calculations (Round Down Always)</h3>
				<ul>
					<li><b>Wound Boxes:</b> Health + Stage Bonus</li>
					<li><b>Agility:</b> (Accuracy + Dodge)/2</li>
					<li><b>Body:</b> (Health + Damage + Armor)/3 + Size Bonus</li>
					<li><b>Brains:</b> Accuracy/2 + Stage Bonus</li>
					<li><b>BIT Value:</b> Brains/10 + Stage Bonus</li>
					<li><b>CPU Value:</b> Body/10 + Stage Bonus</li>
					<li><b>RAM Value:</b> Agility/10 + Stage Bonus</li>
				</ul>
				<h3>Stage Details</h3>
				<table>
					<tbody>
						<tr>
							<th>Stage</th>
							<th>Starting DP</th>
							<th>Base Movement</th>
							<th>Wound Boxes</th>
							<th>Brains</th>
							<th>Attacks</th>
							<th>Spec Values</th>
						</tr>
						<tr>
							<td className='tableRow'>{stageStats.id}</td>
							<td className='tableRow'>{stageStats.startingDP}</td>
							<td className='tableRow'>{stageStats.baseMovement}</td>
							<td className='tableRow'>{stageStats.woundBoxes}</td>
							<td className='tableRow'>{stageStats.brains}</td>
							<td className='tableRow'>{stageStats.attacks}</td>
							<td className='tableRow'>{stageStats.specValues}</td>
						</tr>
					</tbody>
				</table>
				<h3>Size Details</h3>
				<table>
					<tbody>
						<tr>
							<th>Size</th>
							<th>Area</th>
							<th>Square Meters</th>
							<th>Body Bonus</th>
							<th>Extra</th>
						</tr>
						<tr>
							<td className='tableRow'>{sizeStats.id}</td>
							<td className='tableRow'>{sizeStats.area}</td>
							<td className='tableRow'>{sizeStats.squareMeters}</td>
							<td className='tableRow'>{sizeStats.bodyBonus}</td>
							<td className='tableRow'>{sizeStats.notes}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;
