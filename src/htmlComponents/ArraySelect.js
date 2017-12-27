import React from 'react';

/**
 * ArraySelect Objects act as <select> elements for displaying the options specified in props.values
 *
 * An ArraySelect Object requires as props to the React.Component
 *	@tag			- a string to apply to the span that is to the horizontal left of the <select> element
 *	@id				- a string that will serve as the id property of the <select> element
 *	@values			- an array of objects representing the items to convert into <option> elements
 *						- each object in the values array must have an id property that will be used as the <option> element's text
 *	@onChange		- a method to call when changing the select element
 *	@defaultValue	- an object from the values set which indicates the defaultValue of the <select> element, use its .id property
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
				<select className="labelInput" id={this.props.id} onChange={this.props.onChange} defaultValue={this.props.defaultValue.id}>
					{items}
				</select>
			</p>
		);
	}
}

export { ArraySelect };