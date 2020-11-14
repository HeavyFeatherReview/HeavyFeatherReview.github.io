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
	appendCardRankAndSuit("cardFront" + i, ranks[i], suits[suitIndex]);
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

function cureStarvation()
{
	console.debug("Cure starvation");
}

// What do cards look like? Where do the ranks and suits go again? top left and bottom right corner?
// what about number?
/*
shape
number





         more shapes







                   number
                   shape (inverted)
*/