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

      //   var textTime = startingHour + Meridiem;
      var rowDiv = $("<div>").attr("id", `${plannerHour}`);
      currentID = rowDiv.attr("id");

      if (Number(currentID) < Number(currentHour)) {
        rowDiv.attr("class", "row time-block past");
      } else if (Number(currentID) === Number(currentHour)) {
        rowDiv.attr("class", "row time-block present");
      } else {
        rowDiv.attr("class", "row time-block future");
      }

      var timeDiv = $("<div>").attr(
        "class",
        "col-2 col-md-1 hour text-center py-3"
      );

      //   if (Number(plannerHours[i]) > "12") {
      //     console.log(Number(plannerHour[i]));
      //   }
      timeDiv.text(`${plannerHour} ${plannerMeridiem[i]}`);

      var textArea = $("<textarea>").attr(
        "class",
        "col-8 col-md-10 description"
      );

      var buttonArea = $("<button>").attr(
        "class",
        "btn saveBtn col-2 col-md-1"
      );

      buttonArea.attr("aria-label", "save");

      var iArea = $("<i>").attr("class", "fas fa-save");

      iArea.attr("aria-hidden", "true");

      textArea.attr("rows", 3);

      containerP.append(rowDiv);

      rowDiv.append(timeDiv, textArea, buttonArea);

      buttonArea.append(iArea);

      //   console.log(Number(currentID) === Number(currentHour));
      //   console.log(rowDiv);
    }
  }
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
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

  // test commit

  $(".btn").click(function (event) {
    event.preventDefault();
    var parentID = this.parentNode.id;
    console.log(parentID);

    var $parentID = $(`#${parentID}`);
    var textArea = $parentID.children("textarea");

    function renderLastTask() {
      savedInput = localStorage.getItem(textArea);
      console.log(savedInput);

      if (!savedInput) {
        return;
      }

      textArea.val(savedInput);
      console.log(savedInput);
    }

    var textInput = textArea.val();

    // console.log(textInput);

    localStorage.setItem(textArea, textInput);

    renderLastTask();

    // console.log(localStorage.getItem(textArea));
  });
});
