import React from 'react';

/**
 *
 */
class LineSelect extends React.Component {
	/**
	 * builds the object and specifies the fixed values of selectText and addText
	 */
	constructor (props) {
		super(props);

		this.selectText = 'Select Line...';
		this.addText = 'Add New Line...';
	}

	/**
	 *
	 */
	generateInputList () {
		let inputList = [];
		inputList.push(<option key='digimonLineSelect'>{this.selectText}</option>);
		inputList.push(<option key='digimonLineBlank'></option>);

		for (let i = 0; i < this.props.values.length; i++) {
			inputList.push(<option key={i} >{this.props.values[i]}</option>);
		}

		inputList.push(<option key='digimonLineAdd'>{this.addText}</option>);

		return inputList;
	}

	/**
	 * renders an array of elements, a <p>, <span> and <ul> element, for displaying a <select> element containing
	 * the available DigimonLines for selection, and the Digimon's current Line
	 */
	render () {
		let inputList = this.generateInputList();
		let outputList = this.props.digimonLine !== undefined ? (
			<li>
				<button onClick={this.props.onChange.bind(null, this.selectText, this.props.digimonLine)}>X</button>&nbsp;
				{this.props.digimonLine}
			</li>
		) : '';

		return (
			[
				<p key='lineInput'>
					<span className='labelTag'>{this.props.tag}</span>
					<select className='labelInput' id={this.props.id} onChange={this.props.onChange.bind(null, this.selectText, false, this.addText)}>
						{inputList}
					</select>
				</p>,
				<span key='lineOutputLabel' className='labelTag' />,
				<ul key='LineOutput' className='dataListing'>
				{outputList}
				</ul>
			]
		);
	}
}

export { LineSelect }