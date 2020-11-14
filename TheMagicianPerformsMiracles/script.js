const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['♥','♦','♠','♣'];
const suitColors = {
      '♠': 'black',
      '♣': 'black',
      '♦': 'red',
      '♥': 'red',
};

// Display cards
const totalCardNums = 6;
for (let i = 1; i<=totalCardNums; i++)
{
	console.debug("Adding to " + i);
	let suitIndex = i - 1;
	if (suitIndex > 3)
	{
		suitIndex = suitIndex - (suitIndex - 3);
	}
	console.debug("Suit: " + suitIndex);
	appendCardRankAndSuit("cardFront" + i, ranks[i-1], suits[suitIndex]);
}

function appendCardRankAndSuit(divID, rank, suit)
{
	let color = suitColors[suit];
	// Top 
	$("#" + divID + " .suit-rank-top").html(suit +"<br>"+ rank);
	// Center
	$("#" + divID+ " .inner p").append("<div class='suit-middle "+color+"'>"+ suit +"</div>");
	// Bottom
	$("#" + divID + " .rank-suit-bottom").html(rank +"<br>"+ suit);

	$("#" + divID + " .card-design").addClass(color);

}

function cureStarvation(){
	console.debug("Cure starvation");
}

function grandmotherDead(){
	console.debug("Grandmother dead");
}

function president(){
	console.debug("president");
}

function cardTrick(){
	console.debug("Card trick");
}

function sweep(){
	console.debug("Sweep");
}

function bow(){
	console.debug("Takes a bow");
	$("#backgroundElements").append("<canvas id = 'canv'></canvas>");
	drawBirds();
} 

function cancelBow(){
	cancelBirds();
	$("#canv").remove();
}