// Fix the widths of everything
var textPadding = [15, 60, 60, 25, 20];
for (let i = 1; i < 6; i++) {
    let clipImageWidth = $("#clip" + i + "Image").width();
    console.debug("Set clip1Text width to" + clipImageWidth);
    $("#clip" + i + "Text").width(clipImageWidth - textPadding[i - 1]);
}

setImagePositions();

function setImagePositions() {

    let totalWidth = $("#BeingTheMurderedHousekeeper").width();
    let windowDifference = $(window).width() - totalWidth;

    // 2
    let leftPosition = totalWidth - $("#imageContainer2").width() + windowDifference / 2;
    $("#imageContainer2").css("left", leftPosition);

    // 4
    let leftPosition4 = totalWidth - $("#imageContainer4").width() + windowDifference / 2 - 150;
    $("#imageContainer4").css("left", leftPosition4);

    // 4
    let leftPosition5 = totalWidth - $("#imageContainer5").width() + windowDifference / 2 - 250;
    $("#imageContainer5").css("left", leftPosition5);
}


$(window).resize(function() {
    setImagePositions();
});