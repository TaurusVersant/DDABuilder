import React from 'react';

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

export { FamilySelect }