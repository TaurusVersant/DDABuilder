import React from 'react';

/**
 * RibbonMenu Objects act as horizontal lists of buttons rendered to the page
 * 
 * A RibbonMenu Object requires as props to the React.Component
 *	@id		 - the property to use as the html id property of the <ul> element
 *	@values	 - an array of names to convert into buttons
 *	@onClick - a method to call on clicking of the button
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

export { RibbonMenu }