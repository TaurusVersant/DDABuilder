import React from 'react';

var HtmlComponents = require('./HtmlComponents.js');
var DigimonData = require('./DigimonData.js');

var DigimonStages = DigimonData.DigimonStages;
var DigimonSizes = DigimonData.DigimonSizes;
var DigimonAttributes = DigimonData.DigimonAttributes;
var DigimonFamilies = DigimonData.DigimonFamilies;
var DigimonQualities = DigimonData.DigimonQualities;
var DigimonQualityTags = DigimonData.DigimonQualityTags;
var DigimonQualityTagsFull = DigimonData.DigimonQualityTagsFull;
var DigimonQualitiesAdvanced = DigimonData.DigimonQualitiesAdvanced;
var DigimonQualitiesDigizoid = DigimonData.DigimonQualitiesDigizoid;

var DigimonStageOrder = Object.keys(DigimonStages);

/**
 * DigimonStats Objects act as a block of elements contained within a <div> which
 * displays all the stats in the provided stats property
 *
 * A DigimonStats Object requires as props to the React.Component
 *	@stats		- an object of stat:value pairs
 *	@onClick	- an optional property that specifies a stat is modifiable and on modifying uses the attached function
 */
class DigimonStats extends React.Component {
	/**
	 * creates a <span> element containing two <button> elements framing another <span> element
	 * the leftmost button is used to reduce the value of the stat while the rightmost button increase it
	 * the <span> contains the stat value
	 */
	numberControl (value, reduceStatFunc, increaseStatFunc) {
		return (
			<span>
				<button onClick={reduceStatFunc}>-</button>
				<span className='labelValue'>{value}</span>
				<button onClick={increaseStatFunc}>+</button>
			</span>
		);
	}

	/**
	 * renders a <div> element containing a number of <p> elements
	 * if the props.onClick property is set the <p> elements contain the results of
	 * the numberControl function for each stat
	 *
	 * if props.onClick is not set, each <p> element contains two <span> elements
	 * the first <span> contains the stat name, and the second the stat value
	 */
	render () {
		var statDetails = [];
		for (var key in this.props.stats) {
			if (this.props.stats.hasOwnProperty(key)) {
				if (this.props.onClick !== undefined) {
					statDetails.push(
						<p key={key}>
							<span className='labelTag'>{key}:</span>
							{
								this.numberControl(
									this.props.stats[key],
									this.props.onClick.bind(null, key, '-'),
									this.props.onClick.bind(null, key, '+')
								)
							}
						</p>
					)
				}
				else {
					statDetails.push(
						<p key={key}>
							<span className='labelTag'>{key}:</span>
							<span className='labelValue'>{this.props.stats[key]}</span>
						</p>
					)
				}
			}
		}

		return (
			<div>
				{statDetails}
			</div>
		);
	}
}

/**
 * WoundBoxes Objects act as a block of elements contained within a <div> which
 * display a series of <input> checkboxes representing the Wound Boxes of a Digimon
 *
 * A WoundBoxes Object requires as props to the React.Component
 *	@maxHealth	- an int representing the maximum number of Wound Boxes the Digimon can have
 *	@health		- an int representing the current number of Wound Boxes the Digimon has
 *	@onClick	- a function reference to the function called when each Wound Box is clicked
 */
class WoundBoxesElement extends React.Component {	
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

/**
 * FamilySelect Objects act as a special block of objects designed to list all Families of
 * a Digimon and provide a method for selecting from a list of Families and adding custom Families
 *
 * A FamilySelect Object contains the following Properties:
 *	@selectText	- a string denoting the first line of text in the select element, not used to add a family
 *	@addText	- a string denoting the last line of text in the select element, choose to add custom family
 *
 * A FamilySelect Object requires as props to the React.Component
 *	@values		- an array of objects representing the DigimonFamilies to make available as <select> <option> elements
 *	@outputList	- an array of strings where each string is one of the Families the Digimon is a member of
 *	@onChange	- function to call when adding or removing a Family from the Digimon
 *	@tag		- a string to apply to the span that is to the horizontal left of the <select> element 
 *	@id			- a string that will serve as the id property of the <select> element
 */
class FamilySelect extends React.Component {
	/**
	 * builds the object and specifies the fixed values of selectText and addText
	 */
	constructor (props) {
		super(props);

		this.selectText = 'Select Family...';
		this.addText = 'Add New Family...';
	}

	/**
	 * Produces an array of <option> elements for selecting a Digimon's Family
	 */
	generateInputList () {
		var inputList = [];
		inputList.push(<option key='digimonFamilySelect'>{this.selectText}</option>);
		inputList.push(<option key='digimonFamilyBlank'></option>);

		for (var i = 0; i < this.props.values.length; i++) {
			inputList.push(<option key={i} title={this.props.values[i].desc}>{this.props.values[i].id}</option>);
		}

		inputList.push(<option key='digimonFamilyBlank2'></option>);
		inputList.push(<option key='digimonFamilyAdd'>{this.addText}</option>);

		return inputList;
	}

	/**
	 * Produces an array of <li> elements containing <button> elements and Family anmes
	 * the <button> elements are used to remove the Family from the Digimon
	 */
	generateOutputList () {
		var outputList = [];
		for (var i = 0; i < this.props.outputList.length; i++) {
			outputList.push(<li key={i}><button onClick={this.props.onChange.bind(null, this.selectText, this.props.outputList[i])}>X</button> {this.props.outputList[i]}</li>);
		}

		return outputList;
	}

	/**
	 * renders an array of elements, a <p>, <span> and <ul> element, for displaying a <select> element containing
	 * the DigimonFamilies for selection, and a list of the Digimon's current Families
	 */
	render () {
		var inputList = this.generateInputList();
		var outputList = this.generateOutputList();

		return (
			[
				<p key='familyInput'>
					<span className='labelTag'>{this.props.tag}</span>
					<select className='labelInput' id={this.props.id} onChange={this.props.onChange.bind(null, this.selectText, false, this.addText)}>
						{inputList}
					</select>
				</p>,
				<span key='familyOutputLabel' className='labelTag' />,
				<ul key='familyOutput' className='dataListing'>
					{outputList}
				</ul>
			]
		);
	}
}

/**
 * TypeInput Objects act as a special block of objects designed to list all Types of a Digimon and
 * provide a method for adding more Types via text input
 *
 * A TypeInput Object contains the following Properties:
 *	@defaultText	- a string denoting the defaultText of the <input> field for the TypeInput Object
 *
 * A TypeInput Object requires as props to the React.Component
 *	@outputList		- an array of strings where each string is one of the Types the Digimon is
 *	@onChange		- function to call when adding or removing a type from the Digimon
 *	@tag			- a string to apply to the span that is to the horizontal left of the <input> element
 *	@id				- a string that will serve as the id property of the <input> element
 */
class TypeInput extends React.Component {
	/**
	 * builds the object and specifies the fixed values of defaultText
	 */
	constructor (props) {
		super(props);

		this.defaultText = 'Enter a Type...';
	}

	/**
	 * clears the input field on focus
	 */
	onInputFocus (event) {
		event.target.value = '';
	}

	/**
	 * produces an array of <li> elements containing <button> elements and the Digimon's Types
	 * the <button> elements are used for removing the Type they are associated with
	 */
	generateOutputList () {
		var outputList = [];
		for (var i = 0; i < this.props.outputList.length; i++) {
			outputList.push(<li key={i}><button onClick={this.props.onChange.bind(null, this.defaultText, this.props.outputList[i])}>X</button> {this.props.outputList[i]}</li>);
		}

		return outputList;
	}

	/**
	 * renders an array of elements, a <p>, <span> and <ul> element, for displaying an <input> element for
	 * entering Types for the Digimon, and a list of the Digimon's current Types
	 */
	render () {
		var outputList = this.generateOutputList();

		return (
			[
				<p key='typeInput'>
					<span className='labelTag'>{this.props.tag}</span>
					<input className='labelInput' id={this.props.id} defaultValue={this.defaultText}
						onFocus={this.onInputFocus} onBlur={this.props.onChange.bind(null, this.defaultText, false)} />
				</p>,
				<span key='typeOutputLabel' className='labelTag' />,
				<ul key='typeOutput' className='dataListing'>
					{outputList}
				</ul>
			]
		);
	}
}

/**
 *
 */
class DigimonQualityList extends React.Component {
	/**
	 *
	 */
	componentDidMount () {
		var qualityPane = document.getElementById('digimonQualityPane');
		var qualityButton = document.getElementById('digimonQualityButton');
		var qualityAdvancedPane = document.getElementById('digimonQualityAdvancedPane');
		var qualityAdvancedButton = document.getElementById('digimonQualityAdvancedButton');
		var qualityDigizoidPane = document.getElementById('digimonQualityDigizoidPane');
		var qualityDigizoidButton = document.getElementById('digimonQualityDigizoidButton');

		// When the user clicks on the button, open the modal 
		qualityButton.onclick = function() {
			qualityPane.classList.remove('hidden');
		}

		// When the user clicks on the button, open the modal 
		qualityAdvancedButton.onclick = function() {
			qualityAdvancedPane.classList.remove('hidden');
		}

		// When the user clicks on the button, open the modal 
		qualityDigizoidButton.onclick = function() {
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
	 *
	 */
	provideQualities (QualityList) {
		var qualityRow = [];
		var qualityMap = [];

		for (var quality in QualityList) {
			if (QualityList.hasOwnProperty(quality) && this.validateQuality(quality, QualityList[quality]) === true) {
				var prereqsList = QualityList[quality].hasOwnProperty('prereqs') ? Object.keys(QualityList[quality].prereqs) : [];

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
	 * Ensures that the quality being considered can be aquired by this Digimon
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
		if (quality === 'Teleport' && this.props.flags['speedyMax'] === false) {
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
		if (qualityObject.handler === 'digizoidArmor' && this.props.flags['digizoidArmor'] === 2) {
			return false;
		}

		// If the Digimon has two Digizoid Weapon qualities already, it cannot purchase more
		if (qualityObject.handler === 'digizoidWeapon' && this.props.flags['digizoidWeapon'] === 2) {
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
		var tagSpans = [];
		var spanText = null;
		for (var i = 0; i < tagList.length; i++) {
			if (DigimonQualityTags.indexOf(tagList[i]) !== -1) {
				spanText = tagList.length === i+1 ? tagList[i] : tagList[i] + ', '
				tagSpans.push(<span key={i} title={DigimonQualityTagsFull[tagList[i]]}>{spanText}</span>);
			}
		}

		return tagSpans;
	}

	/**
	 *
	 */
	render () {
		var DigimonQualityPurchasables = this.provideQualities(DigimonQualities);
		var DigimonQualityAdvancedPurchasables = this.provideQualities(DigimonQualitiesAdvanced);
		var DigimonQualityDigizoidPurchasables = this.provideQualities(DigimonQualitiesDigizoid);

		var purchaseRow = [];
		var purchaseMap = [];

		for (var i = 0; i < this.props.values.length; i++) {
			// if the props.value[i] quality name does not occur in DigimonQualities, checks DigimonQualitiesAdvanced instead
			let qualityObject = null;
			if (DigimonQualities.hasOwnProperty(this.props.values[i])) {
				qualityObject = DigimonQualities[this.props.values[i]];
			} else if (DigimonQualitiesAdvanced.hasOwnProperty(this.props.values[i])) {
				qualityObject = DigimonQualitiesAdvanced[this.props.values[i]];
			} else if (DigimonQualitiesDigizoid.hasOwnProperty(this.props.values[i])) {
				qualityObject = DigimonQualitiesDigizoid[this.props.values[i]];
			}

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
				<div id='digimonQualityPane' className='modal hidden'>
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
							{DigimonQualityPurchasables}
						</tbody></table>
					</div>
				</div>
				<div id='digimonQualityAdvancedPane' className='modal hidden'>
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
							{DigimonQualityAdvancedPurchasables}
						</tbody></table>
					</div>
				</div>
				<div id='digimonQualityDigizoidPane' className='modal hidden'>
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
							{DigimonQualityDigizoidPurchasables}
						</tbody></table>
					</div>
				</div>
			</div>
		);
	}
}

/**
 *
 */
class DigimonAttackList extends React.Component {
	/**
	 * Validates that each tagToValidate can be added to this set of currentTags
	 */
	validateTag (currentTags, tagToValidate) {
		if (currentTags.indexOf(tagToValidate) !== -1) { 
			return false;
		}

		//TODO: how do I remove tags?
		if (tagToValidate === '[Armor Piercing]' || tagToValidate === '[Certain Strike]') {
			if (this.props.flags[tagToValidate] && currentTags.indexOf(tagToValidate === -1)) {
				return false;
			}

			if (this.props.flags['Signature Move'] &&
				(currentTags.indexOf('[Armor Piercing]') !== -1 || currentTags.indexOf('[Certain Strike]') !== -1)
			) {
				return true;
			}
		}

		let matchingGroup = null;
		for (let groupIndex in DigimonData.AttackGroups) {
			if (DigimonData.AttackGroups[groupIndex].indexOf(tagToValidate) !== -1) {
				matchingGroup = DigimonData.AttackGroups[groupIndex];
				break;
			}
		}

		if (matchingGroup !== null) {
			for (let i in currentTags) {
				if (matchingGroup.indexOf(currentTags[i]) !== -1) {
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * Builds a select element of tags that can be added to this attack
	 */
	getAvailableTags (currentAttackTags, index) {
		let tagList = [];
		tagList.push(<option key='attackTagSelector' disabled value=''>Select a Tag</option>);

		for (let tagName in this.props.tags) {
			if (this.validateTag(currentAttackTags, tagName)) {
				tagList.push(<option key={'attackTag_' + tagName} value={tagName}>{tagName}</option>);
			}
		}

		return (
			<select id={'aSelectTag_' + index} defaultValue=''>
				{tagList}
			</select>
		);
	}

	/**
	 * Builds a list of tags with remove buttons paired to each
	 */
	getTagList (index) {
		let tags = this.props.attacks[index].tags;
		let tagList = [];

		for (let i in tags) {
			tagList.push(<p className='attackTagList' key={'tag_' + i}><button key={'button_' + i} className='roundedButton' onClick={this.props.onChange.bind(null, 'tags', index)}>X</button> <span>{tags[i]}</span></p>)
		}

		return (
			<span id={'aTags_' + index}>
				{tagList}
			</span>
		);
	}

	/**
	 *
	 */
	render () {
		var attackRow = [];
		var attackMap = [];

		var attackCount = DigimonStages[this.props.stage].attacks;
		for (var i = 0; i < attackCount; i++) {
			if (this.props.attacks[i] !== undefined) {
				let typeSelector = <select id={'aType_' + i} defaultValue={this.props.attacks[i].type}>
					<option value='Melee'>Melee</option>
					<option value='Range'>Range</option>
				</select>;

				let tagSelect = this.getAvailableTags(this.props.attacks[i].tags, i);

				attackRow.push(<td onBlur={this.props.onChange.bind(null, 'name', i)} key={'aName_' + i} className='tableRow'><input id={'aName_' + i} type='text' defaultValue={this.props.attacks[i].name}/></td>);

				attackRow.push(<td onChange={this.props.onChange.bind(null, 'type', i)} key={'aType_' + i} className='tableRow'>{typeSelector}</td>);
				attackRow.push(<td key={'aTags_' + i} className='tableRowTags'>{this.getTagList(i)}</td>);
				attackRow.push(<td onChange={this.props.onChange.bind(null, 'damage', i)} key={'aDamage_' + i} className='tableRow'><input id={'aDamage_' + i} type='checkbox' /></td>);
				attackRow.push(<td onChange={this.props.onChange.bind(null, 'tags', i)} key={'aSelectTag_' + i} className='tableRow'>{tagSelect}</td>);

				attackMap.push(<tr className='attackRow' key={'aRow_' + i}>{attackRow}</tr>);
				attackRow = [];
			}
		}

		return (
			<div>
				<p><u>Digimon Attacks</u></p>
				<table><tbody>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Tags</th>
						<th>Damage</th>
						<th>Add a Tag</th>
					</tr>
					{attackMap}
				</tbody></table>
			</div>
		);
	}
}

/**
 * The DigimonPane acts as the root object for displaying Digimon character sheets
 */
class DigimonPane extends React.Component {	
	/**
	 *
	 */
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
				//digimonStage.selectedIndex = Object.keys(DigimonStages).indexOf(currentDigimon.getProperty('stage'));
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
	 * Refreshes the Pane when a field of the DigimonLine object is modified
	 */
	/*onDigimonStageChange (event) {
		let index = event.target.selectedIndex;
		let currentIndex = DigimonStageOrder.indexOf(this.state.digimon.getProperty('stage'));

		if (
			(index < currentIndex) &&
			(this.state.digimon.digiPoints < DigimonStages[DigimonStageOrder[index]].startingDP)
		) {
			event.target.selectedIndex = currentIndex;
			alert("Cannot change to " + DigimonStageOrder[index] + " due to current DigiPoints allocation.");
		} else {
			this.state.digimon.setProperty('stage', DigimonStageOrder[index]);

			let megaIndex = DigimonStageOrder.indexOf('Mega');

			let megaOrGreater = currentIndex >= megaIndex;
			if (megaOrGreater && DigimonQualitiesDigizoid['Chrome Digizoid Armor'].cost === 1) {
				DigimonData.digizoidDiscount(true);
			}
			else if (!megaOrGreater && DigimonQualitiesDigizoid['Chrome Digizoid Armor'].cost === 0) {
				DigimonData.digizoidDiscount(false);
			}

			//this.refreshAttacks(this.state.digimon.getProperty('attacks'));

			setTimeout(() => {
				this.updateStateDetails(() => { });
			}, 100);
		}
	}*/
	
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
	 *
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
	 * TODO: Render an empty pane with a button for adding a Digimon
	 * this button creates a new Digimon Line from a staring dialogue where a user names the Digimon and chooses its stage
	 * add Digimon's current stage to the details
	 * add new button to ribbon that pops open the same dialogue, name + stage, which adds it to the ribbon
	 * stage ribbon goes beneath overall ribbon, which changes to reflect the current active name
	 * ability to add increasing Burst stages
	 *
	 * TODO: save button, export all this data into a storable, json + files (.zip?) format as a text file
	 * load button, use text file to add Digimon back into Pane
	 *
	 * TODO: buttons to delete active Digimon and DigimonLine
	 *
	 * TODO: move debug to modal, add ? button in upper right
	 */
	render () {
		let stages = [];
		for (let digimon in this.state.digimon.stages) {
			stages.push(this.state.digimon.stages[digimon].stage);
		}

		let digimonStageSelect = [];
		for (let digimonStage in DigimonData.DigimonStages) {
			digimonStageSelect.push({id: digimonStage})
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
						</p><br/>
						<p><u>Details</u></p>
						<p>
							<span className='labelTag'>Name:</span>
							<input className='labelInput' id='digimonName'
								defaultValue={this.state.digimon.getProperty('name')}
								onBlur={this.onDigimonStageFieldChange.bind(this, 'name', 'value')} />
						</p>

						<HtmlComponents.ArraySelect values={DigimonAttributes} id='digimonAttribute' tag='Attribute:'
							defaultValue={DigimonAttributes[this.state.digimon.getProperty('attributeIndex')]}
							onChange={this.onDigimonStageFieldChange.bind(this, 'attributeIndex', 'selectedIndex')} />

						<FamilySelect values={DigimonFamilies} id='digimonFamilies' tag='Family:'
							outputList={this.state.digimon.getProperty('digimonFamilies')}
							onChange={this.onFamilySelectChange.bind(this)} />

						<TypeInput id='digimonType' tag='Type:'
							outputList={this.state.digimon.getProperty('digimonTypes')}
							onChange={this.onTypeChange.bind(this)} />

						<HtmlComponents.ArraySelect values={DigimonSizes} id='digimonSize' tag='Size:'
							defaultValue={DigimonSizes[this.state.digimon.getProperty('sizeIndex')]}
							onChange={this.onDigimonStageFieldChange.bind(this, 'sizeIndex', 'selectedIndex')} />
					</div>

					<div className='secondColumn'>
						<p><u>Digimon Picture</u></p>
						<input type='file' id='files' onChange={this.handleFileSelect.bind(this)} />
						<br/>
						<img className='digimonImage' alt='' src={this.state.digimon.getProperty('digimonImage')} />
					</div>
				</div>

				<WoundBoxesElement
					health={this.state.digimon.getProperty('woundBoxes')}
					maxHealth={this.state.digimon.getWoundBoxesStat()}
					onClick={this.updateWounds.bind(this)}
				/>

				<div className='divRow'>
					<div className='firstColumn'>
						<p><u>Movement</u></p>
						<HtmlComponents.TableDetails
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