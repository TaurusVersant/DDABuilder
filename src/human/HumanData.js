/* Digimon Digital Adventures Hard Data */

module.exports.HumanAges = {
	'Child': { id: 'Child', ageRange: '0-14', startingCP: 30, startingCap: 3, finalCap: 5, areaCap: 20},
	'Teenager': { id: 'Teenager', ageRange: '12-30', startingCP: 40, startingCap: 5, finalCap: 7, areaCap: 20},
	'Adult': { id: 'Adult', ageRange: '16+', startingCP: 50, startingCap: 7, finalCap: 10, areaCap: 25}
};

module.exports.HumanAttributes = ['Agility', 'Body', 'Charisma', 'Intelligence', 'Willpower'];

module.exports.HumanSkills = [
	'Dodge',
	'Fight',
	'Stealth',
	'Athletics',
	'Endurance',
	'Feats of Strength',
	'Manipulate',
	'Perform',
	'Persuade',
	'Computer',
	'Survival',
	'Knowledge',
	'Perception',
	'Decipher Intent',
	'Bravery'
];

module.exports.HumanTorments = {
	'minorTorments': { id: 'Minor', boxes: 5, startingCap: 2 },
	'majorTorments': { id: 'Major', boxes: 7, startingCap: 3 },
	'terribleTorments': { id: 'Terrible', boxes: 10, startingCap: 5 }
};