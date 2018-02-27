/* Digimon Digital Adventures Digimon */

let DigimonData = require('./DigimonData.js');

let DigimonStages = DigimonData.DigimonStages;
let DigimonSizes = DigimonData.DigimonSizes;
let DigimonStats = DigimonData.DigimonStats;
let BurstModifier = DigimonData.BurstModifier;

let DigimonStageOrder = Object.keys(DigimonStages);
let ChampionIndex = DigimonStageOrder.indexOf('Champion');

/**
 * Digimon Objects act as storage elements for a single Digimon Stage
 * 
 * A Digimon Object contains the following Properties:
 *	@name 				- string containing the name of the Digimon
 *	@stage 				- string identifying the Digimon's stage in the DigimonStages global property
 *	@attributeIndex 	- int identifying the Digimon's attribute in the DigimonAttributes global property
 *	@sizeIndex 			- int identifying the Digimon's size in the DigimonSizes global property
 *	@digiPoints 		- int identifying the Digimon's available digiPoints. Starts reduced by 5 to cover the mandatory +1 for all stats
 *	@totalDigiPoints	- int identifying the Digimon's maximum digiPoints
 *	@details 			- string containing extra details for the Digimon
 *	@digimonFamilies 	- array of strings containing the Families a Digimon is part of
 *	@digimonTypes 		- array of strings containing the Types a Digimon is
 *	@stats				- object recording the five stats of a digimon, Health, Accuracy, Damage, Dodge, Armor
 *	@qualities			- array of strings representing the qualities applied
 *	@woundBoxes			- int representing the number of active wound boxes a Digimon has - can differ from derivedStats['Wound Boxes']
 *	@derivedStats		- object recording the four derived stats of a digimon, Wound Boxes, Agility, Body, Brains
 *	@specValues			- object recording the three spec values of a digimon, BIT Value, CPU Value, RAM Value
 *
 */
class Digimon {
	/**
	 * takes a stage, identifying the Digimon's Stage, and initialises default values for all stats based on Stage
	 */
	constructor (stage, name) {
		this.class = 'Digimon';
		this.name = name;
		this.stage = stage;
		this.stageIndex = DigimonStageOrder.indexOf(this.stage);
		this.attributeIndex = 0;
		this.sizeIndex = 0;

		this.digiPoints = DigimonStages[this.stage].startingDP - 5;
		this.totalDigiPoints = DigimonStages[this.stage].startingDP;

		this.details = '';

		this.digimonFamilies = [];
		this.digimonTypes = [];

		this.stats = {};
		for (let i in DigimonStats) {
			this.stats[DigimonStats[i]] = 1;
		}

		this.statMods = {
			Body: 0,
			Brains: 0,
			Agility: 0,
			SpecValues: 0,
			BaseMovement: 0,
			'Flight Speed': 0,
			'Digging Speed': 0,
			'Swim Speed': 0,
			'Wallclimb Speed': 0,
			'Jump Height': 0,
			'Jump Length': 0,
			'Teleport Distance': 0
		}

		this.qualities = [];
		this.qualityRanks = {};
		this.attackTags = {};
		this.qualityFlags = {
			'dataSpecialization': [], 
			'digizoidArmor': 0, 
			'digizoidWeapon': 0, 
			'speedyMax': false, 
			'extraMovements': 0,
			'movementDiscount': this.stageIndex < ChampionIndex
		};

		this.woundBoxes = 0;

		this.derivedStats = {};
		this.specValues = {};

		this.attacks = [];
		for (let i = 0; i < DigimonStages[this.stage].attacks; i++) {
			this.attacks.push({name: null, type: 'Melee', tags: [], damage: false});
		}

		this.buildDerivedStats();
		this.woundBoxes = this.derivedStats['Wound Boxes'];
		this.extraMovementTypes = [];
		this.buildMovement();

		this.onSwapTo();

		if (this.stage === 'Burst') {
			this.burstIndex = 0;
		}
	}

	/** STAT CONTROLLING FUNCTIONS **/

	/**
	 * builds all movement properties, eg: jump speed, swim speed, based on Digimon Stage and Qualities
	 */
	buildMovement () {
		var baseMovement = DigimonStages[this.stage].baseMovement + this.statMods['BaseMovement'];
		this.qualityFlags['speedyMax'] = false;
		var movement = this.handleRestriction(baseMovement, 'BaseMovement');

		this.movementDetails = {
			'Movement': movement,
			'Jump Height': Math.floor(movement/2),
			'Jump Length': Math.floor(movement/2),
			'Swim Speed': Math.floor(movement/2)
		};

		for (let i in this.extraMovementTypes) {
			var statMod = this.statMods.hasOwnProperty(this.extraMovementTypes[i]) ? this.statMods[this.extraMovementTypes[i]] : 0;

			switch (this.extraMovementTypes[i]) {
				case 'Flight Speed':
					if (this.qualityFlags['Advanced Mobility - Flight']) {
						statMod += this.specValues[this.qualityFlags['Advanced Mobility - Flight']];
					}
					break;
				case 'Digging Speed':
					if (this.qualityFlags['Advanced Mobility - Digger']) {
						statMod += this.specValues[this.qualityFlags['Advanced Mobility - Digger']];
					}
					break;
				case 'Swim Speed':
					if (this.qualityFlags['Advanced Mobility - Swimmer']) {
						statMod += this.specValues[this.qualityFlags['Advanced Mobility - Swimmer']];
					}
					break;
				case 'Wallclimb Speed':
					if (this.qualityFlags['Advanced Mobility - Wallclimber']) {
						statMod += this.specValues[this.qualityFlags['Advanced Mobility - Wallclimber']];
					}
					break;
				case 'Jump Height':
					if (this.qualityFlags['Advanced Mobility - Jumper']) {
						statMod += this.specValues[this.qualityFlags['Advanced Mobility - Jumper']] * 5;
					}
					break;
				case 'Jump Length':
					if (this.qualityFlags['Advanced Mobility - Jumper']) {
						statMod += this.specValues[this.qualityFlags['Advanced Mobility - Jumper']];
					}
					break;
				case 'Teleport Distance':
					statMod += baseMovement - movement;
					break;
				default:
			}

			this.movementDetails[this.extraMovementTypes[i]] = movement + statMod;
		}
	}

	/**
	 * builds all derived stats and spec values based on stats property and Digimon Stage
	 */
	buildDerivedStats () {
		this.derivedStats['Wound Boxes'] = this.stats.Health + DigimonStages[this.stage].woundBoxes;

		if (Number.isInteger(this.burstIndex)) {
			this.derivedStats['Wound Boxes'] += this.burstIndex * BurstModifier.woundBoxes;
		}

		this.derivedStats['Agility'] = Math.floor((this.stats.Accuracy + this.stats.Dodge) / 2) + this.statMods['Agility'] + DigimonSizes[this.sizeIndex].statBonus['Agility'];
		this.derivedStats['Body'] = Math.floor((this.stats.Health + this.stats.Damage + this.stats.Armor)/3) + DigimonSizes[this.sizeIndex].statBonus['Body'] + this.statMods['Body'];
		this.derivedStats['Brains'] = Math.floor(this.stats.Accuracy/2) + DigimonStages[this.stage].brains + this.statMods['Brains'];

		this.specValues['BIT Value'] = Math.floor(this.derivedStats.Brains/10) + DigimonStages[this.stage].specValues + this.statMods['SpecValues'];
		this.specValues['CPU Value'] = Math.floor(this.derivedStats.Body/10) + DigimonStages[this.stage].specValues + this.statMods['SpecValues'];
		this.specValues['RAM Value'] = Math.floor(this.derivedStats.Agility/10) + DigimonStages[this.stage].specValues + this.statMods['SpecValues'];

		this.specValues['BIT Value'] = this.handleRestriction(this.specValues['BIT Value'], 'BIT Value');
		this.specValues['CPU Value'] = this.handleRestriction(this.specValues['CPU Value'], 'CPU Value');
		this.specValues['RAM Value'] = this.handleRestriction(this.specValues['RAM Value'], 'RAM Value');
	}

	/**
	 * takes a statName and stateChange property, indicating the stat to change and direction to change it in by 1, 
	 * then calls buildDerivedStats
	 */
	changeStat (statName, statChange) {
		let updateHealth = false;

		if (statChange === '-' && this.stats[statName] > 0) {
			this.stats[statName] -= 1;
			this.digiPoints += 1;

			updateHealth = this.woundBoxes === this.derivedStats['Wound Boxes'];

			this.buildDerivedStats();
		}
		else if (statChange === '+' && this.digiPoints) {
			updateHealth = this.woundBoxes === this.derivedStats['Wound Boxes'];

			this.digiPoints -= 1;
			this.stats[statName] += 1;

			this.buildDerivedStats();
		}

		if (updateHealth) {
			this.woundBoxes = this.derivedStats['Wound Boxes'];
		}
	}

	/**
	 * Depending on if the adding flag is true, the stats identified by the modObject will be
	 * added or subtracted from the Digimon
	 *
	 * Returns either a string indicating an error, or null
	 */
	modifyStats (modObject, addingFlag) {
		if (addingFlag === true) {
			for (let statName in modObject) {
				if (modObject.hasOwnProperty(statName)) {
					if (DigimonStats.indexOf(statName) !== -1) {
						if ((this.stats[statName] + modObject[statName]) < 0) {
							// return string if stat change would lower below 0
							return 'Quality would lower ' + statName + ' below 0!';
						}
						this.stats[statName] += modObject[statName];
					} else {
						this.statMods[statName] += modObject[statName];
					}
				}
			}
		}
		else {
			for (let statName in modObject) {
				if (DigimonStats.indexOf(statName) !== -1) {
					this.stats[statName] -= modObject[statName];
				} else {
					this.statMods[statName] -= modObject[statName];
				}
			}
		}

		return null;
	}

	/**
	 * Retrieves the Wound Boxes derived stat from the Digimon, necessary as the 'Maximum Wound Boxes'
	 */
	getWoundBoxesStat () {
		return this.derivedStats['Wound Boxes'];
	}

	/**
	 * Takes a reduceFlag, which if true will reduce the Digimon's woundBoxes by 1
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

	/**
	 * Increases the total number of DigiPoints or reduces if the Digimon has at least one digipoint and more than its starting total
	 */
	modifyDigiPoints (increaseFlag) {
		if (increaseFlag) {
			this.digiPoints += 1;
			this.totalDigiPoints += 1;
		} else if (this.digiPoints !== 0 && this.totalDigiPoints > DigimonStages[this.stage].startingDP) {
			this.digiPoints -= 1;
			this.totalDigiPoints -= 1;
		}
	}

	/**
	 * Increases or decreases the Burst Index of the Burst level Digimon
	 * Decreasing will only work if you have enough DP free to reduce the Burst Level
	 */
	modifyBurstIndex (increaseFlag) {
		if (increaseFlag) {
			this.burstIndex += 1;
			this.digiPoints += BurstModifier.startingDP;
			this.totalDigiPoints += BurstModifier.startingDP;

			this.woundBoxes += BurstModifier.woundBoxes;
			this.statMods['BaseMovement'] += BurstModifier.baseMovement;
			this.statMods['Brains'] += BurstModifier.brains;
			this.statMods['SpecValues'] += BurstModifier.specValues;
		} else if (this.burstIndex !== 0 && this.digiPoints >= BurstModifier.startingDP) {
			this.burstIndex -= 1;

			this.digiPoints -= BurstModifier.startingDP;
			this.totalDigiPoints -= BurstModifier.startingDP;

			this.woundBoxes -= BurstModifier.woundBoxes;
			this.statMods['BaseMovement'] -= BurstModifier.baseMovement;
			this.statMods['Brains'] -= BurstModifier.brains;
			this.statMods['SpecValues'] -= BurstModifier.specValues;
		}

		this.buildMovement();
		this.buildDerivedStats();
	}

	/** QUALITY CONTROLLING FUNCTIONS **/

	/**
	 * Restrictions are Qualities that can only increase a stat by a specific amount
	 * This code handles ensuring restrictions are correctly applied
	 */
	handleRestriction (stat, statName) {
		var qualityName = null;
		var restrictionLimit = 1; // number of times greater the stat may grow than its base
		var restrictionModifier = 1; // value to increment stat by per quality rank

		switch (statName) {
			case 'BaseMovement':
				qualityName = 'Speedy';
				restrictionLimit = this.qualities.indexOf('Advanced Mobility - Movement') === -1 ? 1 : 2;
				restrictionModifier = 2;
				break;
			case 'BIT Value':
				qualityName = 'System Boost - BIT Value';
				break;
			case 'CPU Value':
				qualityName = 'System Boost - CPU Value';
				break;
			case 'RAM Value':
				qualityName = 'System Boost - RAM Value';
				break;
			default:
				break;
		}

		if (this.qualityRanks.hasOwnProperty(qualityName) === true) {
			if (qualityName === 'Speedy') {
				this.checkSpeedyMax(this.qualityRanks[qualityName] + 1, stat);
			}

			if (this.qualityRanks[qualityName] * restrictionModifier <= stat * restrictionLimit) {
				stat += this.qualityRanks[qualityName] * restrictionModifier;
			} else {
				// code logic ensures that the modifier is always even rounded down
				var modifierValue = stat * restrictionLimit;
				stat += modifierValue - (modifierValue % restrictionModifier);
			}
		}

		return stat;
	}

	/**
	 * Validates that the Quality can be added or removed from the Digimon and if so, adds or removes it
	 */
	purchaseQuality (quality, qualityObject, removeFlag) {
		var invalidMessage = this.purchaseStageQuality(quality, qualityObject, removeFlag);
		switch (invalidMessage) {
			case null:
				this.setStageArrayProperty('qualities', quality, removeFlag);
			case false:
				let updateHealth = this.woundBoxes === this.derivedStats['Wound Boxes'];

				this.buildDerivedStats();
				this.buildMovement();

				if (updateHealth) {
					this.woundBoxes = this.derivedStats['Wound Boxes'];
				}
				break;
			default:
		}
		return invalidMessage;
	}

	/**
	 * Determines whether the quality can be added or removed and updates DigiPoints if so
	 */
	purchaseStageQuality (quality, qualityObject, removeFlag) {
		if (removeFlag === true) {
			// If one of the qualities unlocked by this quality is also purchased, this quality cannot be removed
			var dependantQualities = qualityObject.unlocks;
			for (let i in dependantQualities) {
				let requiredRank = DigimonData.GetQuality(dependantQualities[i]).prereqs[quality];
				let currentRank = this.qualityRanks[quality];
				if (this.qualities.indexOf(dependantQualities[i]) !== -1 && requiredRank === currentRank) {
					// return string if another quality is dependant on this one
					return 'Cannot remove ' + quality + ' while Digimon has dependant quality: ' + dependantQualities[i];
				}

				if (qualityObject.handler === 'hybrid') {
					let hybridQualities = 0;
					for (let i in qualityObject.unlocks) {
						hybridQualities += this.qualities.indexOf(qualityObject.unlocks[i]) !== -1;
					}

					if (hybridQualities >= currentRank) {
						// return string if the digimon would have less hybrid ranks than hybrid qualities
						return 'Cannot remove ' + quality + ' rank while Digimon has two hybrid Qualities';
					}
				}

				if (dependantQualities[i] === 'Teleport' && quality === 'Speedy' && this.qualityRanks['Teleport'] > 0) {		
					this.checkSpeedyMax(this.qualityRanks[quality], DigimonStages[this.stage].baseMovement + this.statMods['BaseMovement']);
					if (this.qualityFlags['speedyMax'] === false && this.qualityRanks['Speedy'] === 3) {
						this.qualityFlags['speedyMax'] = true;
						return 'Cannot remove Speedy because Teleport requires either 3 or your maximum ranks in Speedy.';
					}
				}
			}

			if (qualityObject.hasOwnProperty('attackTag') === true) {
				switch (this.attackTags[qualityObject['attackTag']]) {
					case null:
					case undefined:
					case 0:
						return('Cannot remove ' + quality + ' as it is being used by an attack. Remove the Tag from the attack before removing Quality.');
					case 1:
						this.attackTags[qualityObject['attackTag']] -= 1;
						delete this.attackTags[qualityObject['attackTag']];
						break;
					default:
						this.attackTags[qualityObject['attackTag']] -= 1;
						break;
				}
			}

			if (quality === 'Signature Move') {
				for (let i in this.attacks) {
					if (this.attacks[i].tags.indexOf('[Armor Piercing]') !== -1 &&
						this.attacks[i].tags.indexOf('[Certain Strike]') !== -1
					) {
						return('Cannot remove ' + quality + ' while an attack has both [Armor Piercing] and [Certain Strike] applied.');
					}
				}
				this.qualityFlags['Signature Move'] = false;
			}

			if (quality === 'Mixed Summoner') {
				if (this.qualities.indexOf('Summoner') !== -1 && this.qualities.indexOf('Conjurer') !== -1) {
					return('Cannot remove ' + quality + ' while Digimon still has both Summoner and Conjurer');
				}
				this.qualityFlags['Mixed Summoner'] = false;
			}

			// Perform this check only after quality cost has been paid to, if necessary, apply the discount for Extra Movement
			if (qualityObject.handler === 'addMovement' && quality !== 'Teleport' && this.stageIndex >= ChampionIndex) {
				this.qualityFlags['extraMovements'] -= 1;
				this.qualityFlags['movementDiscount'] = this.qualityFlags['extraMovements'] > 0;
				DigimonData.extraMovementDiscount(this.qualityFlags['movementDiscount'], true);
			}

			this.qualityRanks[quality] -= 1;
			this.digiPoints += qualityObject.cost;

			switch (qualityObject.handler) {
				case 'addMovement':
					this.extraMovementTypes.splice(qualityObject.movementType, 1);
					this.modifyStats(qualityObject.statMods, false);
					this.buildMovement();
					break;
				case 'hybrid':
					if (this.qualityRanks[quality] === 0) {
						this.qualityFlags['hybrid'] = false;
					}
					break;
				case 'dataSpec':
					let specIndex = this.qualityFlags['dataSpecialization'].indexOf(quality);
					this.qualityFlags['dataSpecialization'].splice(specIndex, 1);
					this.modifyStats(qualityObject.statMods, false)
					break;
				case 'dataOpt':
					this.qualityFlags['dataOptimization'] = false;
					this.modifyStats(qualityObject.statMods, false)
					break;
				case 'addStat':
					this.modifyStats(qualityObject.statMods, false)
					break;
				case 'technician':
					let pairedQuality = quality === 'Firewall' ? 'Trojan' : 'Firewall';
					DigimonData.DigimonQualitiesAdvanced[pairedQuality].cost = 2;
					break;
				case 'digizoidArmor':
					this.qualityFlags['digizoidArmor'] = false;
					this.modifyStats(qualityObject.statMods, false);
					break;
				case 'digizoidWeapon':
					this.qualityFlags['digizoidWeapon'] = false;
					this.modifyStats(qualityObject.statMods, false);
					break;
				case 'advancedMobility':
					this.qualityFlags[quality] = false;
					break;
				default:
					break;
			}

			if (this.qualityRanks[quality] !== 0) {
				// return false to indicate not to remove quality
				return false;
			}
		}
		else {
			if (this.digiPoints < qualityObject.cost) {
				return 'Could not afford Quality: ' + quality;
			} else {
				var returnMessage = null;
				switch (qualityObject.handler) {
					case 'addMovement':
						if (Array.isArray(qualityObject.movementType)) {
							for (let index in qualityObject.movementType) {
								this.extraMovementTypes.push(qualityObject.movementType[index]);
							}
						} else {
							this.extraMovementTypes.push(qualityObject.movementType);
						}
						this.modifyStats(qualityObject.statMods, true);
						this.buildMovement();
						break;
					case 'hybrid':
						this.qualityFlags['hybrid'] = quality;
						break;
					case 'dataSpec':
						returnMessage = this.modifyStats(qualityObject.statMods, true)
						if (returnMessage !== null) {
							return returnMessage;
						}
						this.qualityFlags['dataSpecialization'].push(quality);
						break;
					case 'dataOpt':
						returnMessage = this.modifyStats(qualityObject.statMods, true)
						if (returnMessage !== null) {
							return returnMessage;
						}
						this.qualityFlags['dataOptimization'] = quality;
						break;
					case 'addStat':
						returnMessage = this.modifyStats(qualityObject.statMods, true)
						if (returnMessage !== null) {
							return returnMessage;
						}
						break;
					case 'technician':
						let pairedQuality = quality === 'Firewall' ? 'Trojan' : 'Firewall';
						DigimonData.DigimonQualitiesAdvanced[pairedQuality].cost = 3;
						break;
					case 'digizoidArmor':
						this.qualityFlags['digizoidArmor'] = true;
						this.modifyStats(qualityObject.statMods, true);
						break;
					case 'digizoidWeapon':
						this.qualityFlags['digizoidWeapon'] = true;
						this.modifyStats(qualityObject.statMods, true);
						break;
					case 'advancedMobility':
						this.qualityFlags[quality] = qualityObject.modifier;
						break;
					case 'summoning':
						let pairedSummonQuality = quality === 'Summoner' ? 'Conjurer' : 'Summoner';
						if (this.qualityFlags['Mixed Summoner'] !== true && this.qualities.indexOf(pairedSummonQuality) !== -1) {
							return ("Cannot purchase " + quality + " while Digimon has " + pairedSummonQuality + " without Mixed Summoner");
						}
						break;
					/*case 'note':
						var noteValue = window.prompt(qualityObject.noteText, '');
						if (noteValue && noteValue.length > 0) {
							if (this.details.length > 0) {
								this.details += '\n';
							}
							this.details += qualityObject.noteText + noteValue;
						}
						break;*/
					default:
						break;
				}

				// If the quality is signature move, inform the flags that this Digimon possesses it,
				// so that armor piercing and certain strike can be applied to the same attack
				if (quality === 'Signature Move') {
					this.qualityFlags['Signature Move'] = true;
				}

				// If the quality is Mixed Summoner, inform the flags that this DIgimon possesses it,
				// so that Summoner and Conjurer can be taken together.
				if (quality === 'Mixed Summoner') {
					this.qualityFlags['Mixed Summoner'] = true;
				}

				// Increase the number of ranks this Digimon has in this quality
				if (this.qualityRanks.hasOwnProperty(quality) !== true) {
					this.qualityRanks[quality] = 1;
				} else {
					this.qualityRanks[quality] += 1;
				}

				// Increase the number of attack tags this quality bestows
				if (qualityObject.hasOwnProperty('attackTag') === true) {
					if (this.attackTags.hasOwnProperty(qualityObject['attackTag']) !== true) {
						this.attackTags[qualityObject['attackTag']] = 1;
					} else {
						this.attackTags[qualityObject['attackTag']] += 1;
					}
				}

				// Pay the cost of the quality
				this.digiPoints -= qualityObject.cost;

				// Perform this check only after quality cost has been paid to, if necessary reverse the discount for Extra Movement
				if (qualityObject.handler === 'addMovement' && quality !== 'Teleport' && this.stageIndex >= ChampionIndex) {
					this.qualityFlags['extraMovements'] += 1;
					this.qualityFlags['movementDiscount'] = true;
					DigimonData.extraMovementDiscount(this.qualityFlags['movementDiscount'], true);
				}

			}

		}

		// Return null to indicate successful completion
		return null;
	}

	/**
	 * Sets the flag indicating the speedy quality has maxed out if twice the speedyRanks is greater than or equal to the baseMovement
	 */
	checkSpeedyMax (speedyRanks, baseMovement) {
		this.qualityFlags['speedyMax'] = speedyRanks * 2 > baseMovement;
	}

	/**
	 * Adds or removes an attackTag from one of the Digimon's attacks
	 */
	applyAttackTag (index, tagName, removeTag = false) {
		let attacks = this.getProperty('attacks');

		if (tagName === '[Armor Piercing]' || tagName === '[Certain Strike]') {
			this.qualityFlags[tagName] = !removeTag;
		}

		if (removeTag === true) {
			attacks[index].tags.splice(attacks[index].tags.indexOf(tagName), 1);

			if (this.attackTags[tagName] === undefined) {
				this.attackTags[tagName] = 0;
			}
			this.attackTags[tagName] += 1;
		} else {
			attacks[index].tags.push(tagName);

			this.attackTags[tagName] -= 1;
			if (this.attackTags[tagName] === 0) {
				delete this.attackTags[tagName];
			}
		}
	}

	/** GENERAL FUNCTIONS **/

	/**
	 * getter method for the Digimon
	 */
	getProperty (propertyName) {
		return this[propertyName];
	}

	/**
	 * setter method for the Digimon
	 */
	setProperty (propertyName, value) {
		this[propertyName] = value;

		if (propertyName === 'sizeIndex') {
			this.buildDerivedStats();
		}
	}

	/**
	 * Takes a propertyName of the Digimon array property to adjust, either removing or adding the value
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
	 * Function to be called to update values necessary when this Digimon object is swapped to
	 */
	onSwapTo () {
		DigimonData.extraMovementDiscount(this.qualityFlags['movementDiscount'], this.stageIndex >= ChampionIndex);
		DigimonData.DigimonQualitiesAdvanced['Trojan'].cost = this.qualities.indexOf('Firewall') !== -1 ? 3 : 2;
		DigimonData.DigimonQualitiesAdvanced['Firewall'].cost = this.qualities.indexOf('Trojan') !== -1 ? 3 : 2;
	}

	/**
	 * Builds a json string representing the Digimon object
	 */
	saveToJSON () {
		let digimonJSON = JSON.stringify(this);

		return digimonJSON;
	}

	/**
	 * Populates the Digimon object from a json string
	 */
	loadFromJSON (digimonObject) {
		//let digimonObject = JSON.parse(digimonJSON);

		for (let property in digimonObject) {
			this[property] = digimonObject[property];
		}

		if (Number.isInteger(digimonObject.burstIndex)) {
			this.burstIndex = 0;
			for (let i = 0; i < digimonObject.burstIndex; i++) {
				this.modifyBurstIndex(true);
			}
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

module.exports.createDigimon = function (stage, name) {
	return new Digimon(stage, name);
}