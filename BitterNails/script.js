$('.mail-choice').change(function() {
    var selectedElement = $(this);
    if ($(this).is(":checked")) {
        $(this).parent().addClass('selected-bg');
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
    $(this).before("<textarea class='cursive'>Define Success for Yourself</textarea>");
});

var addedTask = 0;

$(".add-task .add-button").click(function() {
    addedTask += 1;
    $(".inbox").append('<div class="msg selected-bg anim-y">' +
        '<input type="checkbox" name="msg" id="mailAdded' + addedTask + '" class="mail-choice" checked>' +
        '<label for="mailAdded' + addedTask + '"></label>' +
        '<div class="msg-content">' +
        '<div class="msg-title">Test task</div>' +
        '<div class="msg-date">' + n + '</div>' +
        '</div>' +
        '</div>');

    let scr = $('.inbox')[0].scrollHeight;
    $('.inbox').animate({scrollTop: scr}, 500);
});