/* Digimon Digital Adventures Modifiable Data */

module.exports.DigimonAttributes = [
	{ id: "None" },
	{ id: "Vaccine" },
	{ id: "Virus" },
	{ id: "Data" }
];

module.exports.DigimonFamilies = [
	{ id: "Nature Spirits", desc: "Animal or Monster Digimon. They tend to prefer deserts and harsh climates." },
	{ id: "Deep Savers", desc: "Deep sea, artic, or some type aquatic Digimon fit into this Family." },
	{ id: "Nightmare Soldiers", desc: "Undead or Demonic Digimon, they tend to inhabit graveyards or abandoned buildings." },
	{ id: "Wind Guardians", desc: "Bird or air-based Digimon. They tend to prefer open, grassy areas, if they ever land." },
	{ id: "Metal Empire", desc: "Machine or Cyborg Digimon. They tend to prefer cities and factories to inhabit." },
	{ id: "Dark Empire", desc: "Terrifying, apocalyptic Digimon, or Digimon who dwell in the Dark Area." },
	{ id: "Virus Busters", desc: "Holy or Angelic Digimon. They do not always show a preference for where they live." },
	{ id: "Dragon's Roar", desc: "Draconic Digimon, or Digimon who favor mountain or volcanic areas to live in." },
	{ id: "Jungle Troopers", desc: "Insect or Plant Digimon, or Digimon who favor jungles and forests to live in." },
	{ id: "Unknown", desc: "Digimon which are strange or mutated in some way, and do not fit into another Family." }
];

/* Digimon Digital Adventures Hard Data */

module.exports.DigimonStages = {
	"Fresh": { id: "Fresh", startingDP: 5, baseMovement: 2, woundBoxes: 0, brains: 0, attacks: 1, specValues: 0 },
	"In-Training": { id: "In-Training", startingDP: 15, baseMovement: 4, woundBoxes: 1, brains: 1, attacks: 2, specValues: 0 },
	"Rookie": { id: "Rookie", startingDP: 25, baseMovement: 6, woundBoxes: 2, brains: 3, attacks: 2, specValues: 1 },
	"Champion": { id: "Champion", startingDP: 40, baseMovement: 8, woundBoxes: 5, brains: 5, attacks: 3, specValues: 2 },
	"Ultimate": { id: "Ultimate", startingDP: 55, baseMovement: 10, woundBoxes: 7, brains: 7, attacks: 4, specValues: 3 },
	"Mega": { id: "Mega", startingDP: 70, baseMovement: 12, woundBoxes: 10, brains: 10, attacks: 5, specValues: 4 },
	"Burst": { id: "Burst", startingDP: 85, baseMovement: 14, woundBoxes: 14, brains: 13, attacks: 5, specValues: 5 }
};

module.exports.BurstModifier = {
	startingDP: 15,
	baseMovement: 2,
	woundBoxes: 4,
	brains: 3,
	specValues: 1
}

module.exports.DigimonSizes = [
	{ id: "Tiny", area: "1x1", squareMeters: "1+", bodyBonus: 0, notes: "May occupy squares that another Digimon or Tamer are standing in." },
	{ id: "Small", area: "1x1", squareMeters: "1+", bodyBonus: 2, notes: "May move through squares that other Digimon or Tamers are standing in." },
	{ id: "Medium", area: "1x1", squareMeters: "1+", bodyBonus: 4, notes: "" },
	{ id: "Large", area: "2x2", squareMeters: "4+", bodyBonus: 6, notes: "" },
	{ id: "Huge", area: "3x3", squareMeters: "9+", bodyBonus: 8, notes: "" },
	{ id: "Gigantic", area: "4+x4+", squareMeters: "16+", bodyBonus: 10, notes: "" }
];

module.exports.DigimonStats = ["Health", "Accuracy", "Damage", "Dodge", "Armor"];

module.exports.DigimonQualityTags = ["S", "A", "T"];

module.exports.DigimonQualityTagsFull = {
	S: "Qualities which sport the Static Tag are Qualities which are, in short, always on. The Digimon is always considered effected by this Quality unless something happens to disable it.",

	A: "Qualities which have the Attack Tag are Qualities which help directly modify Attacks of the Digimon. While most Qualities modifying Attack are for a single Attack, some may be able to modify more than a single Attack.",

	T: "Trigger Qualities are ones that require a ‘trigger’ to occur. That is to say; they need to have the player activate them in some manner; whether by using an Action in Combat, or by having the enemy miss with an Attack."
}

module.exports.DigimonQualities = {
	"Agility": {tags: ["S"], cost: 3, maxRanks: false, desc: "The Digimon may re-roll any dice that show up as 1’s when making a Dodge roll.", unlocks: ["Avoidance"], handler: "ability" },

	"Area Attack - Blast": {tags: ["A", "T"], cost: 2, maxRanks: false, desc: "Ranged only: Blast Attacks create a circular zone whose origin point is somewhere within the user’s Range. The radius is 1 Meter at base, but the user may add their Bit Value to the radius.", unlocks: [], handler: "attack", attackTag: "[Blast]" },

	"Area Attack - Burst": {tags: ["A", "T"], cost: 2, maxRanks: false, desc: "Melee/Ranged: Burst Attacks create a circular zone with the user at the point of origin. The base radius is 1 Meter, however the user may add their Bit Value+1 to the radius. The [Burst] goes outward from the user, and thus the user is not considered a target for the purposes of Damage or Effects.", unlocks: [], handler: "attack", attackTag: "[Burst]" },

	"Area Attack - Close Blast": {tags: ["A", "T"], cost: 2, maxRanks: false, desc: "Melee/Ranged: Close Blasts originate in a circular zone adjacent to the user. The circle’s base diameter is 4 Meters. The user may add their Bit Value to the diameter.", unlocks: [], handler: "attack", attackTag: "[Close Blast]" },

	"Area Attack - Cone": {tags: ["A", "T"], cost: 2, maxRanks: false, desc: "Melee/Ranged: Cone Attacks create a equilateral triangle, or a cone, which originates adjacent to the user. The shape has a base length of 3 meters. The user may add their Bit Value to the length.", unlocks: [], handler: "attack", attackTag: "[Cone]" },

	"Area Attack - Line": {tags: ["A", "T"], cost: 2, maxRanks: false, desc: "Melee/Ranged: Line Attacks create a pillar which originate adjacent to the user. The pillar’s length is 5 meters at base. The user may add double their Bit value to the length. The pillar’s width is 1 at base, but the user may add 1 to the width for each Size Class they are above Large. If the pillar would hit a solid wall, it may ‘bounce’ off of the wall, and potentially hit additional targets.", unlocks: [], handler: "attack", attackTag: "[Line]" },

	"Area Attack - Pass": {tags: ["A", "T"], cost: 2, maxRanks: false, desc: "Melee only: Pass Attacks have the user charge in a straight line in a given direction, hitting every target along the way. Once the Pass Attack is called, the direction can not be changed. They may move a distance equal to a chosen Movement score, and then continue to move an additional number of meters equal to (or less than) their RAM Value. A Pass Attack requires Movement to use; so if the user has a Pass Attack they must use up two Simple Actions to use it. However, if the Pass Attack has the [Charge] Tag, this rule is ignored and the Pass Attack only takes up one Simple Action.", unlocks: [], handler: "attack", attackTag: "[Pass]" },

	"Armor Piercing": {tags: ["A"], cost: 1, maxRanks: 3, desc: "Choose one Attack. That Attack ignores up to X points that any defending Digimon has in Armor, where X is double the Ranks you have of Armor Piercing. Armor Piercing may only be applied to one Attack per Digimon. A Digimon may not have Armor Piercing and Certain Strike on the same Attack.", unlocks: [], handler: "attack", attackTag: "[Armor Piercing]" },

	"Attack Effect - Immobilize (N)": {tags: ["A"], cost: 1, maxRanks: 0, desc: "The target takes a penalty to their Movement equal to the user’s Bit Value x2 for the duration of the Effect. This Effect may lower a target’s Movement to 0.", unlocks: [], handler: "attack", attackTag: "[Immobilize]" },

	"Attack Effect - Knockback (N)": {tags: ["A"], cost: 1, maxRanks: 0, desc: "The target is forcibly pushed away from the user a number of meters equal to the user’s CPU Value. This Effect has no Duration. If the target would be pushed into a solid object such as a wall, use the falling guidelines for the damage it takes. If it would be pushed into a group of enemy Digimon, use the throwing guidelines for the damage each party takes.", unlocks: [], handler: "attack", attackTag: "[Knockback]" },

	"Attack Effect - Taunt (N)": {tags: ["A"], cost: 1, maxRanks: 0, desc: "The target takes an Accuracy penalty for attacking anyone who is not the user of the Taunt Effect equal to the user’s CPU Value x2 for the duration of this Effect. If the Attacker uses an Area Attack which has the user as a target, it instead takes a penalty of the user’s CPU-2 for the Accuracy roll.", unlocks: [], handler: "attack", attackTag: "[Taunt]" },

	"Attack Effect - Fear (N)": {tags: ["A"], cost: 1, maxRanks: 0, desc: "The target takes an Accuracy penalty for attacking the user of this Effect equal to the user’s Bit Value for the duration of this Effect. If the target was Clashing with the user, the Clash ends, and it may not Initiate Clashes with the user for the duration.", unlocks: [], handler: "attack", attackTag: "[Fear]" },

	"Attack Effect - Poison (N)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The target takes a set amount of unalterable Wound Box Damage equal to the user’s Bit Value at the end of each round. Poison’s minimum duration is 3 rounds.", unlocks: [], handler: "attack", attackTag: "[Poison]" },

	"Attack Effect - Confuse (N)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The target takes a penalty to Accuracy and Dodge equal to the target’s CPU value or Bit value (whichever is higher), for the duration of the Effect.", unlocks: [], handler: "attack", attackTag: "[Confuse]" },

	"Attack Effect - Stun (N)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The target loses a Simple Action each round for the duration of the Effect. If the target was Clashing, the Clash ends.", unlocks: [], handler: "attack", attackTag: "[Stun]" },

	"Attack Effect - Lifesteal (P)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "This Attack heals a number of the user’s Wound Boxes equal to the user’s CPU value. If the Attack deals damage less than the user’s CPU value, it instead heals for that amount instead. However, you may use this Attack as a Complex Action in order to double the Lifesteal Effect’s potency. Lifesteal has no Duration.", unlocks: [], handler: "attack", attackTag: "[Lifesteal]" },

	"Attack Effect - Vigor (P)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The target gains a bonus to their Dodge and Movement scores equal to the user’s Bit Value for the duration of this Effect.", unlocks: [], handler: "attack", attackTag: "[Vigor]" },

	"Attack Effect - Fury (P)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The target gains a bonus to their Accuracy and Damage scores equal to the user’s Bit value for the duration of this Effect.", unlocks: [], handler: "attack", attackTag: "[Fury]" },

	"Attack Effect - Cleanse (P)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The user may reduce the duration of a number of Effects equal to the leftover Accuracy Dice (for example, if there were 3 Leftover Accuracy dice, it may target up to 3 Effects), and reduce their duration by a number of turns equal to their Bit Value. Even if applied to an [Area] Attack, Cleanse may only target a total number of Effects equal to the highest number of leftover accuracy dice from among the targets.", unlocks: [], handler: "attack", attackTag: "[Cleanse]" },

	"Attack Effect - Haste (P)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The target of the Attack gains an additional Simple Action to use for one round. This Effect has no Duration. An Attack with the Haste Effect must be used as a Complex Action.", unlocks: [], handler: "attack", attackTag: "[Haste]" },

	"Attack Effect - Strengthen (P)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The target gains a bonus to its Damage and Armor equal to the user’s Bit Value for the duration of this Effect.", unlocks: [], handler: "attack", attackTag: "[Strengthen]" },

	"Attack Effect - Weaken (N)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The target takes a penalty to its Damage and Armor equal to the user’s Bit Value for the duration of this Effect.", unlocks: [], handler: "attack", attackTag: "[Weaken]" },

	"Attack Effect - Swiftness (P)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The target gains a bonus to its Dodge and Accuracy equal to the user’s Bit Value for the duration of this Effect.", unlocks: [], handler: "attack", attackTag: "[Swiftness]" },

	"Attack Effect - Vigilance (P)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The target gains a bonus to its Dodge and Armor equal to the user’s Bit Value for the duration of this Effect.", unlocks: [], handler: "attack", attackTag: "[Vigilance]" },

	"Attack Effect - Distract (N)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The target takes a penalty to its Dodge and Accuracy equal to the user’s Bit Value for the duration of this Effect.", unlocks: [], handler: "attack", attackTag: "[Distract]" },

	"Attack Effect - Exploit (N)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The target takes a penalty to its Armor and Dodge equal to the user’s Bit Value for the duration of this Effect.", unlocks: [], handler: "attack", attackTag: "[Exploit]" },

	"Attack Effect - Pacify (N)": {tags: ["A"], cost: 2, maxRanks: 0, desc: "The target takes a penalty to its Damage and Accuracy equal to the user’s Bit Value for the duration of this Effect.", unlocks: [], handler: "attack", attackTag: "[Pacify]" },

	"Attack Effect - Blind (N)": {tags: ["A"], cost: 3, maxRanks: 0, desc: "The target takes a penalty to their Accuracy and Dodge equal to the user’s Bit Value. Additionally, the target automatically fails sight-based Perception checks for the duration of this Effect.", unlocks: [], handler: "attack", attackTag: "[Blind]" },

	"Attack Effect - Paralysis (N)": {tags: ["A"], cost: 3, maxRanks: 0, desc: "The target treats all terrain as Difficult Terrain for the duration of the effect and takes a penalty to their Dodge equal to the user’s Bit value. If the target was Clashing, the Clash ends.", unlocks: [], handler: "attack", attackTag: "[Paralysis]" },

	"Attack Effect - Charm (N)": {tags: ["A"], cost: 3, maxRanks: 0, desc: "The user takes control of the target’s actions for the duration of this Effect. However, for the duration of the Effect, the user must use 2 Simple Actions per round in order to maintain concentration. The Charmed target(s) are still treated as enemies for the purposes of Qualities which affect allies or enemies. If the Charmed target(s) would be hit by the user’s allies, the effect ends. Once an Enemy has been Charmed, it cannot be Charmed again by the same source until combat ends.", unlocks: [], handler: "attack", attackTag: "[Charm]" },

	"Attack Effect - Shield (P)": {tags: ["A"], cost: 3, maxRanks: 0, desc: "The target gains an amount of Temporary Wound Boxes equal to the user’s Bit value. You cannot use a Shield Effect more than once per Round, but may increase the potency to your Bit value x3 by making an Attack with [Shield] a Complex Action instead for that round. Temporary Hit Points are removed at the end of combat.", unlocks: [], handler: "attack", attackTag: "[Shield]" },

	"Attack Effect - Regenerate (P)": {tags: ["A"], cost: 3, maxRanks: 0, desc: "The target regains Wound Boxes at the start of each round equal to the user’s Bit Value for the duration if this Effect. While under the effects of Regenerate, the target is also treated as if they had two additional ranks of Resistant.", unlocks: [], handler: "attack", attackTag: "[Regenerate]" },

	"Certain Strike": {tags: ["A"], cost: 2, maxRanks: 3, desc: "Choose one Attack. That Attack now negates up to X Successful Dodge dice that any defending Digimon roll, where X is the ranks you have in Certain Strike. Certain Strike may only be applied to one Attack per Digimon. A Digimon may not have Certain Strike and Armor Piercing on the same Attack.", unlocks: ["Signature Move"], handler: "attack", attackTag: "[Certain Strike]" },

	"Charge Attack": {tags: ["A"], cost: 1, maxRanks: 0, desc: "Choose a [Melee] Attack. By applying the [Charge] Tag to that Attack, the Digimon may use the Attack and move as one Simple Action, instead of needing to use two Simple Actions; one to Attack and one to Move. In short a [Charge] Tag allows the Digimon to use the tagged Attack to move and Attack at the same time.", unlocks: [], handler: "attack", attackTag: "[Charge]" },

	"Combat Awareness I": {tags: ["A"], cost: 1, maxRanks: false, desc: "Add your Ranks in Combat Awareness to your Initiative in the first round of Combat.", unlocks: ["Combat Awareness II"], handler: "ability" },

	"Combat Awareness II": {tags: ["A"], cost: 1, maxRanks: false, desc: "Add your Ranks in Combat Awareness to your Dodge for the first round of Combat.", prereqs: {"Combat Awareness I": 1}, unlocks: ["Combat Awareness III"], handler: "ability" },

	"Combat Awareness III": {tags: ["A"], cost: 1, maxRanks: false, desc: "Add your Ranks in Combat Awareness to your Accuracy for the first round of Combat.", prereqs: {"Combat Awareness II": 1}, unlocks: [], handler: "ability" },

	"Combat Monster": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever the Digimon takes damage, it gains a cumulative bonus to the Damage of its next successful Attack equal to the number of Wound Boxes it has lost since the last successful Attack. For example, if the Digimon takes 4 damage, misses, takes 3 damage, then connects, the Attack deals an additional 7 Damage and then the bonus resets.", unlocks: ["Berserker"], handler: "ability" },

	"Conjurer": {tags: ["T"], cost: 3, maxRanks: false, desc: "You may not take this Quality and Summoner unless you have taken Mixed Summoner. Upon taking this Quality, the Digimon gains a Summon Pool equal to its Bit Value x3. Each cubic meter of Summoned Object made takes up 1 points from the Summon Pool. Objects are summoned as a Complex Action. Be sure to establish what variety and types of things your Digimon can create when taking this Quality, as it cannot be changed later. For example, a Digimon could be able to create wooden blocks, but not magically be able to also create metal bars out of thin air. Summoned Objects have Wounds equal to the user’s Bit Value x3, Armor Equal to the user’s Bit Value x2, and do not have a Dodge pool. When stacked on top of each other or created in a combined manner, the objects can serve as Blocking Terrain, which will stop any Attacks from going through them to harm whatever is behind it (they can still be harmed and destroyed by the Attack, it simply protects those behind it). Even if the Objects are destroyed, they may only be summoned once every other turn. Summoned Objects may only be created and placed within the user’s [Burst][Ranged] radius.", unlocks: [], handler: "summoning" },

	"Counterattack": {tags: ["T"], cost: 2, maxRanks: false, desc: "Once per combat, if an enemy were to miss with an Attack, you may make a free attack with them as the sole target (you may not use this Quality while also using the attack as an Area Attack). You may choose any Attack on your Attack List otherwise. The target only rolls half of their Dodge Pool in response to the new Attack.", unlocks: ["Counterblow"], handler: "ability" },

	"Data Optimization - Close Combat": {tags: ["S"], cost: 1, maxRanks: false, desc: "The Digimon adds +2 to its Accuracy Pool when using a [Melee] tagged Attack, but takes a -1 penalty to its Accuracy Pool when using a [Ranged] tagged Attack.", unlocks: ["Data Specialization - Fistful of Force", "Data Specialization - Flurry", "Hybrid Drive - Close Combat Adjacent"], handler: "dataOpt" },

	"Data Optimization - Ranged Striker": {tags: ["S"], cost: 1, maxRanks: false, desc: "The Digimon adds +2 to its Accuracy when using a [Ranged] tagged Attack, but suffers a -1 penalty to its Dodge pool when defending against a [Melee] tagged Attack.", unlocks: ["Data Specialization - Sniper", "Data Specialization - Mobile Artillery", "Hybrid Drive - Ranged Striker Adjacent"], handler: "dataOpt" },

	"Data Optimization - Guardian": {tags: ["S"], cost: 1, maxRanks: false, desc: "The Digimon gains a +2 Armor bonus, but takes a -1 penalty to its Base Movement score.", unlocks: ["Data Specialization - What Goes Around", "Data Specialization - True Guardian", "Hybrid Drive - Guardian Adjacent"], handler: "dataOpt", statMods: { Armor: 2, BaseMovement: -1 } },

	"Data Optimization - Brawler": {tags: ["S"], cost: 2, maxRanks: false, desc: "The Digimon gains a +2 bonus to all checks it makes when Clashing. In addition, it is treated as if it were one Size Class larger when Clashing. Gigantic Digimon with Brawler Optimization gain a flat +4 to all checks it makes while Clashing.", unlocks: ["Data Specialization - Power Throw", "Data Specialization - Wrestlemania", "Hybrid Drive - Brawler Adjacent"], handler: "dataOpt" },

	"Data Optimization - Speed Striker": {tags: ["S"], cost: 1, maxRanks: false, desc: "The Digimon gains a +3 bonus to its Base Movement score, but gains a -1 Dodge penalty.", unlocks: ["Data Specialization - Hit and Run", "Data Specialization - Uncatchable Target", "Hybrid Drive - Speed Striker Adjacent"], handler: "dataOpt", statMods: { BaseMovement: 3, Dodge: -1 } },

	"Data Optimization - Effect Warrior": {tags: ["S"], cost: 2, maxRanks: false, desc: "The Digimon gains a +1 bonus to its base Spec Values, but suffers a -2 Armor penalty.", unlocks: ["Data Specialization - Black Mage", "Data Specialization - White Mage", "Hybrid Drive - Effect Warrior Adjacent"], handler: "dataOpt", statMods: { Armor: -2, SpecValues: 1 } },

	"Extra Movement - Flight": {tags: ["S"], cost: 2, maxRanks: false, desc: "The Digimon is capable of flying through the air.", unlocks: ["Advanced Mobility - Flight"], handler: "addMovement", movementType: "Flight Speed" },

	"Extra Movement - Digger": {tags: ["S"], cost: 1, maxRanks: false, desc: "The Digimon is capable of burrowing through the ground, so long as it’s as soft as dirt. Snow or sand are other alternatives.", unlocks: ["Advanced Mobility - Digger"], handler: "addMovement", movementType: "Digging Speed" },

	"Extra Movement - Swimmer": {tags: ["S"], cost: 1, maxRanks: false, desc: "The Digimon is capable of moving through the water at a much faster speed than normal.", unlocks: ["Advanced Mobility - Swimmer"], handler: "addMovement", movementType: "Swim Speed" },

	"Extra Movement - Wallclimber": {tags: ["S"], cost: 1, maxRanks: false, desc: "The Digimon is capable of scaling vertical surfaces, but not on ceilings.", unlocks: ["Advanced Mobility - Wallclimber"], handler: "addMovement", movementType: "Wallclimb Speed" },

	"Extra Movement - Jumper": {tags: ["S"], cost: 1, maxRanks: false, desc: "The Digimon is capable of jumping at a height and length equal to its Movement.", unlocks: ["Advanced Mobility - Jumper"], handler: "addMovement", movementType: ["Jump Height", "Jump Length"] },

	"Hide in Plain Sight": {tags: ["S"], cost: 2, maxRanks: false, desc: "Anyone attempting to spot the user of the Hide in Plain Sight Quality takes a penalty to their Roll to find them (usually Perception) equal to double the Digimon’s RAM value. The Digimon may become transparent, be capable of disguising itself to be less obvious, or maybe just really good at finding a place to hide.", unlocks: ["Sneak Attack", "Shade Cloak"], handler: "ability" },

	"Huge Power": {tags: ["S"], cost: 3, maxRanks: false, desc: "The Digimon may re-roll any dice that show up as 1’s on a Accuracy roll.", unlocks: ["Overkill"], handler: "ability" },

	"Improved Derived Stat - Body": {tags: ["S"], cost: 1, maxRanks: 0, desc: "Whenever you take Improved Derived Stat - Body, increase your Body Derived Stat by 1. If a Stat has been chosen for a Digimon’s Improved Derived Stat, it now counts as “trained” and instead of adding the appropriate Spec Value (BIT, RAM, or CPU) when making a Skill Check, the Digimon instead adds ½ of the corresponding Derived Stat (Brains, Agility, or Body).", unlocks: ["Prodigious Skill - Athletics", "Prodigious Skill - Endurance", "Prodigious Skill - Feats of Strength"], handler: "addStat", statMods: { Body: 1 }  },

	"Improved Derived Stat - Brains": {tags: ["S"], cost: 1, maxRanks: 0, desc: "Whenever you take Improved Derived Stat - Brains, increase your Brains Derived Stat by 1. If a Stat has been chosen for a Digimon’s Improved Derived Stat, it now counts as “trained” and instead of adding the appropriate Spec Value (BIT, RAM, or CPU) when making a Skill Check, the Digimon instead adds ½ of the corresponding Derived Stat (Brains, Agility, or Body).", unlocks: ["Prodigious Skill - Manipulate", "Prodigious Skill - Perform", "Prodigious Skill - Persuade", "Prodigious Skill - Computer", "Prodigious Skill - Survival", "Prodigious Skill - Knowledge", "Prodigious Skill - Perception", "Prodigious Skill - Decipher Intent", "Prodigious Skill - Bravery"], handler: "addStat", statMods: { Brains: 1 }  },

	"Improved Derived Stat - Agility": {tags: ["S"], cost: 1, maxRanks: 0, desc: "Whenever you take Improved Derived Stat - Agility, increase your Agility Derived Stat by 1. If a Stat has been chosen for a Digimon’s Improved Derived Stat, it now counts as “trained” and instead of adding the appropriate Spec Value (BIT, RAM, or CPU) when making a Skill Check, the Digimon instead adds ½ of the corresponding Derived Stat (Brains, Agility, or Body).", unlocks: ["Prodigious Skill - Dodge", "Prodigious Skill - Fight", "Prodigious Skill - Stealth"], handler: "addStat", statMods: { Agility: 1 }  },

	"Mode Change": {tags: ["T"], cost: 2, maxRanks: 0, desc: "For each Rank you take of Mode Change, pick two Stats. As a Simple Action, you can swap the two Stats around. Each time you take this Quality, choose a combination you have not taken before. Health may not be chosen as a Stat for this Quality. Use only the Base Stat when doing the math, it is not changed by things like Stances or Directing.", unlocks: ["Mode Change X.0"], handler: "ability" },

	"Naturewalk": {tags: ["S"], cost: 1, maxRanks: 0, desc: "The Digimon is at home on a certain type of Terrain. For each Rank you take in this Quality, choose a different type of Terrain such as, but not limited to: Tundra, Forest, Mountain, Jungle, or Desert. Be sure to talk to your GM when taking this Quality; they might not have a lot of the Terrain in mind for their campaign. The Digimon does not suffer Movement penalties from Difficult Terrain of its chosen environment.", unlocks: ["Element Master"], handler: "ability" },

	"Pack Master": {tags: ["T"], cost: 3, maxRanks: false, desc: "If a Digimon with the Pack Master Quality would be targeted by an Attack, a nearby ally may Intercede without taking any penalties on their next round. This Quality may only be activated once per combat.", unlocks: [], handler: "ability" },

	"Pack Tactics": {tags: ["S"], cost: 3, maxRanks: false, desc: "Whenever this Digimon is either within the Digimon’s [Burst] Radius of an ally, or it and an ally are both adjacent to an enemy, the Digimon gains a bonus to its Accuracy equal to its own RAM Value. This only applies to the Digimon who has Pack Tactics.", unlocks: ["Coordinated Assault"], handler: "ability" },

	"Quick Healer": {tags: ["T"], cost: 2, maxRanks: false, desc: "The Digimon may re-roll any dice that show up as 1’s when making a Recovery check.", unlocks: ["Regenerator"], handler: "ability" },

	"Reach": {tags: ["S"], cost: 3, maxRanks: 0, desc: "The Digimon is able to use [Melee] Attacks and Initiate Clashes at a Range equal to the number of Ranks in this Quality doubled (for example, if the Digimon has Reach Rank 3, it can make Melee Attacks up to 6 meters away from itself). If the Digimon uses a [Melee] Attack with an Area Tag, they may have the point of origin be anywhere within its reach. [Melee] Attacks take a penalty to Accuracy as if they were [Ranged] Attacks based on the distance.", unlocks: [], handler: "ability" },

	"Resistant": {tags: ["S"], cost: 1, maxRanks: 0, desc: "For each Rank in Resistant a Digimon has, it decreases the duration of incoming [Effect] Tagged Attacks by 2 Rounds (this Quality cannot bring the Duration below 1 Round (3 Rounds for Poison).", unlocks: ["Decisive Defenses"], handler: "ability" },

	"Slayer": {tags: ["S"], cost: 2, maxRanks: false, desc: "Slayer is a very specific Quality: when you purchase this Quality, choose a type of target based on a Family or Type of Digimon (Dragon, Demon, Beast, etc). The Digimon gains a bonus equal to its RAM value when making Accuracy checks against targets who match its preferred enemy which was chosen above. Additionally, if the Digimon fits into one of these Families or Types itself, on a Missed Attack it takes unalterable damage equal to its CPU Value. For example, a WarGreymon with a bonus against Dragon Digimon would take damage on a miss, being a Dragon Man type Digimon itself.",  unlocks: [], handler: "ability" },

	"Selective Targeting": {tags: ["S"], cost: 3, maxRanks: false, desc: "The Digimon’s [Area] tagged Attacks will no longer be able to Damage Allies or place negative Effects on them such as Poison, Weaken, or Blind. Inversely, enemies the Digimon Attack will not be able to gain benefits from positive Effects such as Shielding, Strengthen, or Cleanse. Allies now only roll ½ of their normal Dodge in response to a Positive Effect. This does not apply if the Attack has a single target.", unlocks: [], handler: "ability" },
	
	"Self-Targeting": {tags: ["A"], cost: 2, maxRanks: 0, desc: "Select an Attack. That Attack loses the [Melee] or [Ranged] tag and gains the [Self] tag. That means this Attack now targets the user. For the purposes of calculating the potency and duration of [Effect] tags, the user treats their Derived Stats as being 2 lower. The user still rolls Dodge and Accuracy on themselves in order to determine the duration of the [Effect]. This Quality may not be used on an Attack with an [Area] tag.", unlocks: [], handler: "ability" },

	"Speedy": {tags: ["S"], cost: 1, maxRanks: 0, desc: "For each Rank you take in Speedy, the Digimon adds 2 to its Movement. You may not more than double the Digimon’s Base Movement in this manner.", unlocks: ["Teleport", "Advanced Mobility - Movement"], handler: "restriction" },
	
	"Summoner": {tags: ["T"], cost: 3, maxRanks: false, desc: "You may not take this Quality and Conjurer unless you have taken Mixed Summoner. Upon taking this Quality, the Digimon gains a Summon Pool equal to its Bit Value x3. Each Summoned Minion takes up 2 points from the Summon Pool. Minions are summoned as a Complex Action. Be sure to establish what variety and types of things your Digimon can create when taking this Quality, as it cannot be changed later. For example, a Digimon could be able to create toy soldiers, but not magically be able to also create fish out of thin air. Summoned Minions have Wounds equal to the user’s Bit Value x3, Armor Equal to the user’s Bit Value x2, and are capable of flying a number of meters equal to the user’s Brains value in a round. Minions do not have a Dodge Pool. Summoned Minions may Attack by using the user’s Bit Value x2 for Accuracy, and Bit Value x2 for Damage. This uses a Complex Action from the user. They may only make [Melee] tagged Attacks, and the attacks only benefit from Qualities that affect the user as a whole such as Close Combat Optimization or Selective Targeting. Even if the Summoned Minions are destroyed, they may only be summoned every other turn, and when they are initially summoned, they must be placed somewhere within the user’s [Burst][Ranged] radius.", unlocks: ["Elemental Summoner"], handler: "summoning" },

	"System Boost - BIT Value": {tags: ["S"], cost: 3, maxRanks: 0, desc: "For each Rank you take in System Boost, increase Digimon’s BIT Value by 1. You may not more than double the Digimon’s BIT Value in this manner. The stat may still be improved by Derived Stats as per usual after System Boost.", unlocks: [], handler: "restriction" },

	"System Boost - CPU Value": {tags: ["S"], cost: 3, maxRanks: 0, desc: "For each Rank you take in System Boost, increase Digimon’s CPU Value by 1. You may not more than double the Digimon’s CPU Value in this manner. The stat may still be improved by Derived Stats as per usual after System Boost.", unlocks: [], handler: "restriction" },

	"System Boost - RAM Value": {tags: ["S"], cost: 3, maxRanks: 0, desc: "For each Rank you take in System Boost, increase Digimon’s RAM Value by 1. You may not more than double the Digimon’s RAM Value in this manner. The stat may still be improved by Derived Stats as per usual after System Boost.", unlocks: [], handler: "restriction" },

	"Technician": {tags: ["S"], cost: 1, maxRanks: 3, desc: "A Digimon with Technician is skilled at repairing code and technology, and by default can read and comprehend Digicode for its Tamer. It also gains a +4 bonus to repairing or deciphering code and machinery, or simply rebuilding things in the Digital World, per Rank in this Quality.", unlocks: ["Trojan", "Firewall"], handler: "ability" },

	"Tracker": {tags: ["S"], cost: 1, maxRanks: 3, desc: "Tracker makes a Digimon significantly better at finding its target. It gains a +4 bonus to Perception (Brains) checks to find hidden traps or enemies in the immediate area, or follow a trail. If the Digimon has a proper tool to track the target, such as clothing or a trail of footprints, it gains an additional +2 bonus per Rank in Tracker.", unlocks: [], handler: "ability" },

	"Tumbler": {tags: ["S"], cost: 1, maxRanks: false, desc: "The Digimon gains bonus Armor equal to its RAM value doubled when taking damage from falling or being thrown.", unlocks: [], handler: "ability" },

	"Weapon": {tags: ["S, A"], cost: 1, maxRanks: 3, desc: "Your Digimon has a Weapon, special energy, or some type of fighting style it prefers. Attacks which use said Weapon or fighting style may gain a [Weapon] Tag. A Digimon may only have a number of [Weapon] Tagged Attacks equal to the Ranks it has in this Quality. Whenever a Digimon uses a [Weapon] Tagged Attack, it gains a bonus to Accuracy and Damage equal to the Ranks in this Quality.", unlocks: ["Chrome Digizoid Weapon", "Black Digizoid Weapon", "Blue Digizoid Weapon", "Gold Digizoid Weapon", "Obsidian Digizoid Weapon", "Red Digizoid Weapon"], handler: "attack", attackTag: "[Weapon]" }
}

module.exports.DigimonQualitiesAdvanced = {
	"Advanced Mobility - Movement": {tags: ["S"], cost: 3, maxRanks: false, desc: "The Digimon may now take Speedy Ranks to a point where it will triple its Base Movement over Double it.", prereqs: {"Speedy": 1}, unlocks: [], handler: "ability" },

	"Advanced Mobility - Flight": {tags: ["S"], cost: 3, maxRanks: false, desc: "The Digimon is not slowed down by even the harshest of winds while it’s in the air and its Flight speed is increased by its RAM value.", prereqs: {"Extra Movement - Flight": 1}, unlocks: [], handler: "advancedMobility", modifier: "RAM Value" },

	"Advanced Mobility - Digger": {tags: ["S"], cost: 3, maxRanks: false, desc: "The Digimon is now capable of digging through the majority of surfaces without being slowed down. It can dig through softer metals but this is now treated as Difficult Terrain. The Digimon’s Digging speed is increased by its RAM value.", prereqs: {"Extra Movement - Digger": 1}, unlocks: [], handler: "advancedMobility", modifier: "RAM Value" },

	"Advanced Mobility - Swimmer": {tags: ["S"], cost: 3, maxRanks: false, desc: "The Digimon is capable of swimming without being slowed down by harsh currents, and its Swimming speed is increased by its RAM value.", prereqs: {"Extra Movement - Swimmer": 1}, unlocks: [], handler: "advancedMobility", modifier: "RAM Value" },

	"Advanced Mobility - Wallclimber": {tags: ["S"], cost: 3, maxRanks: false, desc: "The Digimon is now capable of walking on ceilings, and cannot be slowed or slip off any normal wall surfaces. Its Wallclimber speed is increased by its RAM value.", prereqs: {"Extra Movement - Wallclimber": 1}, unlocks: [], handler: "advancedMobility", modifier: "RAM Value" },

	"Advanced Mobility - Jumper": {tags: ["S"], cost: 3, maxRanks: false, desc: "The Digimon’s Jump height is increased by its CPU Value times Five. The Digimon’s Jump length is increased by its CPU value.", prereqs: {"Extra Movement - Jumper": 1}, unlocks: [], handler: "advancedMobility", modifier: "CPU Value" },

	"Avoidance": {tags: ["T"], cost: 3, maxRanks: false, desc: "When activating the Agility Quality, the Digimon may now also re-roll any dice which show up as 2’s.", prereqs: {"Agility": 1}, unlocks: [], handler: "ability" },

	"Berserker": {tags: ["T"], cost: 2, maxRanks: false, desc: "The Digimon gains a Rage Meter, which is represented by 2D6, both dice starting at 1 (which means the value of the Rage Meter beings at 2). Normally the Rage Meter is inactive but may be activated as a Simple Action. Whenever the Digimon connects with an Attack, it gains +1 Rage. Whenever it misses with an Attack, it gains +2 Rage. Whenever it is hit by an Attack, it gains +2 Rage. If a whole Round passes by without the Digimon using an Attack or being hit by an Attack itself, it loses 4 Rage. The Rage Meter must be active for the Digimon to gain Rage. For every point the Digimon has in Rage, it gains a +1 bonus to Armor and Damage. However, when the Rage Meter is filled (in this case at a value of 12), the Digimon goes berserk and is now under the GM’s control, generally attacking everything on sight. The Rage Meter may be deactivated as a Simple Action involving a TN 5+(Rage) Persuade Check from the Tamer or another Ally.", prereqs: {"Combat Monster": 1}, unlocks: ["Boiling Blood"], handler: "ability" },

	"Boiling Blood": {tags: ["S"], cost: 1, maxRanks: 3, desc: "For each Rank in Boiling Blood, the user of this Quality lowers the penalty to its Rage Meter on a round without a connected Attack by 1. For example, if you take Boiling Blood Rank 2, on a Round where the Digimon does not Attack, and an Opponent does not hit with an Attack, it only loses 2 Rage instead of 4.", prereqs: {"Berserker": 1}, unlocks: ["You Won’t Like Me When I’m Angry"], handler: "ability" },

	"Coordinated Assault": {tags: ["T"], cost: 3, maxRanks: false, desc: "The Digimon may Mark a single target as a Simple Action. A Target who is Marked gains a -3 Dodge Penalty instead of the normal -1 Penalty for each Attack which targets it past the first one in each Round of Combat. This Quality may only have one active target. The Mark vanishes if the user loses the Quality (usually by Digivolving) or is defeated. If the original target of the Mark is defeated, the user of this Quality may change the target as a Free Action.", prereqs: {"Pack Tactics": 1}, unlocks: [], handler: "ability" },

	"Counterblow": {tags: ["T", "A"], cost: 3, maxRanks: false, desc: "Choose one Attack to apply a [Counter] Tag to. Whenever the Digimon activates the Counterattack Quality and uses the tagged Attack, the target of the tagged Attack may only apply 1/2 of their Armor Stat, in addition to the penalty to their Dodge Pool.", prereqs: {"Counterattack": 1}, unlocks: [], handler: "attack", attackTag: "[Counter]" },

	"Data Specialization - Fistful of Force": {tags: ["S", "T"], cost: 2, maxRanks: false, desc: "The Digimon’s [Melee] tagged [Area] Attacks now scale for area size as if they were [Ranged] Attacks.", prereqs: {"Data Optimization - Close Combat": 1, "Hybrid Drive - Brawler Adjacent": 1, "Hybrid Drive - Speed Striker Adjacent": 1}, unlocks: [], handler: "dataSpec", stage: "Ultimate" },

	"Data Specialization - Flurry": {tags: ["S", "T"], cost: 3, maxRanks: false, desc: "The Digimon may make an additional [Melee], [Damage] Attack once per Round for free. This Attack cannot be modified in any way; you cannot add Tags or Qualities which are not tagged as Static.", prereqs: {"Data Optimization - Close Combat": 1, "Hybrid Drive - Brawler Adjacent": 1, "Hybrid Drive - Speed Striker Adjacent": 1}, unlocks: [], handler: "dataSpec", stage: "Ultimate" },

	"Data Specialization - Sniper": {tags: ["S", "T"], cost: 2, maxRanks: false, desc: "The Digimon’s limitations on range for [Ranged] Attacks is considered doubled before it starts suffering penalties to Accuracy. The Digimon takes a -1 Base Movement Penalty and a -2 penalty to its Accuracy Pool when making an Attack against a foe within 2 Meters.", prereqs: {"Data Optimization - Ranged Striker": 1, "Hybrid Drive - Speed Striker Adjacent": 1, "Hybrid Drive - Effect Warrior Adjacent": 1}, unlocks: [], handler: "dataSpec", statMods: { BaseMovement: -1 }, stage: "Ultimate" },

	"Data Specialization - Mobile Artillery": {tags: ["S", "T"], cost: 3, maxRanks: false, desc: "The Digimon adds its Bit Value an additional time when calculating the size of [Area] Tagged Attacks. Additionally, the Digimon no longer takes a penalty for having multiple targets within its [Area] Attacks. The Digimon takes a -1 Base Movement Penalty.", prereqs: {"Data Optimization - Ranged Striker": 1, "Hybrid Drive - Speed Striker Adjacent": 1, "Hybrid Drive - Effect Warrior Adjacent": 1}, unlocks: [], handler: "dataSpec", statMods: { BaseMovement: -1 }, stage: "Ultimate" },

	"Data Specialization - What Goes Around": {tags: ["S", "T"], cost: 2, maxRanks: false, desc: "Whenever the Digimon is hit by a [Melee] Attack, it deals damage equal to its CPU Value to the opponent. This damage is reduced by Armor but cannot be Dodged. The damage dealt by this Quality, however, cannot be brought below 2.", prereqs: {"Data Optimization - Guardian": 1, "Hybrid Drive - Brawler Adjacent": 1, "Hybrid Drive - Effect Warrior Adjacent": 1}, unlocks: [], handler: "dataSpec", stage: "Ultimate" },

	"Data Specialization - True Guardian": {tags: ["S", "T"], cost: 3, maxRanks: false, desc: "Whenever the Digimon Intercedes, it gains a bonus to Armor equal to the distance traveled to Intercede. Additionally, if the Attack had an [Area] tag, any allies behind the Digimon have the damage taken reduced by the Digimon’s CPU value doubled (cannot go below 1), and any [Effect] tags they would take are negated. The Digimon takes a -2 Accuracy Penalty.", prereqs: {"Data Optimization - Guardian": 1, "Hybrid Drive - Brawler Adjacent": 1, "Hybrid Drive - Effect Warrior Adjacent": 1}, unlocks: [], handler: "dataSpec", statMods: { Accuracy: -2 }, stage: "Ultimate" },

	"Data Specialization - Power Throw": {tags: ["S", "T"], cost: 2, maxRanks: false, desc: "Whenever the Digimon throws a target, it adds its CPU value doubled to its Accuracy.", prereqs: {"Data Optimization - Brawler": 1, "Hybrid Drive - Close Combat Adjacent": 1, "Hybrid Drive - Guardian Adjacent": 1}, unlocks: [], handler: "dataSpec", stage: "Ultimate" },

	"Data Specialization - Wrestlemania": {tags: ["S", "T"], cost: 3, maxRanks: false, desc: "The Digimon may Clash without making an Action once per Round. It may initiate multiple Clashes if it has Multi-Grappler, but they must all be initiated at the same time. The Digimon takes a -1 penalty to Damage, Armor, and Health.", prereqs: {"Data Optimization - Brawler": 1, "Hybrid Drive - Close Combat Adjacent": 1, "Hybrid Drive - Guardian Adjacent": 1}, unlocks: [], handler: "dataSpec", statMods: { Damage: -1, Armor: -1, Health: -1 }, stage: "Ultimate" },

	"Data Specialization - Hit and Run": {tags: ["S", "T"], cost: 2, maxRanks: false, desc: "Whenever the Digimon uses a [Charge] tagged Attack, they add their RAM stat to the Damage.", prereqs: {"Data Optimization - Speed Striker": 1, "Hybrid Drive - Close Combat Adjacent": 1, "Hybrid Drive - Ranged Striker Adjacent": 1}, unlocks: [], handler: "dataSpec", stage: "Ultimate" },

	"Data Specialization - Uncatchable Target": {tags: ["S", "T"], cost: 3, maxRanks: false, desc: "The Digimon gains a +3 Dodge bonus and does not suffer a stacking Dodge penalty if it is attacked multiple times in a round. The Digimon also gains a +1 Dodge bonus to [Area] tagged Attacks.", prereqs: {"Data Optimization - Speed Striker": 1, "Hybrid Drive - Close Combat Adjacent": 1, "Hybrid Drive - Ranged Striker Adjacent": 1}, unlocks: [], handler: "dataSpec", statMods: { Dodge: 3 }, stage: "Ultimate" },

	"Data Specialization - Black Mage": {tags: ["S", "T"], cost: 3, maxRanks: false, desc: "Whenever the Digimon successfully hits with a ‘negative’ [Effect] Tagged Attack (an Effect which hinders or damages a target such as Poison, Blind, or Weaken), the Digimon rolls its Bit Value in the form of a pool check. For every success, it may assign 1 point of Unalterable Damage to the targets as it wishes (for example, if there are 3 targets and 5 successes, the Digimon could assign 2 damage to two targets, and 1 damage to the last target.). This Quality may not be activated more than once per round, and Qualities such as Huge Power do not affect it, as it is not an Accuracy check but a check to see how much damage is dealt.", prereqs: {"Data Optimization - Effect Warrior": 1, "Hybrid Drive - Ranged Striker Adjacent": 1, "Hybrid Drive - Guardian Adjacent": 1}, unlocks: [], handler: "dataSpec", stage: "Ultimate" },

	"Data Specialization - White Mage": {tags: ["S", "T"], cost: 2, maxRanks: false, desc: "Whenever the Digimon connects with a ‘positive’ [Effect] Tagged Attack (an Effect which would bolster or shield a target such as Shielding, Cleanse, or Vigor), the Digimon rolls its Bit Value in the form of a pool check. For every success, it may heal 1 Wound Box from among the targets of the Attack (for example if there are 3 targets and 5 successes, the Digimon could heal 1 Wound Box from one target and 2 Wound Boxes from the other two). This Quality may not be activated more than once per round, and Qualities such as Huge Power do not affect it, as it is not an Accuracy check but a check to see how many Wound Boxes are recovered.", prereqs: {"Data Optimization - Effect Warrior": 1, "Hybrid Drive - Ranged Striker Adjacent": 1, "Hybrid Drive - Guardian Adjacent": 1}, unlocks: [], handler: "dataSpec", stage: "Ultimate" },

	"Decisive Defenses": {tags: ["S"], cost: 3, maxRanks: false, desc: "Resistant now only changes the duration of negative effects, no longer lowering the duration of positive effects.", prereqs: {"Resistant": 3}, unlocks: [], handler: "ability" },

	"Element Master": {tags: ["T"], cost: 2, maxRanks: 0, desc: "Per each Rank in Element Master, the Digimon gains the ability to manipulate an aspect of nature such as earth, fire, air, or water. The Digimon may only manipulate natural sources of the element: magical, modified, or otherwise GM-decided outliers may not be manipulated. Within its [Burst][Ranged] radius, the Digimon may also change Difficult Terrain into Basic Terrain of its chosen element as a Simple Action, or vise-versa. They may also change the positioning of the terrain to create structures and trails out of it, moving a number of cubic meters of said Element equal to their Bit value times three.", prereqs: {"Naturewalk": 1}, unlocks: [], handler: "ability" },

	"Elemental Summoner": {tags: ["S"], cost: 3, maxRanks: false, desc: "Whenever the Digimon’s Summoned Minions are destroyed, they deal damage to any enemies or allies within a [Burst][Ranged] radius for damage equal to the Digimon’s Bit Value. The Burst Radius is the same as if the Digimon was using a [Burst][Ranged] Attack itself. The Digimon’s Summoned Minions are affected by Qualities such as Selective Targeting, Mobile Artillery, and other effects the Digimon itself has. The Summoned Minions roll Accuracy for this attack as per normal.", prereqs: {"Summoner": 1}, unlocks: [], handler: "ablity" },

	"Firewall": {tags: ["S"], cost: 2, maxRanks: false, desc: "The Digimon gains a bonus to routing out intruders and otherwise protecting the code it’s currently working on equal to its Technician Rank. In addition, the Digimon may purchase an additional 3 ranks of Technician. If the Digimon already has the Trojan quality, the cost of this Quality goes up to 3 DP over 2.", prereqs: {"Technician": 1}, unlocks: ["Technician (Firewall)"], handler: "technician" },

	"Jogress Partner": {tags: ["S"], cost: 3, maxRanks: false, desc: "NOTE: Digimon MUST have already DNA Digivolved with chosen partner prior to purchasing this ability. Choose another Digimon in your party. Whenever this Digimon DNA Digivolves with that Digimon, it gains a +2 DP Bonus per Stage above Rookie when creating the new Digimon. This bonus stacks if each partner has this Quality.", prereqs: {}, unlocks: [], handler: "ability" },

	"Hybrid Drive - Close Combat Adjacent": {tags: ["S"], cost: 3, maxRanks: 2, desc: "Digimon gains the ability to purchase Data Specialization from the Brawler and Speed Striker trees.", prereqs: {"Data Optimization - Close Combat": 1}, unlocks: ["Data Specialization - Power Throw", "Data Specialization - Wrestlemania", "Data Specialization - Hit and Run", "Data Specialization - Uncatchable Target"], handler: "hybrid", stage: "Ultimate" },

	"Hybrid Drive - Ranged Striker Adjacent": {tags: ["S"], cost: 3, maxRanks: 2, desc: "Digimon gains the ability to purchase Data Specialization from the Speed Striker and Effect Warrior trees.", prereqs: {"Data Optimization - Ranged Striker": 1}, unlocks: ["Data Specialization - Hit and Run", "Data Specialization - Uncatchable Target", "Data Specialization - Black Mage", "Data Specialization - White Mage"], handler: "hybrid", stage: "Ultimate" },

	"Hybrid Drive - Guardian Adjacent": {tags: ["S"], cost: 3, maxRanks: 2, desc: "Digimon gains the ability to purchase Data Specialization from the Brawler and Effect Warrior trees.", prereqs: {"Data Optimization - Guardian": 1}, unlocks: ["Data Specialization - Power Throw", "Data Specialization - Wrestlemania", "Data Specialization - Black Mage", "Data Specialization - White Mage"], handler: "hybrid", stage: "Ultimate" },

	"Hybrid Drive - Brawler Adjacent": {tags: ["S"], cost: 3, maxRanks: 2, desc: "Digimon gains the ability to purchase Data Specialization from the Close Combat and Guardian trees.", prereqs: {"Data Optimization - Brawler": 1}, unlocks: ["Data Specialization - Fistful of Force", "Data Specialization - Flurry", "Data Specialization - What Goes Around", "Data Specialization - True Guardian"], handler: "hybrid", stage: "Ultimate" },

	"Hybrid Drive - Speed Striker Adjacent": {tags: ["S"], cost: 3, maxRanks: 2, desc: "Digimon gains the ability to purchase Data Specialization from the Close Combat and Ranged Striker trees.", prereqs: {"Data Optimization - Speed Striker": 1}, unlocks: ["Data Specialization - Fistful of Force", "Data Specialization - Flurry", "Data Specialization - Sniper", "Data Specialization - Mobile Artillery"], handler: "hybrid", stage: "Ultimate" },

	"Hybrid Drive - Effect Warrior Adjacent": {tags: ["S"], cost: 3, maxRanks: 2, desc: "Digimon gains the ability to purchase Data Specialization from the Ranged Striker and Guardian trees.", prereqs: {"Data Optimization - Effect Warrior": 1}, unlocks: ["Data Specialization - Sniper", "Data Specialization - Mobile Artillery", "Data Specialization - What Goes Around", "Data Specialization - True Guardian"], handler: "hybrid", stage: "Ultimate" },

	"Mixed Summoner": { tags: ["S"], cost: 3, maxRanks: false, desc: "The Digimon is now capable of taking both Summoner and Conjurer. However, the Digimon’s Bit Value is treated as 1 lower when calculating its Summon Pool.", prereqs: {}, unlocks: [], handler: "ability" },

	"Mode Change X.0": {tags: ["S"], cost: 2, maxRanks: 2, desc: "If you take Rank 1 of Mode Change X.0, you may now change a selection of two Stats (not Health) with another two Stats (not Health) when making your choice for Mode Change. If you take Rank 2 of Mode Change X.0, you may now swap the Stats around as you see fit. You may retroactively change the Stats for Mode Change when you take Ranks in this Quality.", prereqs: {"Mode Change": 1}, unlocks: [], handler: "ability" },

	"Overkill": {tags: ["T"], cost: 2, maxRanks: false, desc: "When activating the Huge Power Quality, the Digimon may now also re-roll any dice which show up as 2’s.", prereqs: {"Huge Power": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Dodge": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Dodge, the Digimon may now use their full Agility Stat when making Dodge Checks.", prereqs: {"Improved Derived Stat - Agility": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Fight": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Fight, the Digimon may now use their full Agility Stat when making Fight Checks", prereqs: {"Improved Derived Stat - Agility": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Stealth": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Stealth, the Digimon may now use their full Agility Stat when making Stealth Checks", prereqs: {"Improved Derived Stat - Agility": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Athletics": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Athletics, the Digimon may now use their full Body Stat when making Athletics Checks", prereqs: {"Improved Derived Stat - Body": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Endurance": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Endurance, the Digimon may now use their full Body Stat when making Endurance Checks", prereqs: {"Improved Derived Stat - Body": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Feats of Strength": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Feats of Strength, the Digimon may now use their full Body Stat when making Feats of Strength Checks", prereqs: {"Improved Derived Stat - Body": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Manipulate": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Manipulate, the Digimon may now use their full Brains Stat when making Manipulate Checks", prereqs: {"Improved Derived Stat - Brains": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Perform": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Perform, the Digimon may now use their full Brains Stat when making Perform Checks", prereqs: {"Improved Derived Stat - Brains": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Persuade": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Persuade, the Digimon may now use their full Brains Stat when making Persuade Checks", prereqs: {"Improved Derived Stat - Brains": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Computer": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Computer, the Digimon may now use their full Brains Stat when making Computer Checks", prereqs: {"Improved Derived Stat - Brains": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Survival": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Survival, the Digimon may now use their full Brains Stat when making Survival Checks", prereqs: {"Improved Derived Stat - Brains": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Knowledge": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Knowledge, the Digimon may now use their full Brains Stat when making Knowledge Checks", prereqs: {"Improved Derived Stat - Brains": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Perception": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Perception, the Digimon may now use their full Brains Stat when making Perception Checks", prereqs: {"Improved Derived Stat - Brains": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Decipher Intent": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Decipher Intent, the Digimon may now use their full Brains Stat when making Decipher Intent Checks", prereqs: {"Improved Derived Stat - Brains": 1}, unlocks: [], handler: "ability" },

	"Prodigious Skill - Bravery": {tags: ["S"], cost: 2, maxRanks: false, desc: "Whenever you take Prodigious Skill - Bravery, the Digimon may now use their full Brains Stat when making Bravery Checks", prereqs: {"Improved Derived Stat - Brains": 1}, unlocks: [], handler: "ability" },

	"Regenerator": {tags: ["T"], cost: 3, maxRanks: false, desc: "When activating the Quick Healer Quality, the Digimon may now also re-roll any dice which show up as 2’s.", prereqs: {"Quick Healer": 1}, unlocks: [], handler: "ability" },

	"Shade Cloak": {tags: ["S"], cost: 2, maxRanks: false, desc: "The Digimon may now apply their Hide in Plain Sight bonus to all allies within its [Burst][Ranged] radius.", prereqs: {"Hide in Plain Sight": 1}, unlocks: [], handler: "ability" },

	"Signature Move": {tags: ["S"], cost: 3, maxRanks: false, desc: "The Digimon may now apply Certain Strike and Armor Piercing to the same Attack.", prereqs: {"Certain Strike": 3}, unlocks: [], handler: "ability" },

	"Sneak Attack": {tags: ["T"], cost: 3, maxRanks: false, desc: "If the Digimon is hidden from all foes thanks to a successful Stealth (Agility) check versus the opponent’s Perception (Brains), it gains a bonus to Accuracy and Damage on the next Attack it makes equal to its RAM value doubled. The Digimon must have some means of going unseen or unnoticed for this Quality to be activated (simply standing in plain sight with a weapon drawn and making a Stealth Check will not let you activate the Quality. The Digimon must be invisible, hidden, or otherwise in order to utilize this Quality). This Quality may only be activated once per combat session, or twice if the first round of combat is a Surprise Round.", prereqs: {"Hide in Plain Sight": 1}, unlocks: [], handler: "ability" },

	"Teleport": {tags: ["T"], cost: 3, maxRanks: false, desc: "The Digimon is capable of instantly teleporting a number of meters equal to its Base Movement+2. It requires a line of sight to be able to utilize this Quality. It may use this Quality to teleport away as a reaction to an enemy’s Attack once per battle, causing the Attack to miss. Using Teleport to cause an Attack to miss will not trigger Counterattack. When it uses Teleport to avoid an Attack, the Digimon forfeits a Simple Action on its next round of combat.", prereqs: {"Speedy": 3}, unlocks: ["Transporter"], handler: "addMovement", movementType: "Teleport Distance", statMods: { "Teleport Distance": 2 } },

	"Transporter": {tags: ["S"], cost: 2, maxRanks: false, desc: "The Digimon is now capable of warping away with allies in tow while using Teleport. The allies must be adjacent for Transporter to work properly. This also means it can use the Teleport Quality to bring allies out of harm’s way in reaction to an Attack. All allies who are transported in this manner also forfeit one Simple Action on their next Round. Finally, the Digimon’s Teleport distance increases by 2.", prereqs: {"Teleport": 1}, unlocks: [], handler: "addStat", statMods: { "Teleport Distance": 2 } },

	"Trojan": {tags: ["S"], cost: 2, maxRanks: false, desc: "The Digimon gains a bonus to getting to places it shouldn’t be and otherwise invading protected areas equal to its Technician Rank. In addition, the Digimon may purchase an additional 3 ranks of Technician. If the Digimon already has the Firewall quality, the cost of this Quality goes up to 3 DP over 2.", prereqs: {"Technician": 1}, unlocks: ["Technician (Trojan)"], handler: "technician" },

	"Technician (Firewall)": {tags: ["S"], cost: 1, maxRanks: 3, desc: "A Digimon with Technician is skilled at repairing code and technology, and by default can read and comprehend Digicode for its Tamer. It also gains a +4 bonus to repairing or deciphering code and machinery, or simply rebuilding things in the Digital World, per Rank in this Quality.", prereqs: {"Firewall": 1}, unlocks: [], handler: "ability" },

	"Technician (Trojan)": {tags: ["S"], cost: 1, maxRanks: 3, desc: "A Digimon with Technician is skilled at repairing code and technology, and by default can read and comprehend Digicode for its Tamer. It also gains a +4 bonus to repairing or deciphering code and machinery, or simply rebuilding things in the Digital World, per Rank in this Quality.", prereqs: {"Trojan": 1}, unlocks: [], handler: "ability" },

	"You Won’t Like Me When I’m Angry": {tags: ["S"], cost: 3, maxRanks: false, desc: "Double the number of dice used to track the Digimon’s Rage Meter (2 to 4). This means the Digimon’s Rage starts at 4 and can go as high as 24. Adjust all calculations for the Rage mechanics accordingly.", prereqs: {"Boiling Blood": 1}, unlocks: [], handler: "ability" },

	"Burst Power": {tags: ["T"], cost: 0, maxRanks: false, desc: "Burst Power is activated as a Simple Action. When activated, the Digimon gains +4 to all Stats for 4 Rounds. At the end of the 4th round, the Digimon loses 1 point in each Stat per Round. So, if the Digimon maintains Burst Power for 7 rounds, they would be at a -3 in all Stats. Burst Power is Deactivated as a Complex Action. Once Burst Power has been activated, the Digimon cannot activate it again until the start of the next Combat session.", prereqs: {}, unlocks: [], handler: "ability", stage: "Burst" }
}

module.exports.DigimonQualitiesDigizoid = {
	"Chrome Digizoid Armor": {tags: ["S"], cost: 1, maxRanks: false, desc: "The Digimon gains 2 Armor and 1 Health.", prereqs: {}, unlocks: [], handler: "digizoidArmor", stage: "Ultimate", statMods: {"Armor": 2, "Health": 1} },
	
	"Black Digizoid Armor": {tags: ["S, T"], cost: 2, maxRanks: false, desc: "The Digimon gains 2 Armor. At the start of each round, roll 1D6. On a roll of 1 or 2, the user gains a bonus 4 Armor for that round. On a roll of 3 or 4, the user gains a bonus 4 Dodge for that round. On a roll of 5 or 6, the Digimon gains 2 Armor and 2 Dodge for that round.", prereqs: {}, unlocks: [], handler: "digizoidArmor", stage: "Mega", statMods: {Armor: 2} },
	
	"Blue Digizoid Armor": {tags: ["S, T"], cost: 3, maxRanks: false, desc: "The Digimon’s Armor score increases by 2, it gains an additional 2 Dodge, and their Base Movement is increased by 4.", prereqs: {}, unlocks: [], handler: "digizoidArmor", stage: "Mega", statMods: {Armor: 2, Dodge: 2, BaseMovement: 4} },
	
	"Gold Digizoid Armor": {tags: ["S, T"], cost: 2, maxRanks: false, desc: "The Digimon’s Armor increases by 2. Additionally, whenever the user is hit by a [Ranged] Attack, the opponent who used the Attack takes Damage equal to the user’s CPU Value doubled. The damage is reduced by Armor as per normal, but cannot be brought below 1.", prereqs: {}, unlocks: [], handler: "digizoidArmor", stage: "Mega", statMods: {Armor: 2} },
	
	"Obsidian Digizoid Armor": {tags: ["S, T"], cost: 2, maxRanks: false, desc: "The Digimon’s Armor increases by 2. Additionally, whenever the user is hit by a [Melee] Attack, the opponent who used the Attack takes Damage equal to the user’s CPU Value doubled. The damage is reduced by Armor as per normal, but cannot be brought below 1.", prereqs: {}, unlocks: [], handler: "digizoidArmor", stage: "Mega", statMods: {Armor: 2} },
	
	"Red Digizoid Armor": {tags: ["S, T"], cost: 2, maxRanks: false, desc: "The Digimon gains +4 to their Armor and +2 to their Health.", prereqs: {}, unlocks: [], handler: "digizoidArmor", stage: "Mega", statMods: {Armor: 4, Health: 2} },
	
	"Chrome Digizoid Weapon": {tags: ["S, T"], cost: 1, maxRanks: false, desc: "The Digimon adds 2 to Accuracy and 1 to Damage when using a [Weapon] Attack.", prereqs: {"Weapon": 1}, unlocks: [], handler: "digizoidWeapon", stage: "Ultimate" },
	
	"Black Digizoid Weapon": {tags: ["S, T"], cost: 2, maxRanks: false, desc: "The Digimon’s [Weapon] Attacks gains 2 Accuracy. At the start of each round, roll 1D6. On a roll of 1 or 2, the user gains a bonus 4 Damage for that round. On a roll of 3 or 4, the user gains a bonus 4 Accuracy for that round. On a roll of 5 or 6, the Digimon gains 2 Damage and 2 Accuracy for that round.", prereqs: {"Weapon": 1}, unlocks: [], handler: "digizoidWeapon", stage: "Mega" },
	
	"Blue Digizoid Weapon": {tags: ["S, T"], cost: 3, maxRanks: false, desc: "The Digimon’s [Weapon] Attacks gain 2 bonus Accuracy when used and 1 bonus Damage. Additionally they are all treated as if they had an extra rank of Certain Strike (even if the Attack already had Certain Strike).", prereqs: {"Weapon": 1}, unlocks: [], handler: "digizoidWeapon", stage: "Mega" },
	
	"Gold Digizoid Weapon": {tags: ["S, T"], cost: 3, maxRanks: false, desc: "The Digimon’s [Weapon] Attacks gain 4 extra Damage and 1 extra Accuracy. If the Attack is [Ranged], the base range before suffering penalties is increased by 5 meters.", prereqs: {"Weapon": 1}, unlocks: [], handler: "digizoidWeapon", stage: "Mega" },
	
	"Obsidian Digizoid Weapon": {tags: ["S, T"], cost: 3, maxRanks: false, desc: "The Digimon’s [Weapon] Attacks gain 2 bonus Damage when used and 1 bonus Accuracy. Additionally they are all treated as if they had an extra rank of Armor Piercing (even if the Attack already had Armor Piercing).", prereqs: {"Weapon": 1}, unlocks: [], handler: "digizoidWeapon", stage: "Mega" },
	
	"Red Digizoid Weapon": {tags: ["S, T"], cost: 3, maxRanks: false, desc: "The Digimon’s [Weapon] Attacks gain +7 Damage.", prereqs: {"Weapon": 1}, unlocks: [], handler: "digizoidWeapon", stage: "Mega" }
}

/*var handlers = {
	"ability": "Special abilities you can make use of at specified moments",
	"attack": "Purchases a Tag for modifying attacks",
	"dataOpt": "Indicates a Quality is a Data Optimization and will modify stats",
	"addMovement": "Indicates a movement type to add",
	"addStat": Indicates a Quality will modify a Digimon's stats,
	"restriction": Indicates a stat modification with a restriction value,
	"dataSpec": Indicates a Quality is a Data Specialization
}*/

module.exports.AttackGroups = [
	[
		"[Blast]",
		"[Burst]",
		"[Close Blast]",
		"[Cone]",
		"[Line]",
		"[Pass]",
		"[Self]"
	],
	[
		"[Armor Piercing]",
		"[Certain Strike]"
	],
	[
		"[Immobilize]",
		"[Knockback]",
		"[Taunt]",
		"[Poison]",
		"[Confuse]",
		"[Stun]",
		"[Fear]",
		"[Lifesteal]",
		"[Vigor]",
		"[Fury]",
		"[Cleanse]",
		"[Haste]",
		"[Blind]",
		"[Paralysis]",
		"[Charm]",
		"[Weaken]",
		"[Strengthen]",
		"[Shield]",
		"[Regenerate]",
		"[Pacify]",
		"[Exploit]",
		"[Distract]",
		"[Vigilance]",
		"[Swiftness]"
	]
];

module.exports.GetQuality = function (quality) {
	if (module.exports.DigimonQualities.hasOwnProperty(quality)) {
		return module.exports.DigimonQualities[quality];
	}
	else if (module.exports.DigimonQualitiesAdvanced.hasOwnProperty(quality)) {
		return module.exports.DigimonQualitiesAdvanced[quality];
	}
	else if (module.exports.DigimonQualitiesDigizoid.hasOwnProperty(quality)) {
		return module.exports.DigimonQualitiesDigizoid[quality];
	}
	else
	{
		return null;
	}
}

module.exports.extraMovementDiscount = function (restoreCost, championFlag) {
	let modifier = restoreCost ? 1 : -1;

	if (
		(championFlag && !restoreCost && module.exports.DigimonQualities['Extra Movement - Flight'].cost === 2) ||
		(restoreCost && module.exports.DigimonQualities['Extra Movement - Flight'].cost === 1)
	) {
		let extraMovements = [
			'Extra Movement - Flight',
			'Extra Movement - Digger',
			'Extra Movement - Swimmer',
			'Extra Movement - Wallclimber',
			'Extra Movement - Jumper'
		];

		for (let index in extraMovements) {
			module.exports.DigimonQualities[extraMovements[index]].cost += modifier;
		}
	}
}