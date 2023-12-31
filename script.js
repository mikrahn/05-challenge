// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function () {
  var startingHour = 9;
  var Meridiem = "AM";
  var plannerHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  var plannerMeridiem = ["am", "am", "am", "pm", "pm", "pm", "pm", "pm", "pm"];
  var containerP = $(".container-fluid");

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  function createHourBlock(numHours) {
    var currentHour = dayjs().$H;

    for (var i = 0; i < plannerHours.length; i++) {
      var plannerHour = plannerHours[i];

      // create each row for each hour using template string literal as id value

      var rowDiv = $("<div>").attr("id", `${plannerHour}`);
      currentID = rowDiv.attr("id");

      // logic to assign past, present, future class to each row

      if (Number(currentID) < Number(currentHour)) {
        rowDiv.attr("class", "row time-block past");
      } else if (Number(currentID) === Number(currentHour)) {
        rowDiv.attr("class", "row time-block present");
      } else {
        rowDiv.attr("class", "row time-block future");
      }

      // create dive to hold time and assign time
      var timeDiv = $("<div>").attr(
        "class",
        "col-2 col-md-1 hour text-center py-3"
      );

      timeDiv.text(`${plannerHour} ${plannerMeridiem[i]}`);

      // create text area
      var textArea = $("<textarea>").attr(
        "class",
        "col-8 col-md-10 description"
      );

      // create button area with attributes

      var buttonArea = $("<button>").attr(
        "class",
        "btn saveBtn col-2 col-md-1"
      );

      buttonArea.attr("aria-label", "save");

      var iArea = $("<i>").attr("class", "fas fa-save");

      iArea.attr("aria-hidden", "true");

      textArea.attr("rows", 3);

      // append html objects to create structure dynamically

      containerP.append(rowDiv);

      rowDiv.append(timeDiv, textArea, buttonArea);

      buttonArea.append(iArea);
    }
  }
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  function renderLastTask($parentID, textArea) {
    savedInput = localStorage.getItem(textArea);

    if (!savedInput) {
      return;
    }

    textArea.val(savedInput);
    console.log(savedInput);
  }
  //
  // TODO: Add code to display the current date in the header of the page.

  var headerLead = dayjs().format("MMMM D, YYYY h:mm A");

  $("#currentDay").text(`Current Date / Time: ${headerLead}`);

  createHourBlock(plannerHours.length);

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $(".btn").click(function (event) {
    event.preventDefault();
    var parentID = this.parentNode.id;
    console.log(parentID);

    var $parentID = $(`#${parentID}`);

    var textArea = $parentID.children("textarea");

    var textInput = textArea.val();

    localStorage.setItem(textArea, textInput);

    renderLastTask($parentID, textArea);
  });
});
