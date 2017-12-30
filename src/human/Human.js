/* Digimon Digital Adventures Human */

let HumanData = require('./HumanData.js');
let HumanAges = HumanData.HumanAges;
let HumanAttributes = HumanData.HumanAttributes;
let HumanSkills = HumanData.HumanSkills;

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

		this.creationPoints = HumanAges[this.age].startingCP;
		this.totalCreationPoints = HumanAges[this.age].startingCP;

		this.details = "";

		this.attributes = {};
		for (let i in HumanAttributes) {
			this.attributes[HumanAttributes[i]] = 0;
		}

		this.skills = {};
		for (let i in HumanSkills) {
			this.skills[HumanSkills[i]] = 0;
		}

		this.flags = {
			'maxAtt': false,
			'maxSkill': false,
			'attSpent': 0,
			'skillSpent': 0
		};

		this.woundBoxes = 0;
		this.derivedStats = {};
		this.buildDerivedStats();
		this.woundBoxes = this.derivedStats['Wound Boxes'];

		this.onSwapTo();
	}

	/** STAT CONTROLLING FUNCTIONS **/

	/**
	 * builds all derived stats based on attributes and skills
	 */
	buildDerivedStats () {
		this.derivedStats['Wound Boxes'] = this.attributes['Body'] + this.skills['Endurance'];
		this.derivedStats['Wound Boxes'] = this.derivedStats['Wound Boxes'] < 2 ? 2 : this.derivedStats['Wound Boxes'];

		this.derivedStats['Movement'] = this.attributes['Agility'] + this.skills['Survival'];
		this.derivedStats['Accuracy'] = this.attributes['Agility'] + this.skills['Fight'];
		this.derivedStats['Dodge'] = this.attributes['Agility'] + this.skills['Dodge'];
		this.derivedStats['Armor'] = this.attributes['Body'] + this.skills['Endurance'];
		this.derivedStats['Damage'] = this.attributes['Body'] + this.skills['Fight'];
	}

	changeAttribute (attName, attChange) {
		this.changeStat('attribute', attName, attChange, this.attributes, 'maxAtt', 'attSpent');
	}

	changeSkill (skillName, skillChange) {
		this.changeStat('skill', skillName, skillChange, this.skills, 'maxSkill', 'skillSpent');
	}

	/**
	 * Modifies the statSet (attribute or skill) in the direction indicated by statChange
	 * Within the rules specified by the maxFlag and spentFlag
	 */
	changeStat (statType, statName, statChange, statSet, maxFlag, spentFlag) {
		let updateHealth = false;

		if (statChange === '-' && statSet[statName] > 0) {
			if (statSet[statName] === HumanAges[this.age].startingCap) {
				this.flags[maxFlag] = false;
			}

			this.flags[spentFlag] -= 1;

			statSet[statName] -= 1;
			this.creationPoints += 1;

			updateHealth = this.woundBoxes === this.derivedStats['Wound Boxes'];

			this.buildDerivedStats();
		}
		else if (
			statChange === '+' &&
			this.creationPoints &&
			statSet[statName] < HumanAges[this.age].startingCap &&
			this.flags[spentFlag] < HumanAges[this.age].areaCap
		) {
			if (this.flags[maxFlag] && (statSet[statName] + 1 === HumanAges[this.age].startingCap)) {
				alert('Cannot increase a second ' + statType + ' to the starting cap.');
			} else {
				updateHealth = this.woundBoxes === this.derivedStats['Wound Boxes'];

				this.creationPoints -= 1;
				statSet[statName] += 1;

				this.flags[spentFlag] += 1;

				if (statSet[statName] === HumanAges[this.age].startingCap) {
					this.flags[maxFlag] = true;
				}

				this.buildDerivedStats();
			}
		}

		if (updateHealth) {
			this.woundBoxes = this.derivedStats['Wound Boxes'];
		}
	}

	/**
	 * Increases the total number of CreationPoints or reduces if the Human has at least one creationpoint and more than its starting total
	 */
	modifyCreationPoints (increaseFlag) {
		if (increaseFlag) {
			this.creationPoints += 1;
			this.totalCreationPoints += 1;
		} else if (this.creationPoints !== 0 && this.totalCreationPoints > HumanAges[this.age].startingCP) {
			this.creationPoints -= 1;
			this.totalCreationPoints -= 1;
		}
	}

	/**
	 * Retrieves the Wound Boxes derived stat from the Human, necessary as the "Maximum Wound Boxes"
	 */
	getWoundBoxesStat () {
		return this.derivedStats["Wound Boxes"];
	}

	/**
	 * Takes a reduceFlag, which if true will reduce the Human's woundBoxes by 1
	 * and if false, increase it by 1
	 */
	changeHealth (reduceFlag) {
		if (reduceFlag) {
			this.woundBoxes -= 1;
		}
		else {
			this.woundBoxes += 1;
		}
	}

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