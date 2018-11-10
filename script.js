//CLASS CONSTRUCTOR FOR WARRIOR CLASS WITH TWO METHODS ATTACHED. 
//THE PROPERTIES IN THE CONSTRUCTOR METHODS FOR ALL CLASSES ARE NOT CURRENTLY USED FOR THIS CODE, BUT THERE FOR FUTURE PURPOSES -
//IF NEED BE.
class Warrior {
    constructor (level, strength, attack, vitality, weapon, armor) {
        this.level = level;
        this.strength = strength;
        this.attack = attack;
        this.vitality = vitality;
        this.weapon = weapon;
        this.armor = armor;
    }

    totalStrength (level, weaponStrength) {
         return level * 10 + weaponStrength;
    }

    totalVitality (level) {
        return level * 5;
    }
}

//CLASS CONSTRUCTOR FOR WEAPONS THAT IS PROTOTYPE-LINKED TO THE WARRIOR CLASS WITH TWO ADDITIONAL METHODS ATTACHED 
class Weapons extends Warrior {
    constructor(minDamage, maxDamage, aps, strength, element) {
        super();
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.aps = aps;
        this.strength = strength;
        this.element = element;
    }

    weaponDamage(totalStrength, damageRange) {
       return totalStrength / 100 * damageRange;
    }

    elementalDamage (weaponElement, attackType, weaponDamage) {
        var boostAndAttackType = {};
        var weaponDamage;
        var attackType;
        if (weaponElement.toLowerCase() === "physical" && attackType.toLowerCase() === "punch") {
            boostAndAttackType = { 
                weaponDamage: (.05 * weaponDamage) + weaponDamage,
                attackType: "punch"
            }
            weaponDamage = boostAndAttackType.weaponDamage;
            attackType = boostAndAttackType.attackType;
            return weaponDamage;
            return attackType;
        } else if (weaponElement.toLowerCase() === "fire" && attackType.toLowerCase() === "fire-smite") {
            boostAndAttackType = { 
                weaponDamage: (.10 * weaponDamage) + weaponDamage,
                attackType: "fire-smite"
            }
            weaponDamage = boostAndAttackType.weaponDamage;
            attackType = boostAndAttackType.attackType;
            return weaponDamage;
            return attackType;
        } else if (weaponElement.toLowerCase() === "ice" && attackType.toLowerCase() === "frosty-cleave") {
            boostAndAttackType = { 
                weaponDamage: (.15 * weaponDamage) + weaponDamage,
                attackType: "frosty-cleave"
            }
            weaponDamage = boostAndAttackType.weaponDamage;
            attackType = boostAndAttackType.attackType;
            return weaponDamage;
            return attackType;
        } else {
            return weaponDamage;
        }
    }
}

//CLASS CONSTRUCTOR FOR ATTACKS THAT IS PROTOTYPE-LINKED TO THE WEAPONS CLASS WITH 3 ADDITIONAL METHODS ATTACHED
class Attacks extends Weapons {
    constructor (minDamage, maxDamage, dps) {
        super();
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.dps = dps;
    }

    attackTypeDamage (weaponDamage, attackType) {
        var percentOfDamage;
        if (attackType === "punch") {
             percentOfDamage = 1;
        } else if (attackType === "fire-smite") {
            percentOfDamage = 0.9;
        } else if (attackType === "frosty-cleave") {
            percentOfDamage = 1.2;
        }
    
        var totalDamage =  percentOfDamage * weaponDamage;
        return totalDamage;
    }

    dmgAverage(totalMin, totalMax) {
        var dmgAverage = (totalMin + totalMax)/2;
        return dmgAverage;

    }

    calculateDps (dmgAverage, weaponAps, attackType) {
        var attackDps;
        if (attackType === "punch") {
            attackDps = 1;
       } else if (attackType === "fire-smite") {
           attackDps = 1.2;
       } else if (attackType === "frosty-cleave") {
           attackDps = 0.9;
       }
       var dps = dmgAverage * weaponAps * attackDps;
       return dps;
    }

}

//FUNCTION THAT SETS THE VALUE OF THE LEVEL RANGE AND DISPLAYS IT TO THE DOM
function show_value(x) {
 document.getElementById("show-level").innerHTML=x;
}

//ONCLICK EVENT HANDLER FOR WHEN THE ATTACK BUTTON IS CLICKED BY USER
document.getElementById("attack").onclick = function () {

    //RETRIEVING VALUES FROM DOM INPUTS
    const level = Number(document.getElementById("level").value);
    const weaponElement = document.getElementById("weapon-element").value;
    const attackType = document.getElementById("attack-type").value;
    const weaponType = document.getElementById("weapon-type").value;

    //SETTING APPROPRIATE VALUES ACCORDING TO THE DOM WEAPON TYPE INPUT FIELD
    if (weaponType === "mace") {
        var minDamageRange = 66;
        var maxDamageRange = 80;
        var weaponAps = 1;
        var weaponStrength = 30;
    } else if (weaponType === "axe") {
        var minDamageRange = 50;
        var maxDamageRange = 65;
        var weaponAps = 1.2;
        var weaponStrength = 20;
    } else if (weaponType === "sword") {
        var minDamageRange = 35;
        var maxDamageRange = 49;
        var weaponAps = 1.4;
        var weaponStrength = 10;
    }

//CREATE AN INSTANCE OF THE ATTACKS CLASS, WHICH HOLDS ALL OF THE WEAPONS AND WARRIORS CLASS METHODS
var lenaAttack = new Attacks();

//CALCULATE TOTAL STRENGTH BY COMBINING LENA'S BASE STR ATTRIBUTE WITH HER WEAPON'S BY USING THE TOTALSTRENGTH() METHOD
var totalStrength = lenaAttack.totalStrength(level, weaponStrength);

//USING WEAPONDAMAGE METHOD TO CALCULATE TOTAL STRENGTH
var minDmg = lenaAttack.weaponDamage(totalStrength, minDamageRange);
var maxDmg = lenaAttack.weaponDamage(totalStrength, maxDamageRange);


//USING THE ELEMENTALDAMAGE METHOD TO CALCULATE MIN AND MAX DMG
var minElementDmg = lenaAttack.elementalDamage(weaponElement, attackType, minDmg);
var maxElementDmg = lenaAttack.elementalDamage(weaponElement, attackType, maxDmg);

//USING THE ATTACKTYPEDAMAGE METHOD TO ADD IN THE ELEMENTAL DMG
var totalMin = lenaAttack.attackTypeDamage(minElementDmg, attackType);
var totalMax = lenaAttack.attackTypeDamage(maxElementDmg, attackType);


//CALCULATING THE DPS BY GETTING THE AVERAGE OF THE MIN AND MAX DMG AND APPLYING THE APS 
var dmgAverage = lenaAttack.dmgAverage(totalMin, totalMax);
var finalDps = lenaAttack.calculateDps(dmgAverage, weaponAps, attackType);

//CALCULATING THE WARRIOR VITALITY
var totalVitality = lenaAttack.totalVitality(level);


//PRINTING FINAL RESULTS TO SCREEN
document.getElementById("min-damage").innerHTML = totalMin.toFixed(3);
document.getElementById("max-damage").innerHTML = totalMax.toFixed(3);
document.getElementById("dps").innerHTML = finalDps.toFixed(3);
document.getElementById("vitality").innerHTML = totalVitality;

}
// *******************************************************************************
//                         THANK YOU FOR THIS OPPORTUNITY!
//                           MICHAEL YAWANIS - 3/22/2018
// *******************************************************************************