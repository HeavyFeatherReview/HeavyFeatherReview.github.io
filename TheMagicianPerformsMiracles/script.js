const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['♥', '♦', '♠', '♣'];
const suitColors = {
    '♠': 'black',
    '♣': 'black',
    '♦': 'red',
    '♥': 'red',
};

var w;
var h;

// Display cards
const totalCardNums = 6;
for (let i = 1; i <= totalCardNums; i++) {
    console.debug("Adding to " + i);
    let suitIndex = i - 1;
    if (suitIndex > 3) {
        suitIndex = suitIndex - (suitIndex - 3);
    }
    console.debug("Suit: " + suitIndex);
    appendCardRankAndSuit("cardFront" + i, ranks[i - 1], suits[suitIndex]);
}

function appendCardRankAndSuit(divID, rank, suit) {
    let color = suitColors[suit];
    // Top 
    $("#" + divID + " .suit-rank-top").html(suit + "<br>" + rank);
    // Center
    //$("#" + divID + " .inner p").append("<div class='suit-middle " + color + "'>" + suit + "</div>");
    // Bottom
    $("#" + divID + " .rank-suit-bottom").html(rank + "<br>" + suit);

    $("#" + divID + " .card-design").addClass(color);

}

function cureStarvation() {
    console.debug("Cure starvation");
    $("#cureStarvation").css("display", "block");
    $("body").css("background-color", "grey");
}

function cancelCureStarvation() {
    console.debug("Cancel cure starvation");
    $("#cureStarvation").css("display", "none");
    $("body").css("background-color", "white");
}

var fadedOut = false;

function grandmotherDead() {
    console.debug("Grandmother dead");
    // Create cinnamon
    $("#cardFront2").append("<div id='cinnamon-wrap'></div>");
    for (let i = 0; i < 300; i++) {
        $("#cinnamon-wrap").append("<div class='c'></div>");
    }

    if (!fadedOut) {
        fadedOut = true;
        setTimeout(() => {
            console.debug("Fade out!");
            $("#cinnamon-wrap").fadeOut(5000);
            fadedOut = false;
        }, 14000);
    }
}

function cancelGrandmotherDead() {
    $("#cinnamon-wrap").remove();
    fadedOut = false;
}

function president() {
    console.debug("president");
    console.debug("Make sparkle visible");
    $("#sparkle").css("visibility", "visible");
}

function cancelPresident() {
    $("#presidentInnerBack").removeClass("black-background");
    $("#sparkle").css("visibility", "hidden");
}

function cardTrick() {
    console.debug("Card trick");
}

function sweep() {
    console.debug("Sweep");
    $("#backgroundElements").append("<canvas id = 'canv'></canvas>");
    runWind();
    addWindowEventListener();
}

function cancelSweep() {
    cancelWind();
    $("#canv").remove();
}

function bow() {
    console.debug("Takes a bow");
    $("#backgroundElements").append("<canvas id = 'canv'></canvas>");
    drawBirds();
    addWindowEventListener();
}

function cancelBow() {
    cancelBirds();
    $("#canv").remove();
}

function addWindowEventListener() {
    window.addEventListener('resize', function() {
        let c = document.getElementById('canv');
        if (!c)
        {
        	return;
        }
        c.width = w = document.body.clientWidth;
        c.height = h = document.body.clientHeight;
    }, false);
}