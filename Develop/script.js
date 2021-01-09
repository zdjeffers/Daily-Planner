//Retrieve the current date
let todaysDate = $("#currentDay").text(moment().format('dddd, MMMM Do YYYY'));
console.log($("#currentDay"));

//Create Empty Arrays
let toDoList = [];
let times = [];
let saveBtns = [];

for (let i = 9; i < 17; i++) {
    var time = moment().startOf(todaysDate).add(i, "hours");
    var saveBtn = $("#hour" + i + ".saveBtn");
    console.log(time);
}

//Create object
var timeBlock = {
    time: time,
    block: block,
}
times.push(timeBlock);
saveBtns.push(saveBtn);

reload();

//Add event listeners to save buttons
$(document).on("click", ".save", function(button, index) {
    var value = button;
        // .parent()
        // .attr("id")
        // .replace("time-", "");
        button.click(function() {
            text = $("#time-" + value + " textarea").val().trim();
            toDoList[value - 9] = text
            localStorage.setItem("toDoList", JSON.stringify(toDoList))
        })
})

//function for changing the colors based on the time