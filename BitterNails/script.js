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
    updateTaskCounts();
});

$(".msg").click(function() {
    let mailChoice = $(this).children(".mail-choice");
    mailChoice.attr("checked", "checked");
    mailChoice.trigger("change");
});

$(".ham").click(function() {
    console.debug("Clicked ham");
    console.debug($(".inbox-container").css("display"));
    if ($(".inbox-container").css("display") == "none") {
        console.debug("Show inbox container");
        $(".inbox-container").css("display", "flex");
    } else {
        $(".inbox-container").css("display", "");
    }
})

function updateTaskCounts() {
    let numberOfChecked = $('.inbox .mail-choice:checkbox:checked').length;
    let totalCheckboxes = $('.inbox .mail-choice:checkbox').length;
    $("#completed-count").html(numberOfChecked)
    $("#todo-count").html(totalCheckboxes - numberOfChecked);
    $(".progress-bar").css("width", ((numberOfChecked / totalCheckboxes) * 100) + "%");
    $(".progress-status").html(numberOfChecked + "/" + totalCheckboxes);
}


var d = new Date();
var n = d.toString();
$("#todays-date").html(n);

// $(".mail-time").append(n);

// $(".msg-date").append(n);

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
        '<div class="msg-date">' + Date().toString() + '</div>' +
        '</div>' +
        '</div>');

    let scr = $('.inbox')[0].scrollHeight;
    $('.inbox').animate({ scrollTop: scr }, 500);
    updateTaskCounts()
});


// Scrapbook
$('#flipbook').turn({
    width: $(".mail-inside").width(),
    height: $(".mail-inside").height(),
    gradients: true,
    acceleration: true,
    autoCenter: true
});

$("#flipPage").click(function() {
    $("#flipbook").turn("next");
});