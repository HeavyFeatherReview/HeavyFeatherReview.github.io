// Fix the sizes of everything
var textPadding = [10, 60, 60, 25, 20];
for (let i = 1; i < 6; i++) {
    let clipImageWidth = $("#clip" + i + "Image").width();
    console.debug("Set clip1Text width to" + clipImageWidth);
    $("#clip" + i + "Text").width(clipImageWidth - textPadding[i-1]);
}