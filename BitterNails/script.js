$('.mail-choice').change(function() {
    if ($(this).is(":checked")) {
        $(this).parent().addClass('selected-bg');
    } else {
        $(this).parent().removeClass('selected-bg');
    }
    // Show the text
    let index = $("input").index($(this));
    console.debug("Selected: " + index);
    $(".mail-contents").each(function(i, value) {
        if (i == index) {
            // Show the element
            $(this).css("display", "block");
        } else {
            $(this).css("display", "none");
        }
    });
});

var d = new Date();
var n = d.toString();
$("#todays-date").html(n);

$("#create").click(function() {
  $(this).before("<textarea></textarea>");
});