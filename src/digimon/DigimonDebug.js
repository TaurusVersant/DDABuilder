import React from 'react';
import { DigimonSizes, DigimonStages } from './DigimonData.js';

/** Debug Code **/
class DigimonDebug extends React.Component {
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
		var stage = this.props.digimon.getProperty('stage');
		var sizeIndex = this.props.digimon.getProperty('sizeIndex');
		var stageStats = DigimonStages[stage];
		var sizeStats = DigimonSizes[sizeIndex];

		return (
			<div className='pane' id='debugPane'>
				<h3>Stat Calculations (Round Down Always)</h3>
				<ul>
					<li><b>Wound Boxes:</b> Health + Stage Bonus</li>
					<li><b>Agility:</b> (Accuracy + Dodge)/2</li>
					<li><b>Body:</b> (Health + Damage + Armor)/3 + Size Bonus</li>
					<li><b>Brains:</b> Accuracy/2 + Stage Bonus</li>
					<li><b>BIT Value:</b> Brains/10 + Stage Bonus</li>
					<li><b>CPU Value:</b> Body/10 + Stage Bonus</li>
					<li><b>RAM Value:</b> Agility/10 + Stage Bonus</li>
				</ul>
				<h3>Stage Details</h3>
				<table>
					<tbody>
						<tr>
							<th>Stage</th>
							<th>Starting DP</th>
							<th>Base Movement</th>
							<th>Wound Boxes</th>
							<th>Brains</th>
							<th>Attacks</th>
							<th>Spec Values</th>
						</tr>
						<tr>
							<td className='tableRow'>{stageStats.id}</td>
							<td className='tableRow'>{stageStats.startingDP}</td>
							<td className='tableRow'>{stageStats.baseMovement}</td>
							<td className='tableRow'>{stageStats.woundBoxes}</td>
							<td className='tableRow'>{stageStats.brains}</td>
							<td className='tableRow'>{stageStats.attacks}</td>
							<td className='tableRow'>{stageStats.specValues}</td>
						</tr>
					</tbody>
				</table>
				<h3>Size Details</h3>
				<table>
					<tbody>
						<tr>
							<th>Size</th>
							<th>Area</th>
							<th>Square Meters</th>
							<th>Body Bonus</th>
							<th>Agility Bonus</th>
							<th>Extra</th>
						</tr>
						<tr>
							<td className='tableRow'>{sizeStats.id}</td>
							<td className='tableRow'>{sizeStats.area}</td>
							<td className='tableRow'>{sizeStats.squareMeters}</td>
							<td className='tableRow'>{sizeStats.statBonus['Body']}</td>
							<td className='tableRow'>{sizeStats.statBonus['Agility']}</td>
							<td className='tableRow'>{sizeStats.notes}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export { DigimonDebug }