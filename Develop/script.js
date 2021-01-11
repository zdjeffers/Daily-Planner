// Set empty arrays
var toDoList = []
var times = []
var saveBtns = []

// Generate local time via Moment.js
var todaysDate = moment().format("h:mm:ss dddd, MMMM Do")
$("#currentDay").text(todaysDate)

var hourNow = moment().startOf('hour');

// add time slots and save buttons to arrays
for (var i = 9; i <= 17; i++) {
    // create vars for time moment, create block and savebutton id queries
    var block = $("#hour-" + i + " textarea")
    var saveBtn = $("#hour-" + i + " .saveBtn")
    var time = moment().startOf(todaysDate).add(i, 'hours')

    // create nn object for later ref
    var timeBlock = {
        time: time,
        block: block
    }
    times.push(timeBlock);
    saveBtns.push(saveBtn);
}

reload();

// Add event listener to save buttons
saveBtns.forEach(function (button, index) {
    var value = button
        .parent()
        .attr("id")
        .replace("hour-", "");
    button.click(function () {
        text = $("#hour-" + value + " textarea").val().trim()
        toDoList[value - 9] = text;
        localStorage.setItem("toDoList", JSON.stringify(toDoList))
    })
})

//Function to change colors

var currentHour = moment().hour();

$(".time-frame").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    if (timeBlockHour < currentHour) {
        $(this).children('textarea').addClass("past")

    } else if (timeBlockHour === currentHour) {
        $(this).removeClass("past")
        $(this).children('textarea').addClass("present")

    } else if (timeBlockHour > currentHour) {
        $(this).removeClass("present")
        $(this).children('textarea').addClass("future")
    }
}, 600000);

// load/set up local storage data
function reload() {
    var localData = localStorage.getItem("toDoList")
    if (!localData) {
        for (var i = 0; i < times; i++) {
            toDoList.push("");
        } return false;
    }
    toDoList = JSON.parse(localData)

    times.forEach(function (block, index) {
        block.block.val(toDoList[index])
    })
}