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
    crystalChance: 0.03,

    currentEnemy: {
        hp: 10,
        maxHp: 10,
        level: 1,
        rarity: 0,
        type: 0,
        name: "Hungry Ooze"
    },

    upgrades: {
        damage: {
            level: 1,
            power: 1.1,
            baseCost: 10,
            scaling: 5,
            cost: 10,
            nameString: "damage"
        },
        bone: {
            level: 1,
            power: 1.1,
            baseCost: 10,
            scaling: 5,
            cost: 10,
            nameString: "bone"
        },
        crystal: {
            level: 1,
            power: 1.1,
            baseCost: 10,
            scaling: 10,
            cost: 10,
            nameString: "crystal"
        }
    },

    dinos: {
        dino1: {
            quantity: 0,
            dinoDps: 0,
            cost: 5,
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
}

var enemyNames = ["Hungry Ooze", "Dead Glop",]


function update() {
    document.getElementById("bones").innerHTML = Math.floor(gameData.bones) + " Bones"
    document.getElementById("crystals").innerHTML = Math.floor(gameData.crystals) + " Crystals"
    document.getElementById("damagePerSecond").innerHTML = Math.floor(gameData.damagePerSecond) + " DPS"
    document.getElementById("enemyHealth").innerHTML = gameData.currentEnemy.name + ": " + Math.floor(gameData.currentEnemy.hp) + "/" + Math.floor(gameData.currentEnemy.maxHp) + " HP"
    document.getElementById("killCounter").innerHTML = gameData.zoneKillCounterKills + "/" + gameData.zoneKillCounterRequirement + " Kills to next level"
    document.getElementById("zone").innerHTML = "Zone:" + gameData.currentZone + "(Level " + gameData.currentLevel + ")"
}

function prevLevel() {
    if (gameData.currentLevel > 1) {
        gameData.currentLevel--
        spawnNewEnemy()
        document.getElementById("killCounter").style.visibility = "hidden"
    }
}

function nextLevel() {
    if (gameData.currentLevel == gameData.highestLevelThisGame-1) {
        gameData.currentLevel++
        spawnNewEnemy()
        document.getElementById("killCounter").style.visibility = "visible"
    }
    if (gameData.currentLevel < gameData.highestLevelThisGame-1) {
        gameData.currentLevel++
        spawnNewEnemy()
    }
}

function spawnNewEnemy() {
    lvl = gameData.currentLevel
    hpMultiplier = 1
    hpBase = 10
    hpBeforeExp = hpMultiplier * hpBase * lvl
    gameData.currentEnemy = {
        hp: Math.floor(Math.pow(hpBeforeExp, 1.2)),
        maxHp: Math.floor(Math.pow(hpBeforeExp, 1.2)),
        level: lvl,
        rarity: Math.floor(Math.random() * 1.031),
        type: 0,
        name: "Hungry Ooze"
    }
}

function giveDrops(enemy) {
    var bones = 0
    var crystals = 0

    bones = Math.ceil(enemy.maxHp / 5 * (1 + (enemy.rarity * 5)))
    crystals = Math.ceil(enemy.rarity * enemy.maxHp / 15)
    console.log(enemy.rarity + " " + enemy.maxHp)

    gameData.bones += bones
    gameData.crystals += crystals
}

function attackMonster() {
    enemy = gameData.currentEnemy
    enemy.hp -= gameData.damagePerSecond / 15
    if (enemy.hp <= 0) {
        gameData.totalKills++
        giveDrops(enemy)
        spawnNewEnemy()
        if (gameData.currentLevel == gameData.highestLevelThisGame && gameData.zoneKillCounterKills < gameData.zoneKillCounterRequirement) {
            gameData.zoneKillCounterKills++
        }
        if (gameData.zoneKillCounterKills >= gameData.zoneKillCounterRequirement) {
            gameData.highestLevelThisGame++
            gameData.zoneKillCounterKills = 0
            document.getElementById("killCounter").style.visibility = "hidden";
            if (gameData.autoZoneProgression) {
                gameData.currentLevel++
                spawnNewEnemy()
                document.getElementById("killCounter").style.visibility = "visible"
            }
        }
    }
}

function recalculateDPS() {
    var dps = 0
    dinos = gameData.dinos
    dino1 = dinos.dino1
    dino2 = dinos.dino2
    dino3 = dinos.dino3
    dino4 = dinos.dino4
    dino5 = dinos.dino5

    calculateDinoDPS(dino1)
    dps += dino1.dinoDps
    calculateDinoDPS(dino2)
    dps += dino2.dinoDps
    calculateDinoDPS(dino3)
    dps += dino3.dinoDps
    calculateDinoDPS(dino4)
    dps += dino4.dinoDps
    calculateDinoDPS(dino5)
    dps += dino5.dinoDps

    gameData.damagePerSecond = dps
}

function calculateDinoDPS(dino) {
    dino.dinoDps = dino.baseDps * dino.quantity
    dino.multiplier = 1 * dino.le
    document.getElementById(dino.nameString + "dps").innerHTML = dino.nameString + " - " + dino.dinoDps + " DPS - Level " + dino.quantity
}

function buyDino(dinoName) {
    dino = gameData.dinos[dinoName]
    if (gameData.bones >= dino.cost) {
        gameData.bones -= dino.cost
        dino.quantity++
        dino.cost *= dino.scaling
        document.getElementById("buy" + dinoName).innerHTML = "Upgrade " + dinoName + " for " + Math.ceil(dino.cost) + " Bones"
        recalculateDPS()
    }
}

function buyCrystalUpgrade(upgradeName) {
    upgrade = gameData.upgrades[upgradeName]
    if (gameData.crystals >= upgrade.cost) {

    }
}
var r = 255
var g = 0
var b = 255
var step = 1
function rainbowtexttest() {
    console.log("" + r + g + b)
    if (step == 1) {
        if (b < 1) {
            step++
        }
        else {
            b--
            document.getElementById("rainbowtexttest").style.color = "rgb(" + r + "," + g + "," + b + ")"
        }
    }
    if (step == 2) {
        if (g > 254) {
            step++
        }
        else {
            g++
            document.getElementById("rainbowtexttest").style.color = "rgb(" + r + "," + g + "," + b + ")"
        }
    }
    if (step == 3) {
        if (r < 1) {
            step++
        }
        else {
            r--
            document.getElementById("rainbowtexttest").style.color = "rgb(" + r + "," + g + "," + b + ")"
        }
    }
    if (step == 4) {
        if (b > 254) {
            step++
        }
        else {
            b++
            document.getElementById("rainbowtexttest").style.color = "rgb(" + r + "," + g + "," + b + ")"
        }
    }
    if (step == 5) {
        if (g < 1) {
            step++
        }
        else {
            g--
            document.getElementById("rainbowtexttest").style.color = "rgb(" + r + "," + g + "," + b + ")"
        }
    }
    if (step == 6) {
        if (r > 254) {  
            step = 1
        }
        else {
            r++
            document.getElementById("rainbowtexttest").style.color = "rgb(" + r + "," + g + "," + b + ")"
        }
    }
    setTimeout(rainbowtexttest, 5)
}



setInterval(update, 1000 / 60)
setInterval(attackMonster, 1000 / 15)
rainbowtexttest()