// DIRECTIONS BUTTONS
const directionsBtns = document.querySelector('#direction-buttons');
let selectedDirectionId;
let selectedDirectionBtn;

// Event listener for handling button clicks to select or deselect directions. Toggles the 'selected' class on the clicked button and updates the selectedIntervalsArr based on the directions associated with the clicked button.
directionsBtns.addEventListener('click', (event) => {
  
  if (event.target.tagName === "BUTTON") {

    // Get the id of the clicked button and the direction associated with it
    selectedDirectionId = event.target.id;
    selectedDirectionBtn = event.target;
    selectedDirectionBtn.classList.toggle('selected');

    // If the button is selected, add the direction to the selectedDirectionsArr
    if (selectedDirectionBtn.classList.contains('selected')) {
      selectedDirectionsArr.push(selectedDirectionBtn.textContent);
    } else {
      // If the button is deselected, remove the direction from the selectedDirectionsArr
      selectedDirectionsArr = selectedDirectionsArr.filter(direction => direction !== selectedDirectionBtn.textContent);
    }
  }

  console.log('Selected directions:', selectedDirectionsArr);
});