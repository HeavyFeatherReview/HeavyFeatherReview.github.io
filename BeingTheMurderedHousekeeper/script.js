// Fix the widths of everything
var textPadding = [40, 80, 80, 50, 40];
for (let i = 1; i < 6; i++) {
    let clipImageWidth = $("#clip" + i + "Image").width();
    console.debug("Set clip1Text width to" + clipImageWidth);
    $("#clip" + i + "Text").width(clipImageWidth - textPadding[i - 1]);
}

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

var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i),
    isTablet = navigator.userAgent.toLowerCase().match(/tablet/i),
    isAndroid = navigator.userAgent.toLowerCase().match(/android/i),
    isiPhone = navigator.userAgent.toLowerCase().match(/iphone/i),
    isiPad = navigator.userAgent.toLowerCase().match(/ipad/i);

$(document).ready(function() {
    setImagePositions();
});

$(window).resize(function() {
    setImagePositions();
});

if (isMobile) {
    $(".image-container").on("tap", function() {
        console.debug("Tapped");
        $(this).mouseover();
    });
}