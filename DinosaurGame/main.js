var gameData = {
    bones: 10,
    crystals: 0,
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
    crystalChance: 3,

    currentEnemy: {
        hp: 10,
        maxHp: 10,
        level: 1,
        rarity: 0,
        rarity2: 0,
        type: 0,
        name: "Hungry Ooze"
    },

    upgrades: {
        damage: {
            level: 1,
            power: 1.1,
            baseCost: 10,
            scaling: 4,
            cost: 10,
            nameString: "damage"
        },
        bone: {
            level: 1,
            power: 1.1,
            baseCost: 10,
            scaling: 4,
            cost: 10,
            nameString: "bone"
        },
        crystal: {
            level: 1,
            power: 1,
            baseCost: 10,
            scaling: 10,
            cost: 10,
            nameString: "crystal"
        }
    },

    dinos: {
        dino1: {
            quantity: 1,
            dinoDps: 0,
            cost: 7,
            scaling: 1.4,
            baseDps: 5,
            multiplier: 1,
            nameString: "dino1"
        },
        dino2: {
            quantity: 0,
            dinoDps: 0,
            cost: 250,
            scaling: 1.4,
            baseDps: 50,
            multiplier: 1,
            nameString: "dino2"
        },
        dino3: {
            quantity: 0,
            dinoDps: 0,
            cost: 10000,
            scaling: 1.4,
            baseDps: 500,
            multiplier: 1,
            nameString: "dino3"
        },
        dino4: {
            quantity: 0,
            dinoDps: 0,
            cost: 500000,
            scaling: 1.4,
            baseDps: 5000,
            multiplier: 1,
            nameString: "dino4"
        },
        dino5: {
            quantity: 0,
            dinoDps: 0,
            cost: 25000000,
            scaling: 1.4,
            baseDps: 50000,
            multiplier: 1,
            nameString: "dino5"
        }
    }
};

var enemyNames = ["Hungry Ooze", "Dead Glop", "Gooey Phantom", "Slimy Ogre"];

var bossNames = {
    oozingForest: ["Shrek", "Mystical Slime", "Starving Ooze"]
};


function update() {
    document.getElementById("bones").innerHTML = Math.floor(gameData.bones) + " Bones";
    document.getElementById("crystals").innerHTML = Math.floor(gameData.crystals) + " Crystals";
    document.getElementById("damagePerSecond").innerHTML = Math.floor(gameData.damagePerSecond) + " DPS";
    document.getElementById("enemyHealth").innerHTML = gameData.currentEnemy.name + ": " + Math.floor(gameData.currentEnemy.hp) + "/" + Math.floor(gameData.currentEnemy.maxHp) + " HP";
    document.getElementById("killCounter").innerHTML = gameData.zoneKillCounterKills + "/" + gameData.zoneKillCounterRequirement + " Kills to next level";
    document.getElementById("zone").innerHTML = "Zone: " + gameData.currentZone + " (Level " + gameData.currentLevel + ")";
    document.getElementById("crystalDamageDisplay").innerHTML = "Current bonus: " + Math.floor(gameData.damageMultiplier * 100) / 100 + "x";
    document.getElementById("crystalBoneDisplay").innerHTML = "Current bonus: " + Math.floor(gameData.boneMultiplier * 100) / 100 + "x";
    document.getElementById("crystalCrystalDisplay").innerHTML = "Current chance: " + Math.floor(gameData.crystalChance) + "%";
    document.getElementById("buyCrystalDamage").innerHTML = "Upgrade for " + Math.ceil(gameData.upgrades.damage.cost) + " crystals";
    document.getElementById("buyCrystalBone").innerHTML = "Upgrade for " + Math.ceil(gameData.upgrades.bone.cost) + " crystals";
    document.getElementById("buyCrystalCrystal").innerHTML = "Upgrade for " + Math.ceil(gameData.upgrades.crystal.cost) + " crystals";
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
    var enemyhp = Math.pow(1.5, lvl - 1) * hpMultiplier * hpBase;
    var bonusCrystalChance = 0;
    var cappedCrystalChance = gameData.crystalChance;
    if (gameData.crystalChance > 99) {
        bonusCrystalChance = gameData.crystalChance - 99;
        cappedCrystalChance = 99;
    }
    if (bonusCrystalChance > 99998) {
        bonusCrystalChance = 99998;
    }
    var enemyType = 0;
    if (lvl % 5 == 0) {
        enemyType = 1;
    }
    var enemyName = enemyNames[Math.floor(Math.random() * enemyNames.length)];
    if (enemyType == 1) {
        enemyName = bossNames.oozingForest[Math.floor(Math.random() * bossNames.oozingForest.length)];
    }
    var rar1 = Math.floor(Math.random() * (1 / (1 - cappedCrystalChance / 100)));
    var rar2 = Math.floor(Math.random() * (1 / (1 - ((0.00001) * (bonusCrystalChance + 1)))));

    if (rar1 >= 1) {
        rar1 = 1;
        enemyName = "Crystallized " + enemyName;
    }
    if (rar2 >= 1) {
        rar2 = 1;
        enemyName = "Elite " + enemyName;
    }

    console.log("" + cappedCrystalChance + " " + bonusCrystalChance);

    gameData.currentEnemy = {
        hp: Math.floor(enemyhp * (1 + (9 * enemyType))),
        maxHp: Math.floor(enemyhp * (1 + (9 * enemyType))),
        level: lvl,
        rarity: rar1,
        rarity2: rar2,
        type: enemyType,
        name: enemyName
    };
}

function giveDrops(enemy) {
    var bones = 0;
    var crystals = 0;

    bones = Math.ceil(enemy.maxHp / 5 * (1 + (enemy.rarity * 5)) * (1 + (enemy.rarity2 * 5))) * gameData.boneMultiplier;
    crystals = Math.ceil(enemy.rarity * (enemy.maxHp / 15) * (1 + (enemy.rarity2 * 5)));

    gameData.bones += bones;
    gameData.crystals += crystals;
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

function recalculateDPS() {
    var dps = 0;
    var dinos = gameData.dinos;
    var dino1 = dinos.dino1;
    var dino2 = dinos.dino2;
    var dino3 = dinos.dino3;
    var dino4 = dinos.dino4;
    var dino5 = dinos.dino5;

    calculateDinoDPS(dino1);
    dps += dino1.dinoDps;
    calculateDinoDPS(dino2);
    dps += dino2.dinoDps;
    calculateDinoDPS(dino3);
    dps += dino3.dinoDps;
    calculateDinoDPS(dino4);
    dps += dino4.dinoDps;
    calculateDinoDPS(dino5);
    dps += dino5.dinoDps;

    gameData.damagePerSecond = dps;
}

function calculateDinoDPS(dino) {
    dino.multiplier = 1 * Math.pow(3, Math.floor(dino.quantity / 10)) * gameData.damageMultiplier;
    dino.dinoDps = dino.baseDps * dino.quantity * dino.multiplier;
    document.getElementById(dino.nameString + "dps").innerHTML = dino.nameString + " - " + Math.floor(dino.dinoDps) + " DPS - Level " + dino.quantity;
    document.getElementById(dino.nameString + "DamageBonus").innerHTML = "Next damage bonus at level " + Math.ceil((dino.quantity+1) / 10) * 10;
    document.getElementById("buy" + dino.nameString).innerHTML = "Upgrade " + dino.nameString + " for " + Math.ceil(dino.cost) + " Bones";
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
    gameData.boneMultiplier = 1 * Math.pow(gameData.upgrades.bone.power, gameData.upgrades.bone.level - 1);
    gameData.damageMultiplier = 1 * Math.pow(gameData.upgrades.damage.power, gameData.upgrades.damage.level - 1);
    gameData.crystalChance = (2 + (gameData.upgrades.crystal.level * gameData.upgrades.crystal.power));
    recalculateDPS();
}
var r = 255;
var g = 0;
var b = 255;
var step = 1;
function rainbowtexttest() {
    if (step == 1) {
        if (b < 1) {
            step++;
        }
        else {
            b--;
            document.getElementById("rainbowtexttest").style.color = "rgb(" + r + "," + g + "," + b + ")";
        }
    }
    if (step == 2) {
        if (g > 254) {
            step++;
        }
        else {
            g++;
            document.getElementById("rainbowtexttest").style.color = "rgb(" + r + "," + g + "," + b + ")";
        }
    }
    if (step == 3) {
        if (r < 1) {
            step++;
        }
        else {
            r--;
            document.getElementById("rainbowtexttest").style.color = "rgb(" + r + "," + g + "," + b + ")";
        }
    }
    if (step == 4) {
        if (b > 254) {
            step++;
        }
        else {
            b++;
            document.getElementById("rainbowtexttest").style.color = "rgb(" + r + "," + g + "," + b + ")";
        }
    }
    if (step == 5) {
        if (g < 1) {
            step++;
        }
        else {
            g--;
            document.getElementById("rainbowtexttest").style.color = "rgb(" + r + "," + g + "," + b + ")";
        }
    }
    if (step == 6) {
        if (r > 254) {
            step = 1;
        }
        else {
            r++;
            document.getElementById("rainbowtexttest").style.color = "rgb(" + r + "," + g + "," + b + ")";
        }
    }
    setTimeout(rainbowtexttest, 5);
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
    rainbowtexttest();
    recalculateDPS();
    setInterval(autoSave, 15000)
}

window.onbeforeunload = closingCode;
function closingCode() {
    autoSave();
    return null;
}

loadData();
setTimeout(startLoading, 100);
