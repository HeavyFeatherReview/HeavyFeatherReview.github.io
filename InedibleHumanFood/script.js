var currentlyHoveredID = null;
var debugMode = true;
var numTimes = 0;

$("p").hover(function()
{
    // Mouse enters
    currentlyHoveredID = this.id;
    console.log("Hovered over: " + this.id);
    if (currentlyHoveredID == "eggs")
    {
        // if (numTimes > 0)
        // {
        //     return;
        // }
        // numTimes+=1;
        createEgg();
    }
}, 
function()
{
    // if (debugMode)
    // {
    //     return;
    // }
    // Mouse leaves
    let id = this.id;
    $(this).children(".removable").remove();
});



// Egg

function createEgg()
{
    $("#eggs").append('<div class = "removable" id="egg">' +
      '<div id="eyeCont">' +
        '<div class="eye a"></div>' +
        '<div class="eye b"></div>' +
      '</div>' +
      '<div id="mouthCont">' +
        '<div class="timido left"></div>' +
        '<div id="mouth" ></div>' +
        '<div class="timido right"></div>' +
      '</div>' +
    '</div>');

    setTimeout(() => { 
        console.log("Timed out, hover over eggs")
        $("#egg").addClass("hover");
    }, 2000);

    $("#egg").mouseleave(function(){
        $("#egg").removeClass("hover");
    });
}