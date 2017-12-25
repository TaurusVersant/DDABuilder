import React from 'react';

/**
 * RibbonMenu Objects act as horizontal lists of buttons rendered to the page
 * 
 * A RibbonMenu Object requires as props to the React.Component
 *	@values		- an array of objects representing the items to convert into buttons
 *		- each object in the values array must have an id property that will be used as the Button's text
 *	@onClick			- a method to call on clicking of the button
 *
 */
class RibbonMenu extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			selectedIndex: this.props.selectedIndex
		};
	};

	/**
	 * renders a <ul> unorderedlist of <li> list items containing <button> buttons for each element in the props.values array
	 *
	 * each button has the props.onClick onClick property, and a body of each props.values element
	 */
	render () {
		return (
			<ul id={this.props.id} className="navigation">
				{this.props.values.map((value, index)=>{
					let selectedClass = this.props.selectedIndex === index ? 'selected' : '';
					return (
						<li className={selectedClass} key={"ribbon_" + index}>
							<button onClick={this.props.onClick.bind(null, index, false)}>{value}</button>
							<button onClick={this.props.onClick.bind(null, index, true)}>X</button>
						</li>
					)
				})}
			</ul>
		);
	}
}

/**
 * ArraySelect Objects act as <select> elements for displaying the options specified in props.values
 *
 * An ArraySelect Object requires as props to the React.Component
 *	@tag		- a string to apply to the span that is to the horizontal left of the <select> element
 *	@id			- a string that will serve as the id property of the <select> element
 *	@values		- an array of objects representing the items to convert into <option> elements
 *		- each object in the values array must have an id property that will be used as the <option> element's text
 *	@onChange	- a method to call when changing the select element
 */
class ArraySelect extends React.Component {
	/**
	 * renders a <p> paragraph containing a <span> and <select> element in a horizontal row
	 *
	 * the <select> element contains <option> elements derived from the objects in the props.values array
	 */
	render () {
		var items = [];
		for (var i = 0; i < this.props.values.length; i++) {
			items.push(<option key={i} value={this.props.values[i].id}>{this.props.values[i].id}</option>);
		}

		return (
			<p>
				<span className="labelTag">{this.props.tag}</span>
				<select className="labelInput" id={this.props.id} onChange={this.props.onChange}>
					{items}
				</select>
			</p>
		);
	}
}

/**
 * TableDetails Objects act as a <table> element containing a header row
 * and single value row derived from the props.values property
 *
 * A TableDetails Object requires as props to the React.Component
 *	@values - an array of objects with each object containing an id and value property
 */
class TableDetails extends React.Component {
	/**
	 * renders a <table> element containing two <tr> rows, one with <th> elements for each
	 * of the props.values object's id properties, and one with <td> elements for each of
	 * the prop.values object's value properties
	 */
	render () {
		var tableHeaders = [];
		var tableValues = [];
		for (let headerValue in this.props.values) {
			tableHeaders.push(<th key={headerValue + "_header"}>{headerValue}</th>);
			tableValues.push(<td key={headerValue + "_row"} className="tableRow">{this.props.values[headerValue]}</td>);
		}

		return (
			<table><tbody>
				<tr>{tableHeaders}</tr>
				<tr>{tableValues}</tr>
			</tbody></table>
		);
	}
}


export { RibbonMenu, ArraySelect, TableDetails };