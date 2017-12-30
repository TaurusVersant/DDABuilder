import React from 'react';
import logo from './public/digivice.png';
import './public/App.css';

import { HumanPane } from './HumanPane.js';
import { HumanAges } from './human/HumanData.js';
import { HumanDebug } from './human/HumanDebug.js';

import { DigimonPane } from './DigimonPane.js';
import { DigimonStages } from './digimon/DigimonData.js';
import { DigimonDebug } from './digimon/DigimonDebug.js';

import { RibbonMenu } from './htmlComponents/RibbonMenu.js';

let FileSaver = require('file-saver');
let Human = require('./human/Human.js');
let Digimon = require('./digimon/Digimon.js');

//TODO: sanity
//TODO: inspiration
//TODO: torments
//TODO: aspects
//TODO: swap from create to maintain
//TODO: FAQ

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

		//let newCharacter = Digimon.createDigimon('Fresh', 'Botamon');
		let newCharacter = Human.createHuman('Child', 'Taichi');
		
		this.state = {
			characters: [newCharacter],
			digimonLines: [],
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

		let showDebugModal = document.getElementById('showDebugModal');
		document.getElementById('showDebugButton').onclick = function() {
			showDebugModal.classList.remove('hidden');
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
				case 'showDebugModal':
					showDebugModal.classList.add('hidden');
					break;
				default:
			}			
		});
	}

	/**
	 * Creates and adds a new Human to the state.characters array
	 */
	addHuman () {
		// get Human name
		let humanNameInput = document.getElementById('addHumanName');
		let humanName = humanNameInput.value.trim();

		if (humanName.length) {
			// if the name is set, get the stage and create a Human object
			let humanAgeSelect = document.getElementById('addHumanAge');
			let humanAge = humanAgeSelect.options[humanAgeSelect.selectedIndex].value;
			let newHuman = Human.createHuman(humanAge, humanName);

			// update the state with the new Human
			let updatedCharacters = this.state.characters.concat([newHuman]);
			this.setState({
				characters: updatedCharacters,
				selectedIndex: updatedCharacters.length-1
			});

			// Reset the Human name and age fields
			humanNameInput.value = '';
			humanAgeSelect.selectedIndex = 0;

			// hide the Add Human Modal
			document.getElementById('addHumanModal').classList.add('hidden');
		}
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

	/**
	 * saves the currently selected character to a file
	 */
	saveCharacter () {
		let currentCharacter = this.state.characters[this.state.selectedIndex];

		let characterName = currentCharacter.toString();
		let characterJSON = currentCharacter.saveToJSON();
		let characterBlob = new Blob([characterJSON], {type: 'text/plain;charset=utf-8'});

		FileSaver.saveAs(characterBlob, characterName + '.json');
	}

	/**
	 * saves every character on the page to a file
	 */
	saveAllCharacters () {
		let characterArray = [];

		for (let index in this.state.characters) {
			characterArray.push(this.state.characters[index].saveToJSON());
		}

		let characterBlob = new Blob([characterArray.join('\n')], {type: 'text/plain;charset=utf-8'});
		FileSaver.saveAs(characterBlob, 'characters.json');
	}

	/**
	 * onclick method for the Load Character button to open an open file input dialog
	 */
	openCharacter () {
		let openCharacterInput = document.getElementById('openCharacterInput');
		openCharacterInput.click();
	}

	/**
	 * onchange function for hidden input that takes in a file to load
	 */
	loadCharacter (event) {
		let file = event.target.files[0];
		if (!file) {
			return;
		}

		let reader = new FileReader();

		reader.onload = (function(app) {
			return function (event) {
				try {
					let contents = event.target.result.split(/[\r\n]+/);
					let updatedCharacters = app.state.characters;

					for (let index in contents) {
						let characterObject = JSON.parse(contents[index]);
						let characterClass = characterObject.class;

						switch (characterClass) {
							case 'Digimon':
								let newDigimon = Digimon.createDigimon(characterObject.stage, characterObject.name);
								newDigimon.loadFromJSON(characterObject);

								let digimonLine = newDigimon.getProperty('digimonLine');
								if (typeof digimonLine === 'string') {
									app.addNewLine(digimonLine);
								}

								// update the state with the new Digimon
								updatedCharacters = updatedCharacters.concat([newDigimon]);
								break;
							case 'Human':
								let newHuman = Human.createHuman(characterObject.age, characterObject.name);
								newHuman.loadFromJSON(characterObject);
								
								// update the state with the new Human
								updatedCharacters = updatedCharacters.concat([newHuman]);
								break;
							default:
						}
					}

					app.setState({
						characters: updatedCharacters,
						selectedIndex: updatedCharacters.length-1
					});
				} catch (event) {
					alert(event);
				}
			};
		})(this);

		reader.readAsText(file);
	}

	render () {
		// humanAgeSelect is used to choose a Human Age in the add Human Modal
		let humanAgeSelect = [];
		for (let humanAge in HumanAges) {
			humanAgeSelect.push(<option key={humanAge} value={humanAge}>{humanAge}</option>);
		}

		// digimonStageSelect is used to choose a Digimon Stage in the add Digimon Modal
		let digimonStageSelect = [];
		for (let digimonStage in DigimonStages) {
			digimonStageSelect.push(<option key={digimonStage} value={digimonStage}>{digimonStage}</option>);
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
						<label htmlFor='addHumanName'>Name: </label>
						<input id='addHumanName' type='text'></input>
						<br/><br/>
						<label htmlFor='addHumanAge'>Age: </label>
						<select id='addHumanAge' className='labelInput'>
							{humanAgeSelect}
						</select>
						<br/><br/>
						<button type='button' onClick={this.addHuman.bind(this)}>Create!</button>
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

				<div id='showDebugModal' className='modal hidden'>
					<div className='modal-content'>
						{this.getDebug()}
					</div>
				</div>

				<hr/>
				<div className='addCharacterButtons'>
					<button id='addHumanButton' type='button'>Add Human</button>
					<button id='addDigimonButton' type='button'>Add Digimon</button>
					<button className='floatRight' onClick={this.saveCharacter.bind(this)}>Save Character</button>
					<button className='floatRight' onClick={this.saveAllCharacters.bind(this)}>Save All Characters</button>
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
					<button title='Debug Information' id='showDebugButton' className='debugButton roundedButton'>?</button>
					{this.getPane()}
				</div>

				<footer className='App-footer'>
					<span>
						Digimon Digital Adventures Character Builder by: <a href='https://github.com/TaurusVersant/DDABuilder'>Taurus Versant</a>
						&nbsp;|&nbsp;
						<a href='http://digimon-digital-adventures.tumblr.com/'>Digimon Digital Adventures Roleplaying Game Blog</a>
						&nbsp;|&nbsp;
						<a href='https://discordapp.com/invite/JbDK59r'>Join the Discord here!</a>
						&nbsp;|&nbsp;
						<a href='http://ko-fi.com/taurusversant'>Even a dollar helps support my work</a>
					</span>
				</footer>
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
				case 'Human': return <HumanDebug human={currentCharacter} />
				default: alert(currentCharacter.getClass() + ' not defined.');
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
				case 'Digimon': return <DigimonPane digimon={currentCharacter} digimonLines={this.state.digimonLines} addNewLine={this.addNewLine.bind(this)}/>;
				case 'Human': return <HumanPane human={currentCharacter} />;
				default: alert(currentCharacter.getClass() + ' not defined.');
			}
		}
		return '';
	}

	/**
	 * Function called when a new Digimon Line is added, memorizes the line to the App
	 */
	addNewLine (lineName) {
		if (this.state.digimonLines.indexOf(lineName) === -1) {
			this.state.digimonLines.push(lineName);
		}
	}
}

export default App;
