import React from 'react';
import { HumanAges } from './HumanData.js';

/** Debug Code **/
class HumanDebug extends React.Component {
	/**
	 * Refreshes debug every half second to update debug display
	 */
	componentDidMount () {
		setInterval(() => {
			this.setState(() => {
				return { unseen: 'does not display' }
			});
		}, 500);
	}

	render () {
		let age = this.props.human.getProperty('age');
		let ageStats = HumanAges[age];

		return (
			<div className='pane' id='debugPane'>
				
				<h3>Age Details</h3>
				<table>
					<tbody>
						<tr>
							<th>Age Group</th>
							<th>Age Range</th>
							<th>Starting CP</th>
							<th>Starting Cap</th>
							<th>Final Cap</th>
							<th>Area Cap</th>
						</tr>
						<tr>
							<td className='tableRow'>{ageStats.id}</td>
							<td className='tableRow'>{ageStats.ageRange}</td>
							<td className='tableRow'>{ageStats.startingCP}</td>
							<td className='tableRow'>{ageStats.startingCap}</td>
							<td className='tableRow'>{ageStats.finalCap}</td>
							<td className='tableRow'>{ageStats.areaCap}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export { HumanDebug }