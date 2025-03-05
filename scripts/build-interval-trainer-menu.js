// Create a main empty arrays and add the selected intervals, directins and notes to them
let selectedIntervalsArr = [];
let selectedDirectionsArr = [];
let selectedNotesArr = [];

// Create allIntervalsArr as a container to select desired intervals
const allIntervalsArr = [["ЧИСТУЮ ПРИМУ", "ЧИСТУЮ ОКТАВУ"], ["МАЛУЮ СЕКУНДУ", "БОЛЬШУЮ СЕКУНДУ"], ["МАЛУЮ ТЕРЦИЮ", "БОЛЬШУЮ ТЕРЦИЮ"], ["ЧИСТУЮ КВАРТУ", "ЧИСТУЮ КВИНТУ"], ["МАЛУЮ СЕКСТУ", "БОЛЬШУЮ СЕКСТУ"], ["МАЛУЮ СЕПТИМУ", "БОЛЬШУЮ СЕПТИМУ"], ["УВЕЛИЧЕННУЮ КВАРТУ", "УМЕНЬШЁННУЮ КВИНТУ"], ["УВЕЛИЧЕННУЮ СЕКУНДУ", "УМЕНЬШЁННУЮ СЕПТИМУ"], ["ЧИСТУЮ ПРИМУ", "МАЛУЮ СЕКУНДУ", "БОЛЬШУЮ СЕКУНДУ", "УВЕЛИЧЕННУЮ СЕКУНДУ", "МАЛУЮ ТЕРЦИЮ", "БОЛЬШУЮ ТЕРЦИЮ", "ЧИСТУЮ КВАРТУ", "УВЕЛИЧЕННУЮ КВАРТУ", "УМЕНЬШЁННУЮ КВИНТУ", "ЧИСТУЮ КВИНТУ", "МАЛУЮ СЕКСТУ", "БОЛЬШУЮ СЕКСТУ", "УМЕНЬШЁННУЮ СЕПТИМУ", "МАЛУЮ СЕПТИМУ", "БОЛЬШУЮ СЕПТИМУ", "ЧИСТУЮ ОКТАВУ"]];

// INTERVALS BUTTONS
const intervalsBtns = document.querySelector('#intervals-buttons');
let selectedIntervalsId;
let selectedIntervalsBtn;

// Event listener for handling button clicks to select or deselect intervals. Toggles the 'selected' class on the clicked button and updates the selectedIntervalsArr based on the intervals associated with the clicked button.
intervalsBtns.addEventListener('click', (event) => {
  if (event.target.tagName === "BUTTON") {
    
    // Get the id of the clicked button and the intervals associated with it
    selectedIntervalsId = event.target.id;
    selectedIntervalsBtn = event.target;
    selectedIntervalsBtn.classList.toggle('selected');
    const innerArr = allIntervalsArr[selectedIntervalsId];

    // If the button is selected, add the intervals to the selectedIntervalsArr
    if (selectedIntervalsBtn.classList.contains('selected')) {
      for (let i = 0; i < innerArr.length; i++) {
        let interval = innerArr[i];
        selectedIntervalsArr.push(interval);

        // If the selectedIntervalsArr has more than 16 intervals, clear the array and add the current interval
        if (selectedIntervalsArr.length > 16) {
          selectedIntervalsArr = [];
          selectedIntervalsArr.push(interval);
          allIntervalsBtn.classList.remove('selected');
        }
      }
    } else {
      // If the button is deselected, remove the intervals from the selectedIntervalsArr
      selectedIntervalsArr = selectedIntervalsArr.filter(interval => !innerArr.includes(interval));
    }
  }

  console.log('Selected intervals:', selectedIntervalsArr);
});

// ALL INTERVALS BUTTON
const allIntervalsBtn = document.querySelector('.all-intervals-btn');

// Event listener for handling the click on the .all-intervals-btn to clear all buttons and add intervals from the button with index 8 (i.e. all possible intervals) to the selectedIntervalsArr
allIntervalsBtn.addEventListener('click', () => {
  // Clear all selected buttons
  document.querySelectorAll('#intervals-buttons .selected').forEach(button => {
    button.classList.remove('selected');
  });

  // Clear the selectedIntervalsArr
  selectedIntervalsArr = [];

  // toggle selected class on the allIntervalsBtn
  allIntervalsBtn.classList.toggle('selected');

  if (allIntervalsBtn.classList.contains('selected')) {
    // Add intervals from the button with index 8 (i.e. all possible intervals) to the selectedIntervalsArr
    const allIntervals = allIntervalsArr[8];
    selectedIntervalsArr.push(...allIntervals);
  } else {
    // Clear the selectedIntervalsArr
    selectedIntervalsArr = [];
  }

  console.log('Selected intervals:', selectedIntervalsArr);
});

// DIRECTIONS BUTTONS
const upButton = document.querySelector('.up-btn');
const downButton = document.querySelector('.down-btn');
const upDownButton = document.querySelector('.up-down-btn');

// Event listeners for handling button clicks to select or deselect directions. Toggles the 'selected' class on the clicked button and updates the selectedDirectionsArr based on the directions associated with the clicked button.
upButton.addEventListener('click', () => {
  upButton.classList.toggle('selected');
  if (upButton.classList.contains('selected')) {
    downButton.classList.remove('selected');
    upDownButton.classList.remove('selected');
    selectedDirectionsArr = ['вверх'];
  } else {
    selectedDirectionsArr = [];
  }
  console.log('Selected directions:', selectedDirectionsArr);
});

downButton.addEventListener('click', () => {
  downButton.classList.toggle('selected');
  if (downButton.classList.contains('selected')) {
    upButton.classList.remove('selected');
    upDownButton.classList.remove('selected');
    selectedDirectionsArr = ['вниз'];
  } else {
    selectedDirectionsArr = [];
  }
  console.log('Selected directions:', selectedDirectionsArr);
});

upDownButton.addEventListener('click', () => {
  upDownButton.classList.toggle('selected');
  if (upDownButton.classList.contains('selected')) {
    upButton.classList.remove('selected');
    downButton.classList.remove('selected');
    selectedDirectionsArr = ['вверх', 'вниз'];
  } else {
    selectedDirectionsArr = [];
  }
  console.log('Selected directions:', selectedDirectionsArr);
});

// NOTES BUTTONS
const naturanNotesBtn = document.querySelector('.natural-notes-btn');
const sharpNotesBtn = document.querySelector('.sharp-notes-btn');
const flatNotesBtn = document.querySelector('.flat-notes-btn');
const sharpFlatNotesBtn = document.querySelector('.sharp-flat-notes-btn');
const allNotesBtn = document.querySelector('.all-notes-btn'); 

// Event listeners for handling button clicks to select or deselect notes. Toggles the 'selected' class on the clicked button and updates the selectedNotesArr based on the notes associated with the clicked button.

naturanNotesBtn.addEventListener('click', () => {
  naturanNotesBtn.classList.toggle('selected');
  if (naturanNotesBtn.classList.contains('selected')) {
    sharpNotesBtn.classList.remove('selected');
    flatNotesBtn.classList.remove('selected');
    sharpFlatNotesBtn.classList.remove('selected');
    allNotesBtn.classList.remove('selected');
    selectedNotesArr = ["ДО", "РЕ", "МИ", "ФА", "СОЛЬ", "ЛЯ", "СИ"];
  } else {
    selectedNotesArr = [];
  }
  console.log('Selected notes:', selectedNotesArr);
});

sharpNotesBtn.addEventListener('click', () => {
  sharpNotesBtn.classList.toggle('selected');
  if (sharpNotesBtn.classList.contains('selected')) {
    naturanNotesBtn.classList.remove('selected');
    flatNotesBtn.classList.remove('selected');
    sharpFlatNotesBtn.classList.remove('selected');
    allNotesBtn.classList.remove('selected');
    selectedNotesArr = ["ДО♯", "РЕ♯", "МИ♯", "ФА♯", "СОЛЬ♯", "ЛЯ♯", "СИ♯"];
  } else {
    selectedNotesArr = [];
  }
  console.log('Selected notes:', selectedNotesArr);
});

flatNotesBtn.addEventListener('click', () => {
  flatNotesBtn.classList.toggle('selected');
  if (flatNotesBtn.classList.contains('selected')) {
    naturanNotesBtn.classList.remove('selected');
    sharpNotesBtn.classList.remove('selected');
    sharpFlatNotesBtn.classList.remove('selected');
    allNotesBtn.classList.remove('selected');
    selectedNotesArr = ["ДО♭", "РЕ♭", "МИ♭", "ФА♭", "СОЛЬ♭", "ЛЯ♭", "СИ♭"];
  } else {
    selectedNotesArr = [];
  }
  console.log('Selected notes:', selectedNotesArr);
});

sharpFlatNotesBtn.addEventListener('click', () => {
  sharpFlatNotesBtn.classList.toggle('selected');
  if (sharpFlatNotesBtn.classList.contains('selected')) {
    naturanNotesBtn.classList.remove('selected');
    sharpNotesBtn.classList.remove('selected');
    flatNotesBtn.classList.remove('selected');
    allNotesBtn.classList.remove('selected');
    selectedNotesArr = ["ДО♭", "ДО♯", "РЕ♭", "РЕ♯", "МИ♭", "МИ♯", "ФА♭", "ФА♯", "СОЛЬ♭", "СОЛЬ♯", "ЛЯ♭", "ЛЯ♯", "СИ♭", "СИ♯"];
  } else {
    selectedNotesArr = [];
  }
  console.log('Selected notes:', selectedNotesArr);
});

allNotesBtn.addEventListener('click', () => {
  allNotesBtn.classList.toggle('selected');
  if (allNotesBtn.classList.contains('selected')) {
    naturanNotesBtn.classList.remove('selected');
    sharpNotesBtn.classList.remove('selected');
    flatNotesBtn.classList.remove('selected');
    sharpFlatNotesBtn.classList.remove('selected');
    selectedNotesArr = ["ДО♭", "ДО", "ДО♯", "РЕ♭", "РЕ", "РЕ♯", "МИ♭", "МИ", "ФА♭", "МИ♯", "ФА", "ФА♯", "СОЛЬ♭", "СОЛЬ", "СОЛЬ♯", "ЛЯ♭", "ЛЯ", "ЛЯ♯", "СИ♭", "СИ", "СИ♯"];
  } else {
    selectedNotesArr = [];
  }
  console.log('Selected notes:', selectedNotesArr);
});

// BLINKING BUTTONS 

// blink corresponding group of buttons if start button is clicked without selecting any intervals, directions or notes

function blinkIntervalsBtns() {
  const intervalsBtns = document.querySelectorAll('#intervals-buttons .btn');
  intervalsBtns.forEach(button => {
    button.classList.add('blinking');
    // Remove the class after the animation is complete
    button.addEventListener('animationend', () => {
      button.classList.remove('blinking');
    }, { once: true });
  });
}

function blinkDirectionBtns() {
  const directionBtns = document.querySelectorAll('#direction-buttons .btn');
  directionBtns.forEach(button => {
    button.classList.add('blinking');
    // Remove the class after the animation is complete
    button.addEventListener('animationend', () => {
      button.classList.remove('blinking');
    }, { once: true });
  });
}

function blinkNotesBtns() {
  const notesBtns = document.querySelectorAll('#notes-buttons .btn');
  notesBtns.forEach(button => {
    button.classList.add('blinking');
    // Remove the class after the animation is complete
    button.addEventListener('animationend', () => {
      button.classList.remove('blinking');
    }, { once: true });
  });
}

// START BUTTON
const startBtn = document.querySelector('.start-btn');

// Event listener for handling the click on the .start-btn to save the selected intervals to the local storage and redirect to the interval trainer page
startBtn.addEventListener('click', () => {
  saveIntervalsArr();
  saveDirectionsArr();
  saveNotesArr();

  if (selectedIntervalsArr.length === 0) {
    console.log("no intervals");
    blinkIntervalsBtns();
  } else if (selectedDirectionsArr.length === 0) {
    console.log("no directions");
    blinkDirectionBtns();
  } else if (selectedNotesArr.length === 0) {
    console.log("no notes");
    blinkNotesBtns();
  } else {
    window.location.href = 'build-interval-trainer.html';
  }
});

// FUNCTIONS TO SAVE THE SELECTED INTERVALS, DIRECTIONS AND NOTES TO THE LOCAL STORAGE
function saveIntervalsArr() {
  localStorage.setItem('selectedIntervals', JSON.stringify(selectedIntervalsArr));
};

function saveDirectionsArr() {
  localStorage.setItem('selectedDirections', JSON.stringify(selectedDirectionsArr));
};

function saveNotesArr() {
  localStorage.setItem('selectedNotes', JSON.stringify(selectedNotesArr));
};









