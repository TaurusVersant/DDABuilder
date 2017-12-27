import React from 'react';

var HumanData = require('./human/HumanData.js');

/**
 * The HumanPane acts as the root object for displaying Human character sheets
 */
class HumanPane extends React.Component {	
	constructor (props) {
		super(props);

		this.state = {
			human: props.human,
			age: props.human.getProperty('age')
		}
	}

	/**
	 * Updates the HumanPane with a new Human object
	 */
	componentWillReceiveProps(nextProps) {
		this.setState({
			human: nextProps.human
		});

		setTimeout(() => {
			this.updateStateDetails(() => { });
		}, 100);
	}

	/**
	 * Updates all values to be displayed on the HumanPane after a Human change	
	 */
	updateStateDetails () {
		// Update Fields
		this.updateStageField(this.state.human, 'name');
		this.updateStageField(this.state.human, 'age');
		this.updateStageField(this.state.human, 'image');
		this.updateStageField(this.state.human, 'details');
	}

	/**
	 * Updates a specific field on the Pane
	 */
	updateStageField (currentHuman, fieldProperty) {
		switch (fieldProperty) {
			case 'name':
				let humanTitle = document.getElementById('humanTitle');
				humanTitle.innerHTML = currentHuman.getProperty('name');

				let humanNameField = document.getElementById('humanName');
				humanNameField.value = currentHuman.getProperty('name');
				break;
			case 'age':
				let humanAge = document.getElementById('humanAge');
				humanAge.value = currentHuman.getProperty('age');
				break;
			case 'image':
				let humanImage = document.getElementById('humanImage');
				humanImage.src = currentHuman.getProperty('humanImage');
				break;
			case 'details':
				var humanDetailsField = document.getElementById('humanDetails');
				humanDetailsField.value = currentHuman.getProperty('details');
				break;
			default:
				break;
		}
	}
	
	/**
	 * Refreshes the Pane when a field of the Human object is modified
	 */
	onHumanFieldChange (fieldProperty, fieldLocation, event) {
		var currentHuman = this.state.human;
		currentHuman.setProperty(fieldProperty, event.target[fieldLocation]);

		this.updateStageField(currentHuman, fieldProperty);
	}

	/**
	 * http://www.onlywebpro.com/2012/01/24/create-thumbnail-preview-of-images-using-html5-api/
	 *
	 * Refreshes the Pane to display an image when it is uploaded to the screen
	 */
	handleFileSelect (event) {
		var files = event.target.files;
		if (files.length > 0) {
			var f = files[0];
			var reader = new FileReader();

			reader.onload = (function(theFile, currentHuman) {
				return function(e) {
					currentHuman.setProperty('humanImage', e.target.result);
				};
			})(f, this.state.human);

			reader.readAsDataURL(f);

			setTimeout(() => {
				this.updateStateDetails(() => { });
			}, 100);
		}
	}

	render () {
		return (
			<div>
				<h1 id='humanTitle'>{this.state.human.getProperty('name')}</h1>
				<div className='divRow'>
					<div className='firstColumn'>
						<p><u>Details</u></p>
						<p>
							<span className='labelTag'>Name:</span>
							<input className='labelInput' id='humanName'
								defaultValue={this.state.human.getProperty('name')}
								onBlur={this.onHumanFieldChange.bind(this, 'name', 'value')} />
						</p>
						<p>
							<span className='labelTag'>Age:</span>
							<input readOnly='true' className='labelInput' id='humanAge'
								defaultValue={this.state.human.getProperty('age')} />
						</p>
					</div>

					<div className='secondColumn'>
						<p><u>Human Picture</u></p>
						<input type='file' id='files' onChange={this.handleFileSelect.bind(this)} />
						<br/>
						<img className='characterImage' alt='' id='humanImage' src={this.state.human.getProperty('humanImage')} />
					</div>
				</div>
				<div>
					<p><u>Additional Details</u></p>
					<textarea className='detailsTextArea' id='humanDetails'
						defaultValue={this.state.human.getProperty('details')}
						onBlur={this.onHumanFieldChange.bind(this, 'details', 'value')} />
				</div>
			</div>
		);
	}
}

export { HumanPane }