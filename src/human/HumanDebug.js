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
				<h3>Stat Calculations (Round Down Always)</h3>
				<ul>
					<li><b>Wound Boxes:</b> Body Attribute + Endurance Skill (minimum 2)</li>
					<li><b>Movement:</b> Agility Attribute + Survival Skill</li>
					<li><b>Accuracy:</b> Agility Attribute + Fight Skill</li>
					<li><b>Dodge:</b> Agility Attribute + Dodge Skill</li>
					<li><b>Armor:</b> Body Attribute + Endurance Skill</li>
					<li><b>Damage:</b> Body Attribute + Fight Skill</li>
				</ul>
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