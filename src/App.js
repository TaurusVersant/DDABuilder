import React from 'react';
import logo from './digivice.png';
import './App.css';
import { DigimonPane } from './js/DigimonPane.js';
import { RibbonMenu } from './js/HtmlComponents.js';

var DigimonObjects = require('./js/DigimonObjects.js');
var DigimonData = require('./js/DigimonData.js');
var DigimonStages = DigimonData.DigimonStages;
var DigimonSizes = DigimonData.DigimonSizes;

// Create a DigimonLine object and store it in the App
// Pass the DigimonLine into the DigimonPane to populate it

class App extends React.Component {
	constructor (props) {
		super(props);

		document.title = 'DDA v1.2 Builder'

		let newDigimon = DigimonObjects.createDigimon('Fresh', 'Botamon');
		
		this.state = {
			characters: [newDigimon],
			selectedIndex: 0
		}
	}

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

	addHuman () {
		console.log('Adding a human!');
	}

	addDigimon () {
		let digimonNameInput = document.getElementById('addDigimonName');
		let digimonName = digimonNameInput.value.trim();

		if (digimonName.length) {
			let digimonStageSelect = document.getElementById('addDigimonStage');
			let digimonStage = digimonStageSelect.options[digimonStageSelect.selectedIndex].value;
			let newDigimon = DigimonObjects.createDigimon(digimonStage, digimonName);

			let updatedCharacters = this.state.characters.concat([newDigimon]);
			this.setState({
				characters: updatedCharacters,
				selectedIndex: updatedCharacters.length-1
			});

			digimonNameInput.value = '';
			digimonStageSelect.selectedIndex = 0;

			document.getElementById('addDigimonModal').classList.add('hidden');
			//setTimeout(() => {}, 100, newDigimon);
		}
	}

	changePane (index, removeFlag = false, event) {
		if (removeFlag) {
			// TODO: WHY IS SPLICE BROKEN
			let characterList = this.state.characters;
			let updatedCharacters = characterList.filter(function(character) { return character !== characterList[index] });
			//let updatedCharacters = characterList.splice(index, 1);

			if (updatedCharacters[updatedCharacters.length-1] !== undefined) {
				updatedCharacters[updatedCharacters.length-1].onSwapTo();
			}

			this.setState({
				characters: updatedCharacters,
				selectedIndex: updatedCharacters.length-1
			});
		} else {
			//console.log('Swapping to: ' + this.state.characters[index].toString());
			this.state.characters[index].onSwapTo();

			this.setState({
				selectedIndex: index
			});
		}
	}

	render () {
		let digimonStageSelect = [];
		for (let digimonStage in DigimonData.DigimonStages) {
			digimonStageSelect.push(<option key={digimonStage} value={digimonStage}>{digimonStage}</option>)
		}

		let ribbonCharacters = [];
		for (let i in this.state.characters) {
			ribbonCharacters.push(this.state.characters[i].toString());
		}

		return (
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo-still' alt='logo' />
					<h1 className='App-title'>Digimon Digital Adventure v1.2 Character Builder</h1>
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
				<button id='addHumanButton' type='button'>Add Human</button>
				<button id='addDigimonButton' type='button'>Add Digimon</button>
				<hr/>
				<RibbonMenu id='characterRibbon' values={ribbonCharacters} selectedIndex={this.state.selectedIndex} onClick={this.changePane.bind(this)} />
				<div className = 'pane'>
					{this.getPane()}
				</div>

				{this.getDebug()}
			</div>
		);
	}

	getDebug () {
		let currentCharacter = this.state.characters[this.state.selectedIndex];
		if (currentCharacter !== undefined && typeof currentCharacter.getClass === 'function') {
			switch (currentCharacter.getClass()) {
				case 'Digimon':
					return <DigimonDebug digimon={currentCharacter} />;
				default:
					alert(currentCharacter.getClass() + " not defined.");
			}
		}
		return '';
	}

	getPane () {
		let currentCharacter = this.state.characters[this.state.selectedIndex];

		if (currentCharacter !== undefined && typeof currentCharacter.getClass === 'function') {
			switch (currentCharacter.getClass()) {
				case 'Digimon':
					return <DigimonPane digimon={currentCharacter} />;
				default:
					alert(currentCharacter.getClass() + " not defined.");
			}
		}
		return '';
	}
}

/** Debug Code **/
class DigimonDebug extends React.Component {
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
