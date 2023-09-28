// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // Add a listener for click events on the save button
    $(".saveBtn").on("click", function () {
        // Get the id of the parent time-block
        var timeBlockId = $(this).closest(".time-block").attr("id");
        
        // Get the user input from the textarea within this time-block
        var userDescription = $(this).siblings("textarea").val();
        
        // Save the user input in local storage using the timeBlockId as a key
        localStorage.setItem(timeBlockId, userDescription);
    });

    // Add code to apply past, present, or future class to each time block
    var currentHour = dayjs().hour();
    
    $(".time-block").each(function () {
        // Get the hour from the time-block's id (e.g., "hour-9")
        var blockHour = parseInt($(this).attr("id").split("-")[1]);
        
        // Compare the block's hour to the current hour and apply classes accordingly
        if (blockHour < currentHour) {
            $(this).addClass("past");
        } else if (blockHour === currentHour) {
            $(this).addClass("present");
        } else {
            $(this).addClass("future");
        }
    });

    // Add code to get user input saved in localStorage and set textarea values
    $(".time-block").each(function () {
        var timeBlockId = $(this).attr("id");
        var savedDescription = localStorage.getItem(timeBlockId);

        // Set the textarea value to the saved description, if it exists
        if (savedDescription !== null) {
            $(this).find("textarea").val(savedDescription);
        }
    });

    // Add code to display the current date in the header of the page
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);

    // Add code to get user input saved in localStorage and set textarea values
    $(".time-block").each(function () {
        var timeBlockId = $(this).attr("id");
        var savedDescription = localStorage.getItem(timeBlockId);

        // Set the textarea value to the saved description, if it exists
        if (savedDescription !== null) {
            $(this).find("textarea").val(savedDescription);
        }
    });

    // Add code to display the current date in the header of the page
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);

    // Add the live timer code here
    function updateLiveTime() {
        var currentTime = dayjs().format("h:mm:ss A");
        $("#liveTimer").text("Current Time: " + currentTime);
    }

    updateLiveTime();
    setInterval(updateLiveTime, 1000);
});

$(function () {
    var currentHour = dayjs().hour(); // Get current hour using Day.js

    // Loop through each time block
    $(".time-block").each(function () {
        var blockHour = parseInt($(this).attr("id").split("-")[1]);

        if (blockHour < currentHour) {
            $(this).removeClass("present future").addClass("past");
        } else if (blockHour === currentHour) {
            $(this).removeClass("past future").addClass("present");
        } else {
            $(this).removeClass("past present").addClass("future");
        }
    });
});
