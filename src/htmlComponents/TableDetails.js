import React from 'react';

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


export { TableDetails };