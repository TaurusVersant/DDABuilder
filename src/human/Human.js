/* Digimon Digital Adventures Human */

var HumanData = require('./HumanData.js');

/**
 *
 */
class Human {
	/**
	 * 
	 */
	constructor (age, name) {
		this.class = 'Human';
		this.name = name;
		this.age = age;

		this.details = "";

		this.woundBoxes = 0;
		//this.woundBoxes = this.derivedStats['Wound Boxes'];

		this.onSwapTo();
	}

	/** STAT CONTROLLING FUNCTIONS **/

	/** GENERAL FUNCTIONS **/

	/**
	 * getter method for the Human
	 */
	getProperty (propertyName) {
		return this[propertyName];
	}

	/**
	 * setter method for the Human
	 */
	setProperty (propertyName, value) {
		this[propertyName] = value;
	}

	/**
	 * Takes a propertyName of the Human array property to adjust, either removing or adding the value
	 * depending on the removeFlag being true or false
	 *
	 * Note: the value will only be added if it is unique
	 */
	setStageArrayProperty (propertyName, value, removeFlag) {
		var valueIndex = this[propertyName].indexOf(value);

		if (removeFlag === true && valueIndex !== -1) {
			this[propertyName].splice(valueIndex, 1);
		}
		else if (removeFlag === false && valueIndex === -1) {
			this[propertyName].push(value);
		}
	}

	/**
	 * Function to be called to update values necessary when this Human object is swapped to
	 */
	onSwapTo () {
	}

	/**
	 * Builds a json string representing the Human object
	 */
	saveToJSON () {
		let humanJSON = JSON.stringify(this);

		return humanJSON;
	}

	/**
	 * Populates the Human object from a json string
	 */
	loadFromJSON (humanObject) {
		for (let property in humanObject) {
			this[property] = humanObject[property];
		}
	}

	/**
	 * Identifies the class of this object
	 */
	getClass () {
		return this.class;
	}

	/**
	 * Returns the name of this object
	 */
	toString () {
		return this.name;
	}
}

module.exports.createHuman = function (stage, name) {
	return new Human(stage, name);
}