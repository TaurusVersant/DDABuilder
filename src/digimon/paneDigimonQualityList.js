import React from 'react';

let DigimonData = require('./DigimonData.js');

let DigimonStages = DigimonData.DigimonStages;
let DigimonQualities = DigimonData.DigimonQualities;
let DigimonQualityTags = DigimonData.DigimonQualityTags;
let DigimonQualityTagsFull = DigimonData.DigimonQualityTagsFull;
let DigimonQualitiesAdvanced = DigimonData.DigimonQualitiesAdvanced;
let DigimonQualitiesDigizoid = DigimonData.DigimonQualitiesDigizoid;

let DigimonStageOrder = Object.keys(DigimonStages);

/**
 * Constructs a <div> html element containing three buttons, corresponding to Digimon Qualities,
 * Advanced Qualities, and Digizoid Qualities, a modal purchase pane for each set of Qualities,
 * and a <table> html element listing all of the Qualities applied to this Digimon
 */
class DigimonQualityList extends React.Component {
	/**
	 * On Component creation, assigns callback functions to allow the Modal to function
	 */
	componentDidMount () {
		let qualityPane = document.getElementById('digimonQualityPane');
		// When the user clicks on the button, open the modal 
		document.getElementById('digimonQualityButton').onclick = function() {
			qualityPane.classList.remove('hidden');
		}

		let qualityAdvancedPane = document.getElementById('digimonQualityAdvancedPane');
		// When the user clicks on the button, open the modal 
		document.getElementById('digimonQualityAdvancedButton').onclick = function() {
			qualityAdvancedPane.classList.remove('hidden');
		}

		let qualityDigizoidPane = document.getElementById('digimonQualityDigizoidPane');
		// When the user clicks on the button, open the modal 
		document.getElementById('digimonQualityDigizoidButton').onclick = function() {
			qualityDigizoidPane.classList.remove('hidden');
		}
		
		// When the user clicks anywhere outside of the modal, close it
		window.addEventListener('click', function (event){
			switch (event.target.id) {
				case 'digimonQualityPane':
					qualityPane.classList.add('hidden');
					break;
				case 'digimonQualityAdvancedPane':
					qualityAdvancedPane.classList.add('hidden');
					break;
				case 'digimonQualityDigizoidPane':
					qualityDigizoidPane.classList.add('hidden');
					break;
				default:
			}			
		});
	}

	/**
	 * Builds a list of <tr> html elements used to populate the purchase Quality tables
	 */
	provideQualities (QualityList) {
		let qualityRow = [];
		let qualityMap = [];
		
		// If the Digimon is Champion or greater and has yet to purchase an Extra Movement, make sure it's discounted
		/*if (DigimonStageOrder.indexOf(this.props.stage) >= DigimonStageOrder.indexOf('Champion')) {
			this.props.flags['movementDiscountFlag'] = DigimonData.extraMovementDiscount(this.props.flags['movementDiscountFlag'], this.props.flags['extraMovements']);
		}*/

		for (let quality in QualityList) {
			if (QualityList.hasOwnProperty(quality) && this.validateQuality(quality, QualityList[quality]) === true) {
				let prereqsList = QualityList[quality].hasOwnProperty('prereqs') ? Object.keys(QualityList[quality].prereqs) : [];

				qualityRow.push(<td key={quality + '_purchase'} className='tableRow'><button onClick={this.props.onClick.bind(null, quality,QualityList[quality], false)}>Purchase</button></td>);
				qualityRow.push(<td key={quality + '_name'} className='tableRow'><i>{quality}</i></td>);
				qualityRow.push(<td key={quality + '_cost'} className='tableRow'>{QualityList[quality].cost}</td>);
				qualityRow.push(<td key={quality + '_tags'} className='tableRow'>{this.getTags(QualityList[quality].tags.join(', '))}</td>);
				qualityRow.push(<td key={quality + '_reqs'} className='tableRow'>{prereqsList.join(', ')}</td>);
				qualityRow.push(<td key={quality + '_pre'} className='tableRow'>{QualityList[quality].unlocks.join(', ')}</td>);

				qualityMap.push(<tr key={quality + '_row'}>{qualityRow}</tr>);
				qualityMap.push(<tr key={quality + '_desc'}><td className='qualityDesc' colSpan='6'><ul><li>{QualityList[quality].desc}</li></ul></td></tr>);
				qualityRow = [];
			}
		}

		return qualityMap;
	}

	/**
	 * Ensures that the quality being considered can be acquired by this Digimon
	 */
	validateQuality (quality, qualityObject) {		
		// If the Quality requires a Stage and this Digimon is beneath that Stage, the Quality is not available
		if (qualityObject.hasOwnProperty('stage') && DigimonStageOrder.indexOf(this.props.stage) < DigimonStageOrder.indexOf(qualityObject.stage)) {
			return false;
		}

		// If the Digimon already has this Quality and maxRanks is false, it cannot purchase it again
		if (qualityObject.maxRanks === false && this.props.values.indexOf(quality) !== -1) {
			return false;
		}

		// Digimon must have the maximum possible ranks in Speedy to learn Teleport
		if (quality === 'Teleport' && this.props.ranks['Speedy'] < 3 && this.props.flags['speedyMax'] === false) {
			return false;
		}

		// If the Quality has a limit on its ranks, and the digimon has that many ranks, the Quality is not available
		if (
			qualityObject.maxRanks > 0 &&
			this.props.ranks.hasOwnProperty(quality) &&
			this.props.ranks[quality] === qualityObject.maxRanks
		)
		{
			return false;
		}

		// If the Digimon has two Digizoid Armor qualities already, it cannot purchase more
		if (qualityObject.handler === 'digizoidArmor' && this.props.flags['digizoidArmor'] === true) {
			return false;
		}

		// If the Digimon has two Digizoid Weapon qualities already, it cannot purchase more
		if (qualityObject.handler === 'digizoidWeapon' && this.props.flags['digizoidWeapon'] === true) {
			return false;
		}

		// If the Digimon has a Data Optimization, it cannot purchase more
		if (this.props.flags['dataOptimization'] && qualityObject.handler === 'dataOpt') {
			return false;
		}

		// If the Digimon does not have a dataSpecialization of a specific tree, it must be ultimate or higher
		// If it does, it must be Burst or higher
		if (qualityObject.handler === 'dataSpec') {

				switch (this.props.flags['dataSpecialization'].length) {
					case 2:
						return false;
					case 1:
						if (DigimonStageOrder.indexOf(this.props.stage) < DigimonStageOrder.indexOf('Burst')) {
							return false;
						}

						let specQuality = DigimonQualitiesAdvanced[this.props.flags['dataSpecialization'][0]];
						// If the Digimon's current dataSpec quality requires its hybrid quality
						// and if this quality requires the Digimon's hybrid quality
						// then if the Digimon does not have two ranks of its hybrid, return false
						if (specQuality.prereqs.hasOwnProperty(this.props.flags['hybrid']) &&
							qualityObject.prereqs.hasOwnProperty(this.props.flags['hybrid']) &&
							this.props.ranks[this.props.flags['hybrid']] !== 2
						) {
							return false;
						}
						break;
					default:
				}
		}

		// Ensures one of the pre-requisites are possessed for this quality
		let prereqs_passed = true;
		for (let prereqQuality in qualityObject.prereqs) {
			if (this.props.values.indexOf(prereqQuality) !== -1 &&
				 this.props.ranks[prereqQuality] !== undefined &&
				 this.props.ranks[prereqQuality] >= qualityObject.prereqs[prereqQuality]
			) {
				return true;
			}
			prereqs_passed = false;
		}

		return prereqs_passed;
	}

	/**
	 * Creates a list of spans for each Tag the quality is modified with
	 * Each span has a hover-text explaining the quality
	 */
	getTags (tagList) {
		let tagSpans = [];
		let spanText = null;
		for (let i = 0; i < tagList.length; i++) {
			if (DigimonQualityTags.indexOf(tagList[i]) !== -1) {
				spanText = tagList.length === i+1 ? tagList[i] : tagList[i] + ', '
				tagSpans.push(<span key={i} title={DigimonQualityTagsFull[tagList[i]]}>{spanText}</span>);
			}
		}

		return tagSpans;
	}

	/**
	 * Creates a modal <div> for purchasing Qualities
	 */
	buildQualityPurchaseDiv (id, purchasables) {
		return (
			<div id={id} className='modal hidden'>
				<div className='modal-content'>
					<table><tbody>
						<tr>
							<th className='qualityHeader'></th>
							<th className='qualityHeader'>Quality</th>
							<th className='qualityHeader'>Cost (DP)</th>
							<th className='qualityHeader'>Tags</th>
							<th className='qualityHeader'>Prerequisites</th>
							<th className='qualityHeader'>Unlocks</th>
						</tr>
						{purchasables}
					</tbody></table>
				</div>
			</div>
		);
	}

	render () {
		let DigimonQualityPurchasables = this.provideQualities(DigimonQualities);
		let DigimonQualityAdvancedPurchasables = this.provideQualities(DigimonQualitiesAdvanced);
		let DigimonQualityDigizoidPurchasables = this.provideQualities(DigimonQualitiesDigizoid);

		// Builds <tr> list of all Qualities purchased by this Digimon
		let purchaseRow = [];
		let purchaseMap = [];

		for (let i = 0; i < this.props.values.length; i++) {
			let qualityObject = DigimonData.GetQuality(this.props.values[i]);

			purchaseRow.push(<td key={'qName_' + i} className='tableRow'><i>{this.props.values[i]}</i></td>);
			purchaseRow.push(<td key={'qRank_' + i} className='tableRow'>{this.props.ranks[this.props.values[i]]}</td>);
			purchaseRow.push(<td key={'qTag_' + i} className='tableRow'>{this.getTags(qualityObject.tags)}</td>);
			purchaseRow.push(<td key={'qDesc_' + i}>{qualityObject.desc}</td>);
			purchaseRow.push(<td key={'qRemove_' + i}><button onClick={this.props.onClick.bind(null, this.props.values[i], qualityObject, true)}>Remove</button></td>);

			purchaseMap.push(<tr className='qualityRow' key={'qRow_' + i}>{purchaseRow}</tr>);
			purchaseRow = [];
		}

		return (
			<div>
				<p><u>Digimon Qualities</u></p>
				<table id='digimonQualityTable'>
				<thead>
					<tr>
						<th>Quality</th>
						<th>Rank</th>
						<th>Tags</th>
						<th>Details</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{purchaseMap}
				</tbody></table>
				<br/>
				<button id='digimonQualityButton'>Add Quality</button>
				<button id='digimonQualityAdvancedButton'>Add Advanced Quality</button>
				<button id='digimonQualityDigizoidButton'>Add Digizoid Quality</button>
				{this.buildQualityPurchaseDiv ('digimonQualityPane', DigimonQualityPurchasables)}
				{this.buildQualityPurchaseDiv ('digimonQualityAdvancedPane', DigimonQualityAdvancedPurchasables)}
				{this.buildQualityPurchaseDiv ('digimonQualityDigizoidPane', DigimonQualityDigizoidPurchasables)}
			</div>
		);
	}
}

export { DigimonQualityList }