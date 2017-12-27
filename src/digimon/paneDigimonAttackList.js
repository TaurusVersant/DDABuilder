import React from 'react';

var DigimonData = require('./DigimonData.js');
var DigimonStages = DigimonData.DigimonStages;

/**
 * Builds a <div> containing a <table> with rows numbering the number of attacks this Stage of Digimon can learn
 * Including is the ability to modify each attack with Tags, Type, Damage, and Name
 */
class DigimonAttackList extends React.Component {
	/**
	 * Validates that each tagToValidate can be added to this set of currentTags
	 */
	validateTag (currentTags, tagToValidate) {
		if (currentTags.indexOf(tagToValidate) !== -1) { 
			return false;
		}

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

export { DigimonAttackList }