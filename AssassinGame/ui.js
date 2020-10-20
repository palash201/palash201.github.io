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
}

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
    let active = 'invisible';
    e.preventDefault();
    setClass(document.getElementById("home"), active);
    setClass(document.getElementById("character"), active);
    setClass(document.getElementById("inventory"), active);
    setClass(document.getElementById("quest"), active);
    toggleClass(document.getElementById(tabName), active);
}

(function (window, document) {

    let layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
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
        
        if (menu.className.indexOf('active') !== -1) {
            return toggleAll(e);
        }
    }
    
    document.addEventListener('click', handleEvent);

}(this, this.document));

