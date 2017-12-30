/* Digimon Digital Adventures Human */

let HumanData = require('./HumanData.js');
let HumanAges = HumanData.HumanAges;
let HumanAttributes = HumanData.HumanAttributes;
let HumanSkills = HumanData.HumanSkills;
let HumanTorments = HumanData.HumanTorments;

/**
 * Storage element for a Human character, maintaining stats and details and ensuring rule consistency
 */
class Human {
	constructor (age, name) {
		this.class = 'Human';
		this.name = name;
		this.age = age;

		this.creationPoints = HumanAges[this.age].startingCP;
		this.totalCreationPoints = HumanAges[this.age].startingCP;

		this.details = "";

		this.majorAspects = [''];
		this.minorAspects = [''];

		this.minorTorments = [
			{id:'', checked: 0},
			{id:'', checked: 0}
		];
		this.majorTorments = [];
		this.terribleTorments = [];

		this.attributes = {};
		for (let i in HumanAttributes) {
			this.attributes[HumanAttributes[i]] = 0;
		}

		this.skills = {};
		for (let i in HumanSkills) {
			this.skills[HumanSkills[i]] = 0;
		}

		this.sanityDrain = 0;
		this.inspiration = 1;
		
		this.specialStats = {
			'Sanity Drain': 0,
			'Inspiration': 1
		}

		this.flags = {
			'creationComplete': false,
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

	/**
	 * Adds or removes a major or minor aspect from the character
	 */
	updateAspect (aspectType, aspect, index, removeFlag) {
		if (removeFlag === true) {
			this[aspectType].splice(index, 1);
		} else {
			this[aspectType][index] = aspect;
		}
	}

	/**
	 * Adds or removes a major or minor aspect from the character
	 */
	updateTorment (tormentType, torment, index, removeFlag) {
		if (removeFlag === true) {
			this[tormentType].splice(index, 1);
		} else {
			this[tormentType][index] = {id: torment, checked: 0};
		}
	}

	/**
	 * Increases or decreases the progress a character is making with a torment
	 */
	checkTorment (tormentType, index, checked) {
		if (
			checked === true &&
			(
				this.flags.creationComplete === true ||
				(
					this[tormentType][index].checked < HumanTorments[tormentType].startingCap &&
					this.creationPoints > 0
				)
			)
		) {
			this[tormentType][index].checked += 1;
			if (this.flags.creationComplete === false) {
				this.creationPoints -= 1;
			}
		} else if (checked === false) {
			this[tormentType][index].checked -= 1;

			if (this.flags.creationComplete === false) {
				this.creationPoints += 1;
			}
		}
	}

	/**
	 * Receives a flag indicating whether or not initial character creation has been completed
	 */
	completeCreation (creationComplete) {
		this.flags.creationComplete = creationComplete;
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

	/**
	 * Increases or decreases the special stats Sanity Drain and Inspiration based on predefined rules
	 */
	changeSpecialStat (statName, statChange) {
		if (statChange === '-' && this[statName] > 0) {
			this[statName] -= 1;
		} else if (statChange === '+') {
			if (statName === 'sanityDrain' && (this[statName] < this.getSanityDrainCap())) {
				this[statName] += 1;
			} else if (statName === 'inspiration' && this[statName] < this.getInspirationCap()) {
				this[statName] += 1;
			}
		}
	}

	/**
	 * Determines the current Sanity Drain cap
	 */
	getSanityDrainCap () {
		let maxSanDrain = 0;
		if (this.attributes['Willpower'] > this.skills['Bravery']) {
			maxSanDrain = this.attributes['Willpower'] - 2;
		} else {
			maxSanDrain = this.skills['Bravery'] - 2;
		}

		return maxSanDrain > 0 ? maxSanDrain : 0;
	}

	/**
	 * Determines the current Inspiration cap
	 */
	getInspirationCap () {
		return this.attributes['Willpower'] ? this.attributes['Willpower'] : 1;
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
		let statCap = this.flags.creationComplete ? HumanAges[this.age].finalCap : HumanAges[this.age].startingCap;

		if (statChange === '-' && statSet[statName] > 0) {
			if (statSet[statName] === statCap) {
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
			statSet[statName] < statCap &&
			(this.flags.creationComplete === true || this.flags[spentFlag] < HumanAges[this.age].areaCap)
		) {
			if (this.flags[maxFlag] && (this.flags.creationComplete === false && statSet[statName] + 1 === HumanAges[this.age].startingCap)) {
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