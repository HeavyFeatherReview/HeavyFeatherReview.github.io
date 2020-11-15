const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['&hearts;', '&diams;', '&spades;', '&clubs;'];
const suitColors = {
    '&spades;': 'black',
    '&clubs;': 'black',
    '&diams;': 'red',
    '&hearts;': 'red',
};

const indexToCardNums = {
    '1': { 'rank': 'A' /*Desire*/ , 'suit': '&hearts;' /*childhood*/ },
    '2' /* grandmother */: { 'rank': '5' /*Change*/ , 'suit': '&spades;' },
    '3' /*president*/: { 'rank': '9' /*new beginnings*/ , 'suit': '&spades;' },
    '4' /*card trick*/: { 'rank': '4' /*satisfaction*/ , 'suit': '&hearts;' /*spring*/ },
    '5' /*sweep*/: { 'rank': '6' /*adjustments*/ , 'suit': '&diams;' /*growth*/ },
    '6' /*bow*/: { 'rank': 'K' /*new beginnings*/ , 'suit': '&clubs;' },
};
var w;
var h;

// Display cards
const totalCardNums = 6;
for (let i = 1; i <= totalCardNums; i++) {
    console.debug("Adding to " + i);
    let cardInfo = indexToCardNums[i];
    appendCardRankAndSuit("cardFront" + i, cardInfo['rank'], cardInfo['suit']);
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
    $("#cureStarvation").append('<div id="steamWrapper">'+
                    '<div id="steam"></div>'+
                '</div>');
}

function cancelCureStarvation() {
    console.debug("Cancel cure starvation");
    $("#steamWrapper").remove();
}

var fadedOut = false;

function grandmotherDead() {
    console.debug("Grandmother dead");
    // Create cinnamon
    $("#cardFront2").append("<div id='cinnamon-wrap'></div>");
    for (let i = 0; i < 300; i++) {
        $("#cinnamon-wrap").append("<div class='c'></div>");
    }
}

function cancelGrandmotherDead() {
    $("#cinnamon-wrap").remove();
    fadedOut = false;
}

var twinkleInterval = null;
function president() {
    console.debug("president");
    console.debug("Make sparkle visible");
    $("#presidentInnerBack").css("background", "black");
    $("#presidentInnerBack").css("color", "white");
    $("#sparkle").css("visibility", "visible");
    twinkleInterval = window.setInterval(function() {
    	let randomPercentLeft = getRandomInt(30, 80);
    	let randomPercentTop = getRandomInt(30, 80);
    	console.debug("New coords: left:" + randomPercentLeft + ", top" + randomPercentTop);
        $("svg").css("left", randomPercentLeft + "%");
        $("svg").css("top", randomPercentTop + "%");
    }, 7000);
}

function cancelPresident() {
    $("#sparkle").css("visibility", "hidden");
    $("#presidentInnerBack").css("background", "");
    $("#presidentInnerBack").css("color", "");
    window.clearInterval(twinkleInterval);
}

var displayCardsInterval = null;
var addHover = true;

function cardTrick() {
    console.debug("Card trick");
    // $("#backgroundElements").append('<div id="cards"></div>');
    // $(".container").not("#cardFrontContainer4").each(function(index) {
    //     $(this).animate({ opacity: '0' }, "slow");
    // });
    // createDeck();
    $(".container .back .inner").not("#cardFrontContainer4").append("<p class='trickText'>It is a very good card trick.</p>");
    $(".backText").css("display", "none");
    //$("#presidentInnerBack").removeAttr('style');
    //.css({"background": "", "background-color":""});
    var i = 0;
    displayCardsInterval = window.setInterval(function() {
        if (i > 5) {
            i = 0;
            if (addHover)
                addHover = false;
            else
                addHover = true;
        }
        if (i == 3) {
            i += 1;
        }
        if (addHover) {
            console.debug("Add hover class to " + i);
            $(".container").eq(i).addClass("hover");
        } else {
            console.debug("Remove hover class to " + i);
            $(".container").eq(i).removeClass("hover");
        }
        i += 1;
    }, 200);
}

function cancelCardTricks() {
    if (displayCardsInterval) {
        window.clearInterval(displayCardsInterval);
    }
    $(".trickText").remove();
    $(".container .back .inner p").css("display", "block");
    $(".container").removeClass("hover");
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addWindowEventListener() {
    window.addEventListener('resize', function() {
        let c = document.getElementById('canv');
        if (!c) {
            return;
        }
        c.width = w = document.body.clientWidth;
        c.height = h = document.body.clientHeight;
    }, false);
}


function deck() {

    function card(r, s) {
        this.rank = r;
        this.suit = s;
    }

    this.order = [
        new card('A', 'spades'), new card('2', 'spades'), new card('3', 'spades'), new card('4', 'spades'), new card('5', 'spades'),
        new card('6', 'spades'), new card('7', 'spades'), new card('8', 'spades'), new card('9', 'spades'), new card('10', 'spades'),
        new card('J', 'spades'), new card('Q', 'spades'), new card('K', 'spades'),
        new card('A', 'clubs'), new card('2', 'clubs'), new card('3', 'clubs'), new card('4', 'clubs'), new card('5', 'clubs'),
        new card('6', 'clubs'), new card('7', 'clubs'), new card('8', 'clubs'), new card('9', 'clubs'), new card('10', 'clubs'),
        new card('J', 'clubs'), new card('Q', 'clubs'), new card('K', 'clubs'),
        new card('A', 'hearts'), new card('2', 'hearts'), new card('3', 'hearts'), new card('4', 'hearts'), new card('5', 'hearts'),
        new card('6', 'hearts'), new card('7', 'hearts'), new card('8', 'hearts'), new card('9', 'hearts'), new card('10', 'hearts'),
        new card('J', 'hearts'), new card('Q', 'hearts'), new card('K', 'hearts'),
        new card('A', 'diams'), new card('2', 'diams'), new card('3', 'diams'), new card('4', 'diams'), new card('5', 'diams'),
        new card('6', 'diams'), new card('7', 'diams'), new card('8', 'diams'), new card('9', 'diams'), new card('10', 'diams'),
        new card('J', 'diams'), new card('Q', 'diams'), new card('K', 'diams')
    ];

    this.shuffle = function() {
        for (var i = 0; i < this.order.length; i++) {
            var j = i;
            while (j == i) {
                j = Math.floor(Math.random() * this.order.length);
            }
            var tmp = this.order[i];
            this.order[i] = this.order[j];
            this.order[j] = tmp;
        }
    };

    this.shuffle();

    this.top_card = function() {
        if (this.order.length == 0)
            return false;
        this.order.shift();
        return true;
    };
}

var d = null;

var shuffled = true;

function createDeck() {
    $("#cards").html('');
    d = new deck();
    console.debug(d.order);
    for (i = 0; i < d.order.length; i++) {
        $('#cards').prepend(cardDOM(d.order[i]));
    }
    $("#cards").animate({ opacity: "1" }, 2000, function() {
        $("#cards .card").animate({ marginRight: "-107px" }, 5000, function() {
            $("#cards .card:last").click();
        });
    });
    listenToLastMouseClick();
}

function listenToLastMouseClick() {
    $("#cards .card:last").css("pointer", "cursor");
    $("#cards .card:last").click(function() {
        console.debug("Final card clicked: ");
        var topCard = d.order[0];
        console.log(d.order);
        $('#cards').html('');
        for (i = 0; i < d.order.length; i++) {
            $('#cards').prepend(cardDOM(topCard));
        }
        $("#cards .card").animate({ marginRight: "-107px" }, 2000, "swing");
    });
}

function cancelDeck() {
    $("#cards").html('');
}

function cardDOM(c, m) {
    if (c) {
        return $('<div class="card ' + c.suit + '"' + (m ? ' style="margin-right:' + m + ';"' : '') + '><div class="top_rank">' + c.rank + '</div><div class="top_suit">&' + c.suit + ';</div><div class="suit">&' + c.suit + ';</div><div class="bottom_suit">&' + c.suit + ';</div><div class="bottom_rank">' + c.rank + '</div></div>');
    }
}