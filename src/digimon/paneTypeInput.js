import React from 'react';

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
	 * Detects an enter key press on the input field and runs the onBlur function for the element
	 */
	checkEnter (event) {
		if (event.key === 'Enter') {
			event.target.blur();
		}
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
						onFocus={this.onInputFocus} onBlur={this.props.onChange.bind(null, this.defaultText, false)} onKeyPress={this.checkEnter} />
				</p>,
				<span key='typeOutputLabel' className='labelTag' />,
				<ul key='typeOutput' className='dataListing'>
					{outputList}
				</ul>
			]
		);
	}
}

export { TypeInput }