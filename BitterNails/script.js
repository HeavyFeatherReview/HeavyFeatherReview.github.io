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

$("#dolphinContainer").hover(function() {
    $(".dolphins").addClass("dolphin-jump");
}, function() {
    $(".dolphins").removeClass("dolphin-jump");
});

// Katherine's thoughts

$(document).ready(function() {
    /* Every time the window is scrolled ... */
    $(document).scroll(function() {
        console.debug("Scroll");
        /* Check the location of each desired element */
        $('.thought').each(function(i) {

            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it it */
            if (bottom_of_window > bottom_of_object) {
                console.debug("Make it appear!");
                $(this).animate({ 'opacity': '1' }, 1500);

            }

        });

    });
});
$("#create").click(function() {
    $(this).before("<textarea class='cursive'>Define Success for Yourself</textarea>");
});

var profileRevealed = false;

function revealProfile() {
    if (profileRevealed) {
        console.debug("Hide profile");
        $(".user-profile-area").css("display", "none");
         $(".inbox-container").css("width", "40%");
    } else {
        console.debug("Reveal profile");
        $(".user-profile-area").css("display", "flex");
        $(".inbox-container").css("width", "100%");
    }
    profileRevealed = !profileRevealed;
    let updatedButtonText = profileRevealed ? "Hide Profile" : "Profile";
    $("#reveal-profile-button").text(updatedButtonText);
}