import React from 'react';
import logo from './digivice.png';
import './App.css';
import { DigimonPane } from './js/DigimonPane.js';
import { RibbonMenu } from './js/HtmlComponents.js';

var DigimonObjects = require('./js/DigimonObjects.js');
var DigimonData = require('./js/DigimonData.js');

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

	componentDidUpdate () {
		/*let characterRibbon = document.getElementById('characterRibbon');

		for (let i in characterRibbon.children) {
			if (characterRibbon.children[i].nodeName === 'LI') {
				characterRibbon.children[i].classList.remove('selected');
			}
		}

		if (characterRibbon.children[this.state.characters.length-1]) {
			characterRibbon.children[this.state.characters.length-1].classList.add('selected');
		}*/
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

			this.setState({
				characters: updatedCharacters,
				selectedIndex: updatedCharacters.length-1
			});
		} else {
			//console.log('Swapping to: ' + this.state.characters[index].toString());
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
					{this.createDigimon(this.state.characters[this.state.selectedIndex])}
				</div>
			</div>
		);
	}

	createDigimon (digimon) {
		return <DigimonPane digimon={digimon} />;
	}
}

class Pane extends React.Component {
	constructor(props) {
		super(props);
		this.state = { character: this.props.character };
	}

	componentWillReceiveProps(props) {
		this.setState({character: props.character});
	}

	render () {
		let paneObject = this.state.character.constructor.name === 'DigimonLine' ? <DigimonPane digimon={this.state.character}/> : '';
		return (
			<div className = 'pane'>
				{paneObject}
			</div>
		);
	}
}

export default App;
