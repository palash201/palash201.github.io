let playerData = {
    version: 1.11,
    nameString: "Player",
    class: "E",
    level: 1,
    xp: 0,
    xpNeeded: 20,
    gold: 0,
    timeFactorSecond: 10,

    quest: {
        nameString: "None",
        difficulty: "",
        gold: 0,
        xp: 0,
        timeFactor: 0,
        timeFactorMax: 100
    },

    pet: {
        nameString: "Slime",
        level: 1,
        xp: 0,
        xpNeeded: 20,
        damage: 0,
        buff: 0,
        buffType: "damage"
    },

    inventory: {

    },

    character: {
        skillPoints: 1,
        classXp: 0,
        classXpNeeded: 1000,

        skills: {

        }
    },

    currentQuests: {
        quest1: null,
        quest2: null,
        quest3: null,
        quest4: null
    },
    
    questString: ""
};

let questNames = ["Eliminate Old Hobo", "Clear the infestation", "Travel through the toxic swamp", "Slay bandits", "Assassinate the bandit leader"];

let classes = ["E", "D", "C", "B", "A", "S"];

function startQuest(questString) {
    let startButton = document.getElementById(questString + "Start");
    let progressBar = document.getElementById(questString + "ProgressBar");
    let quest = playerData.currentQuests[questString];
    playerData.quest = quest;

    setClass(startButton, 'invisible');
    setClass(progressBar, 'invisible');
    toggleClass(progressBar, 'invisible');
    playerData.questString = questString;
};

function newQuest() {
    let lvl = playerData.level;
    let questName = questNames[Math.floor(Math.random() * questNames.length)];
    let difficulty1 = playerData.class;
    let gold1 = Math.floor(10 * Math.pow(1.15, lvl) * (0.5 + Math.random() * 2));
    let xp1 = Math.floor(2 * Math.pow(1.15, lvl) * (0.5 + Math.random() * 2));
    let timeFactor1 = Math.floor(60 * Math.pow(1.35, lvl) * (0.5 + Math.random() * 2));

    if (difficulty1 == "E") {
        gold1 *= 1;
        xp1 *= 1;
        timeFactor1 *= 1;
    };

    let quest = {
        nameString: questName,
        difficulty: difficulty1,
        gold: gold1,
        xp: xp1,
        timeFactor: 0,
        timeFactorMax: timeFactor1
    };
    return quest;
};

function assignQuestToBox(questString) {
    let startButton = document.getElementById(questString + "Start");
    let progressBar = document.getElementById(questString + "ProgressBar");
    let quest = newQuest();
    document.getElementById(questString + "Name").innerHTML = quest.nameString + " (Difficulty: " + quest.difficulty + ")";
    document.getElementById(questString + "Reward").innerHTML = quest.gold + " gold " + quest.xp + " xp";
    document.getElementById(questString + "Time").innerHTML = "Time factor: " + quest.timeFactorMax;

    setClass(progressBar, 'invisible');
    setClass(startButton, 'invisible');
    toggleClass(startButton, 'invisible');

    playerData.currentQuests[questString] = quest;
};

function endQuest() {
    let quest = playerData.currentQuests[playerData.questString],
        gold = quest.gold,
        xp = quest.xp;
    
    playerData.gold += gold;
    playerData.xp += xp;

    assignQuestToBox(playerData.questString);
    playerData.quest = {
        nameString: "None",
        difficulty: "",
        gold: 0,
        xp: 0,
        timeFactor: 0,
        timeFactorMax: 100
    };
    playerData.questString = "";
}

function questInterval() {
    let q = playerData.quest;
    if (q.nameString !== "None" && q.timeFactor <= q.timeFactorMax) {
        q.timeFactor += playerData.timeFactorSecond / 20;
    };
    if (q.timeFactor > q.timeFactorMax) {
        q.timeFactor = q.timeFactorMax;
        endQuest();
    };
};

function update() {
    questInterval();
    let p = playerData;
    let q = p.quest;
    let d = p.pet;
    // make pairs of objects and corresponding elements
    let htmlElementNames = ["characterNameText", "characterClassText", "characterLevelText", "characterXPText", "characterGoldText", "questNameText", "questDifficultyText", "questGoldRewardText", "questXPRewardText", "questTimeLeftText", "quest1ProgressBar", "quest2ProgressBar", "quest3ProgressBar", "quest4ProgressBar"];
    let jsObjects = [p.nameString, "Class: " + p.class, "Level: " + p.level, "XP: " + Math.floor(p.xp) + "/" + Math.ceil(p.xpNeeded), "Gold: " + Math.floor(p.gold), q.nameString, "Contract difficulty: " + q.difficulty, "Contract gold reward: " + Math.floor(q.gold), "Contract xp reward: " + Math.floor(q.xp), Math.floor((q.timeFactor / q.timeFactorMax) * 10000) / 100 + "%", Math.floor((q.timeFactor / q.timeFactorMax) * 10000) / 100 + "%",Math.floor((q.timeFactor / q.timeFactorMax) * 10000) / 100 + "%",Math.floor((q.timeFactor / q.timeFactorMax) * 10000) / 100 + "%",Math.floor((q.timeFactor / q.timeFactorMax) * 10000) / 100 + "%"];

    // update element values
    for (i = 0; i < htmlElementNames.length; i++) {
        document.getElementById(htmlElementNames[i]).innerHTML = jsObjects[i];
    };

    if (p.xp >= p.xpNeeded) {
        p.xp = p.xp-p.xpNeeded;
        p.xpNeeded *= 1.45;
        p.level++;
    }

    document.getElementById("quest1ProgressBar").style.background = "linear-gradient(90deg, rgb(25, 160, 184)"+ Math.floor((q.timeFactor / q.timeFactorMax) * 10000) / 100 + "%, rgba(0,0,0,0.5) " + Math.floor((q.timeFactor / q.timeFactorMax) * 10000) / 100 + "%)";
    document.getElementById("quest2ProgressBar").style.background = "linear-gradient(90deg, rgb(25, 160, 184)"+ Math.floor((q.timeFactor / q.timeFactorMax) * 10000) / 100 + "%, rgba(0,0,0,0.5) " + Math.floor((q.timeFactor / q.timeFactorMax) * 10000) / 100 + "%)";
    document.getElementById("quest3ProgressBar").style.background = "linear-gradient(90deg, rgb(25, 160, 184)"+ Math.floor((q.timeFactor / q.timeFactorMax) * 10000) / 100 + "%, rgba(0,0,0,0.5) " + Math.floor((q.timeFactor / q.timeFactorMax) * 10000) / 100 + "%)";
    document.getElementById("quest4ProgressBar").style.background = "linear-gradient(90deg, rgb(25, 160, 184)"+ Math.floor((q.timeFactor / q.timeFactorMax) * 10000) / 100 + "%, rgba(0,0,0,0.5) " + Math.floor((q.timeFactor / q.timeFactorMax) * 10000) / 100 + "%)";
};

document.getElementById("homeButton").style.backgroundColor = "rgba(121, 235, 255, 0.3)";
function toggleClass(element, className) {
    let classes = element.className.split(/\s+/),
        length = classes.length,
        i = 0;

    for (; i < length; i++) {
        if (classes[i] === className) {
            classes.splice(i, 1);
            break;
        }
    }
    // The className is not found
    if (length === classes.length) {
        classes.push(className);
    }

    element.className = classes.join(' ');
};

function setClass(element, className) {
    let classes = element.className.split(/\s+/),
        length = classes.length,
        i = 0;
    classFound = false;
    for (; i < length; i++) {
        if (classes[i] === className) {
            classFound = true;
            break;
        }
    }
    // The className is not found
    if (!classFound) {
        classes.push(className);
    }

    element.className = classes.join(' ');
}

function switchToTab(e, tabName) {
    let active = 'invisible',
        home = document.getElementById("home"),
        char = document.getElementById("character"),
        inv = document.getElementById("inventory"),
        quest = document.getElementById("quest"),
        shop = document.getElementById("shop"),
        buttonIDs = ["homeButton", "charButton", "invButton", "questButton", "shopButton"];

    e.preventDefault();

    setClass(home, active);
    setClass(char, active);
    setClass(inv, active);
    setClass(quest, active);
    setClass(shop, active);

    for (i = 0; i < buttonIDs.length; i++) {
        let obj = document.getElementById(buttonIDs[i]);
        obj.style = "";
        setClass(obj, 'shadowBackground')
    }

    e.target.style.backgroundColor = "rgba(121, 235, 255,0.3)";

    toggleClass(document.getElementById(tabName), active);
}

(function (window, document) {

    let layout = document.getElementById('layout'),
        menu = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');



    function toggleAll(e) {
        let active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    }

    function handleEvent(e) {
        if (e.target.id === menuLink.id) {
            return toggleAll(e);
        }

        if (e.target.id === "homeButton") {
            return switchToTab(e, "home");
        }

        if (e.target.id === "invButton") {
            return switchToTab(e, "inventory");
        }

        if (e.target.id === "charButton") {
            return switchToTab(e, "character");
        }

        if (e.target.id === "questButton") {
            return switchToTab(e, "quest");
        }

        if (e.target.id === "shopButton") {
            return switchToTab(e, "shop");
        }

        if (e.target.id === "quest1Start") {
            if (playerData.quest.nameString === "None") {
                return startQuest("quest1");
            }
        }

        if (e.target.id === "quest2Start") {
            if (playerData.quest.nameString === "None") {
                return startQuest("quest2");
            }
        }

        if (e.target.id === "quest3Start") {
            if (playerData.quest.nameString === "None") {
                return startQuest("quest3");
            }
        }

        if (e.target.id === "quest4Start") {
            if (playerData.quest.nameString === "None") {
                return startQuest("quest4");
            }
        }

        if (menu.className.indexOf('active') !== -1) {
            return toggleAll(e);
        }
    }

    document.addEventListener('click', handleEvent);

}(this, this.document));

function autoSave() {
    localStorage.setItem('playerData375627652', JSON.stringify(playerData));
}

function loadData() {
    var retrievedObject = localStorage.getItem('playerData375627652');
    if (retrievedObject != null) {
        playerData = JSON.parse(retrievedObject);
        if (!playerData["version"] || playerData["version"] < 1.1) {
            playerData = {
                version: 1.11,
                nameString: "Player",
                class: "E",
                level: 1,
                xp: 0,
                xpNeeded: 20,
                gold: 0,
                timeFactorSecond: 10,
            
                quest: {
                    nameString: "None",
                    difficulty: "",
                    gold: 0,
                    xp: 0,
                    timeFactor: 0,
                    timeFactorMax: 100
                },
            
                pet: {
                    nameString: "Slime",
                    level: 1,
                    xp: 0,
                    xpNeeded: 20,
                    damage: 0,
                    buff: 0,
                    buffType: "damage"
                },
            
                inventory: {
            
                },
            
                character: {
                    skillPoints: 1,
                    classXp: 0,
                    classXpNeeded: 1000,
            
                    skills: {
            
                    }
                },
            
                currentQuests: {
                    quest1: null,
                    quest2: null,
                    quest3: null,
                    quest4: null
                },
                
                questString: ""
            };
        }
        console.log(retrievedObject);
    }
    else {
        localStorage.setItem('playerData375627652', JSON.stringify(playerData));
    }
}

function startLoading() {
    setInterval(update, 1000 / 20);
    assignQuestToBox("quest1");
    assignQuestToBox("quest2");
    assignQuestToBox("quest3");
    assignQuestToBox("quest4");
}

window.onbeforeunload = closingCode;
function closingCode() {
    autoSave();
    return null;
}

loadData();
setTimeout(startLoading, 100);