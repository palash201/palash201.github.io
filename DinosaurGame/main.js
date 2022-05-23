var gameData;
doWipe();

var enemyNames = ["Hungry Ooze", "Stinky Glop", "Gooey Phantom", "Slimy Ogre"];

var bossNames = ["Shrek", "Mystical Slime", "Enraged Ooze"];


function update() {
    document.getElementById("bones").innerHTML = formatNumber(gameData.bones) + " Bones";
    document.getElementById("crystals").innerHTML = formatNumber(gameData.crystals) + " Crystals";
    document.getElementById("fossils").innerHTML = formatNumber(gameData.fossils) + " Fossils";
    document.getElementById("portalButton").innerHTML = "Portal (+" + formatNumber(gameData.fossilsOnPortal) + " Fossils) (NO Confirmation)";
    if (gameData.highestLevelThisGame <= 50) {
        document.getElementById("portalButton").innerHTML = "Portal (Defeat Level 50 to Unlock!)";
    }
    document.getElementById("damagePerSecond").innerHTML = formatNumber(gameData.damagePerSecond) + " DPS (" + formatNumber(gameData.damagePerSecond/15) + " Per Tick)";
    document.getElementById("enemyHealth").innerHTML = gameData.currentEnemy.name + ": " + formatNumber(gameData.currentEnemy.hp) + "/" + formatNumber(gameData.currentEnemy.maxHp) + " HP";
    document.getElementById("killCounter").innerHTML = gameData.zoneKillCounterKills + "/" + gameData.zoneKillCounterRequirement + " Kills to next level";
    document.getElementById("zone").innerHTML = "Zone: " + gameData.currentZone + " (Level " + gameData.currentLevel + ") (" + formatNumber(gameData.currentEnemy.maxHp) + " HP)";
    document.getElementById("crystalDamageDisplay").innerHTML = "Current bonus: " + formatNumber(gameData.damageMultiplier) + "x";
    document.getElementById("crystalBoneDisplay").innerHTML = "Current bonus: " + formatNumber(gameData.boneMultiplier) + "x";
    document.getElementById("crystalCrystalDisplay").innerHTML = "Current chance: " + formatNumber(gameData.crystalChance) + "%";
    document.getElementById("buyCrystalDamage").innerHTML = "Upgrade for " + formatNumber(gameData.upgrades.damage.cost) + " crystals";
    document.getElementById("buyCrystalBone").innerHTML = "Upgrade for " + formatNumber(gameData.upgrades.bone.cost) + " crystals";
    document.getElementById("buyCrystalCrystal").innerHTML = "Upgrade for " + formatNumber(gameData.upgrades.crystal.cost) + " crystals";
    document.getElementById("crystalDamageLevel").innerHTML = "Mutilation (Level " + gameData.upgrades.damage.level + ") - Increase all damage by a multiplicative " + formatNumber((gameData.upgrades.damage.power-1)*100) + "% per level.";
    document.getElementById("crystalBoneLevel").innerHTML = "Bone Alchemy (Level " + gameData.upgrades.bone.level + ") - Increase all bone drops by a multiplicative " + formatNumber((gameData.upgrades.bone.power-1)*100) + "% per level.";
    document.getElementById("crystalCrystalLevel").innerHTML = "Crystallization (Level " + gameData.upgrades.crystal.level + ") - Increase crystallized enemy chance by 1% per level.";
    document.getElementById("crystalDamagePowerDisplay").innerHTML = "Current bonus: " + formatNumber(gameData.fossilUpgrades.damagePower.power * gameData.fossilUpgrades.damagePower.level * 100) + "%";
    document.getElementById("crystalBonePowerDisplay").innerHTML = "Current bonus: " + formatNumber(gameData.fossilUpgrades.bonePower.power * gameData.fossilUpgrades.bonePower.level * 100) + "%";
    document.getElementById("crystalGainDisplay").innerHTML = "Current bonus: " + formatNumber(gameData.crystalMultiplier) + "x";
    document.getElementById("fossilGainDisplay").innerHTML = "Current bonus: " + formatNumber(gameData.fossilMultiplier) + "x";
    document.getElementById("buyCrystalDamagePower").innerHTML = "Upgrade for " + formatNumber(gameData.fossilUpgrades.damagePower.cost) + " fossils";
    document.getElementById("buyCrystalBonePower").innerHTML = "Upgrade for " + formatNumber(gameData.fossilUpgrades.bonePower.cost) + " fossils";
    document.getElementById("buyCrystalGain").innerHTML = "Upgrade for " + formatNumber(gameData.fossilUpgrades.crystalGain.cost) + " fossils";
    document.getElementById("buyFossilGain").innerHTML = "Upgrade for " + formatNumber(gameData.fossilUpgrades.fossilGain.cost) + " fossils";
    document.getElementById("crystalDamagePowerLevel").innerHTML = "Annihilation (Level " + gameData.fossilUpgrades.damagePower.level + ") - Increase Mutilation base by 1% per level.";
    document.getElementById("crystalBonePowerLevel").innerHTML = "Bone Transmutation (Level " + gameData.fossilUpgrades.bonePower.level + ") - Increase Bone Alchemy base by 1% per level.";
    document.getElementById("crystalGainLevel").innerHTML = "Duplication (Level " + gameData.fossilUpgrades.crystalGain.level + ") - Increase all crystal drops by a multiplicative 10% per level.";
    document.getElementById("fossilGainLevel").innerHTML = "Archaeology (Level " + gameData.fossilUpgrades.fossilGain.level + ") - Increase all fossil drops by a multiplicative 10% per level.";
}

function doWipe() {
    gameData = {
        bones: 10,
        crystals: 0,
        fossils: 0,
        fossilsOnPortal: 0,
        damagePerSecond: 0,
        totalKills: 0,
        highestLevelAllTime: 1,
        highestLevelThisGame: 1,
        currentLevel: 1,
        currentZone: "Oozing Forest",
        zoneKillCounterKills: 0,
        zoneKillCounterRequirement: 10,
        autoZoneProgression: true,
        damageMultiplier: 1,
        boneMultiplier: 1,
        crystalChance: 5,
        crystalMultiplier: 1,
        fossilMultiplier: 1,
    
        currentEnemy: {
            hp: 10,
            maxHp: 10,
            level: 1,
            crystallized: false,
            boss: false,
            ancient: false,
            name: "Hungry Ooze"
        },
    
        upgrades: {
            damage: {
                level: 1,
                power: 1.1,
                baseCost: 10,
                scaling: 2,
                cost: 10,
                nameString: "damage"
            },
            bone: {
                level: 1,
                power: 1.1,
                baseCost: 10,
                scaling: 2,
                cost: 10,
                nameString: "bone"
            },
            crystal: {
                level: 1,
                power: 1,
                baseCost: 10,
                scaling: 5,
                cost: 10,
                nameString: "crystal"
            }
        },
    
        fossilUpgrades: {
            damagePower: {
                level: 1,
                power: 0.01,
                baseCost: 1,
                scaling: 5,
                cost: 1,
                nameString: "damagePower"
            },
            bonePower: {
                level: 1,
                power: 0.01,
                baseCost: 1,
                scaling: 5,
                cost: 1,
                nameString: "bonePower"
            },
            crystalGain: {
                level: 1,
                power: 1.1,
                baseCost: 1,
                scaling: 2,
                cost: 1,
                nameString: "crystalGain"
            },
            fossilGain: {
                level: 1,
                power: 1.1,
                baseCost: 1,
                scaling: 2,
                cost: 1,
                nameString: "fossilGain"
            }
        },
    
        dinos: {
            Triceratops: {
                quantity: 1,
                dinoDps: 0,
                cost: 7,
                scaling: 1.4,
                baseDps: 5,
                multiplier: 1,
                nameString: "Triceratops"
            },
            Allosaurus: {
                quantity: 0,
                dinoDps: 0,
                cost: 250,
                scaling: 1.4,
                baseDps: 50,
                multiplier: 1,
                nameString: "Allosaurus"
            },
            Velociraptor: {
                quantity: 0,
                dinoDps: 0,
                cost: 10000,
                scaling: 1.4,
                baseDps: 500,
                multiplier: 1,
                nameString: "Velociraptor"
            },
            Megalosaurus: {
                quantity: 0,
                dinoDps: 0,
                cost: 500000,
                scaling: 1.4,
                baseDps: 5000,
                multiplier: 1,
                nameString: "Megalosaurus"
            },
            Stegosaurus: {
                quantity: 0,
                dinoDps: 0,
                cost: 25000000,
                scaling: 1.4,
                baseDps: 50000,
                multiplier: 1,
                nameString: "Stegosaurus"
            }
        }
    };
    recalculateDPS();
}

function doPortal() {
    if (gameData.highestLevelThisGame > 50) {
        let fossilsToAdd = gameData.fossilsOnPortal;
        let fossilsToKeep = gameData.fossils;
        let highestLevelAllTimeKeep = gameData.highestLevelAllTime;
        let fossilUpgradesKeep = gameData.fossilUpgrades;
        doWipe();
        gameData.fossils = fossilsToKeep;
        gameData.fossils += fossilsToAdd;
        gameData.highestLevelAllTime = highestLevelAllTimeKeep;
        gameData.fossilUpgrades = fossilUpgradesKeep;
        recalculateDPS();
    }
}

function formatNumber(number) {
    let suffixes = ['K', 'M', 'B', 'T', 'Qd', 'Qn', 'Sx', 'Sp', 'Oc', 'No', 'De'];
    let suffixNumber = Math.floor(Math.log10(number)/3)-1;
    if (suffixNumber < 0) {
        if (number < 1) {
            return number;
        }
        return Math.floor(number*100)/100;
    }
    else if (suffixNumber > 10) {
        let exp = Math.floor(Math.log10(number));
        let digits = Math.round(number / Math.pow(10, exp-2))/100;
        let formattedNumber = digits + "e" + exp;
        return formattedNumber;
    }
    else {
        let numDigits = Math.log10(number);
        let remainingDigits = numDigits%3;
        let divisorNum = numDigits - remainingDigits;
        let digits = Math.round(number / Math.pow(10,divisorNum-2))/100;
        let formattedNumber = digits + suffixes[suffixNumber];
        return formattedNumber;
    }
}

function prevLevel() {
    if (gameData.currentLevel > 1) {
        gameData.currentLevel--;
        spawnNewEnemy();
        document.getElementById("killCounter").style.visibility = "hidden";
    }
}

function nextLevel() {
    if (gameData.currentLevel == gameData.highestLevelThisGame - 1) {
        gameData.currentLevel++;
        spawnNewEnemy();
        document.getElementById("killCounter").style.visibility = "visible";
    }
    if (gameData.currentLevel < gameData.highestLevelThisGame - 1) {
        gameData.currentLevel++;
        spawnNewEnemy();
    }
}

function spawnNewEnemy() {
    var lvl = gameData.currentLevel;
    var hpMultiplier = 1;
    var hpBase = 10;
    var enemyhp = Math.pow(1.2, lvl - 1) * hpMultiplier * hpBase;
    var crystalChance = gameData.crystalChance;
    var isBoss = false;
    var isAncient = false;
    var enemyName;
    if (lvl % 5 == 0) {
        isBoss = true;
        enemyName = bossNames[Math.floor(Math.random() * bossNames.length)];
        enemyhp *= 10;
        if (lvl == gameData.highestLevelThisGame && lvl >= 50) {
            isAncient = true;
        }
    }
    else {
        enemyName = enemyNames[Math.floor(Math.random() * enemyNames.length)];
    }
    var isCrystallized = roll(crystalChance)
    if (isCrystallized) {
        enemyName = "Crystallized " + enemyName;
    }
    if (isAncient) {
        enemyName = "Ancient " + enemyName;
    }
    gameData.currentEnemy = {
        hp: Math.floor(enemyhp),
        maxHp: Math.floor(enemyhp),
        level: lvl,
        crystallized: isCrystallized,
        boss: isBoss,
        ancient: isAncient,
        name: enemyName
    };
}

function giveDrops(enemy) {
    var bones = 0;
    var crystals = 0;
    var fossils = 0;

    bones = Math.ceil(enemy.maxHp / 5) * gameData.boneMultiplier;
    if (enemy.crystallized) {
        bones *= 10;
        crystals = Math.ceil(enemy.maxHp / 15) * gameData.crystalMultiplier;
    }
    if (enemy.ancient) {
        fossils = Math.floor(Math.pow(1.2, gameData.currentLevel/5-9) * Math.pow((gameData.currentLevel / 5-9), 3) * gameData.fossilMultiplier);
    }

    gameData.bones += bones;
    gameData.crystals += crystals;
    gameData.fossilsOnPortal += fossils;
}

function attackMonster() {
    enemy = gameData.currentEnemy;
    enemy.hp -= gameData.damagePerSecond / 15;
    if (enemy.hp <= 0) {
        gameData.totalKills++;
        giveDrops(enemy);
        spawnNewEnemy();
        if (gameData.currentLevel == gameData.highestLevelThisGame && gameData.zoneKillCounterKills < gameData.zoneKillCounterRequirement) {
            gameData.zoneKillCounterKills++;
        }
        if (gameData.zoneKillCounterKills >= gameData.zoneKillCounterRequirement) {
            gameData.highestLevelThisGame++;
            gameData.zoneKillCounterKills = 0;
            if (gameData.highestLevelThisGame % 5 == 0) {
                gameData.zoneKillCounterRequirement = 1;
            }
            else if (gameData.zoneKillCounterRequirement = 1) {
                gameData.zoneKillCounterRequirement = 10;
            }
            document.getElementById("killCounter").style.visibility = "hidden";
            if (gameData.autoZoneProgression) {
                gameData.currentLevel++;
                spawnNewEnemy();
                document.getElementById("killCounter").style.visibility = "visible";
            }
        }
    }
}

function roll(percent) {
    let roll = Math.random()*100;
    if (roll < percent) {
        return true;
    }
    return false;
}

function recalculateDPS() {
    gameData.upgrades.bone.power = 1.1 + gameData.fossilUpgrades.bonePower.power * gameData.fossilUpgrades.bonePower.level;
    gameData.upgrades.damage.power = 1.1 + gameData.fossilUpgrades.damagePower.power * gameData.fossilUpgrades.damagePower.level;

    gameData.boneMultiplier = 1 * Math.pow(gameData.upgrades.bone.power, gameData.upgrades.bone.level - 1);
    gameData.damageMultiplier = 1 * Math.pow(gameData.upgrades.damage.power, gameData.upgrades.damage.level - 1);
    gameData.crystalChance = (5 + (gameData.upgrades.crystal.level * gameData.upgrades.crystal.power));

    gameData.crystalMultiplier = 1 * Math.pow(gameData.fossilUpgrades.crystalGain.power, gameData.fossilUpgrades.crystalGain.level - 1);
    gameData.fossilMultiplier = 1 * Math.pow(gameData.fossilUpgrades.fossilGain.power, gameData.fossilUpgrades.fossilGain.level - 1);

    var dps = 0;
    var dinos = gameData.dinos;
    var Triceratops = dinos.Triceratops;
    var Allosaurus = dinos.Allosaurus;
    var Velociraptor = dinos.Velociraptor;
    var Megalosaurus = dinos.Megalosaurus;
    var Stegosaurus = dinos.Stegosaurus;

    calculateDinoDPS(Triceratops);
    dps += Triceratops.dinoDps;
    calculateDinoDPS(Allosaurus);
    dps += Allosaurus.dinoDps;
    calculateDinoDPS(Velociraptor);
    dps += Velociraptor.dinoDps;
    calculateDinoDPS(Megalosaurus);
    dps += Megalosaurus.dinoDps;
    calculateDinoDPS(Stegosaurus);
    dps += Stegosaurus.dinoDps;

    gameData.damagePerSecond = dps;
}

function calculateDinoDPS(dino) {
    dino.multiplier = 1 * Math.pow(3, Math.floor(dino.quantity / 10)) * gameData.damageMultiplier;
    dino.dinoDps = dino.baseDps * dino.quantity * dino.multiplier;
    document.getElementById(dino.nameString + "dps").innerHTML = dino.nameString + " (Level " + dino.quantity + ")&emsp;|&emsp;" + formatNumber(dino.dinoDps) + " DPS &emsp;&emsp;";
    document.getElementById(dino.nameString + "DamageBonus").innerHTML = "&emsp;|&emsp;Next damage bonus at level " + Math.ceil((dino.quantity+1) / 10) * 10;
    document.getElementById("buy" + dino.nameString).innerHTML = "Upgrade for " + formatNumber(dino.cost) + " Bones";
}

function buyDino(dinoName) {
    dino = gameData.dinos[dinoName];
    if (gameData.bones >= dino.cost) {
        gameData.bones -= dino.cost;
        dino.quantity++;
        dino.cost *= dino.scaling;
        recalculateDPS()
    }
}

function buyCrystalUpgrade(upgradeName) {
    var upgrade = gameData.upgrades[upgradeName];
    if (gameData.crystals >= upgrade.cost) {
        gameData.crystals -= upgrade.cost;
        upgrade.level++;
        upgrade.cost = upgrade.baseCost * Math.pow(upgrade.scaling, upgrade.level-1);
    }
    recalculateDPS();
}

function buyFossilUpgrade(upgradeName) {
    var upgrade = gameData.fossilUpgrades[upgradeName];
    if (gameData.fossils >= upgrade.cost) {
        gameData.fossils -= upgrade.cost;
        upgrade.level++;
        upgrade.cost = upgrade.baseCost * Math.pow(upgrade.scaling, upgrade.level-1);
    }
    recalculateDPS();
}

function autoSave() {
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

function loadData() {
    var retrievedObject = localStorage.getItem('gameData');
    if (retrievedObject != null) {
        gameData = JSON.parse(retrievedObject);
        console.log(retrievedObject);
    }
    else {
        localStorage.setItem('gameData', JSON.stringify(gameData));
    }
}

function startLoading() {
    setInterval(update, 1000 / 60);
    setInterval(attackMonster, 1000 / 15);
    recalculateDPS();
    setInterval(autoSave, 15000)
}

window.onbeforeunload = closingCode;
function closingCode() {
    autoSave();
    return null;
}

loadData();
recalculateDPS();
setTimeout(startLoading, 100);
