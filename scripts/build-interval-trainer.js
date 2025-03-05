console.log("// STARTING POINT\n\n");

// INTERVALS
const intervalsArr = ["ЧИСТУЮ ПРИМУ", "МАЛУЮ СЕКУНДУ", "БОЛЬШУЮ СЕКУНДУ", "УВЕЛИЧЕННУЮ СЕКУНДУ", "МАЛУЮ ТЕРЦИЮ", "БОЛЬШУЮ ТЕРЦИЮ", "ЧИСТУЮ КВАРТУ", "УВЕЛИЧЕННУЮ КВАРТУ", "УМЕНЬШЁННУЮ КВИНТУ", "ЧИСТУЮ КВИНТУ", "МАЛУЮ СЕКСТУ", "БОЛЬШУЮ СЕКСТУ", "УМЕНЬШЁННУЮ СЕПТИМУ", "МАЛУЮ СЕПТИМУ", "БОЛЬШУЮ СЕПТИМУ", "ЧИСТУЮ ОКТАВУ"];

// get selected notes from local storage
const storedIntervals = localStorage.getItem("selectedIntervals");
const selectedIntervalsArr = storedIntervals ? JSON.parse(storedIntervals) : [];

const randomIntervalIndex = Math.floor(Math.random() * selectedIntervalsArr.length);
// random interval
const randomInterval = selectedIntervalsArr[randomIntervalIndex];
console.log("random interval:", randomInterval);
// determine the indexes of the selected intervals in the intervalsArr
const selectedIndexes = selectedIntervalsArr.map(interval => intervalsArr.indexOf(interval));

// SHORT INTERVALS
const intervalsArrShort = ["ч1", "м2", "б2", "ув2", "м3", "б3", "ч4", "ув4", "ум5", "ч5", "м6", "б6", "ум7", "м7", "б7", "ч8"];
// find selected short intervals
const selectedShortIntervals = selectedIndexes.map(index => intervalsArrShort[index]);
// random short interval
const randomShortInterval = selectedShortIntervals[randomIntervalIndex];
console.log("random short interval:", randomShortInterval);

// DIRECTIONS
const directionsArr = ["вверх", "вниз"];

// get selected directions from local storage
const storedDirections = localStorage.getItem("selectedDirections");
const selectedDirectionsArr = storedDirections ? JSON.parse(storedDirections) : [];

const randomDirectionIndex = Math.floor(Math.random() * selectedDirectionsArr.length);
// random direction
const randomDirection = selectedDirectionsArr[randomDirectionIndex];
console.log("random direction:", randomDirection);
// root is defined if the direction is "вверх" (rootIsDefined) and top is defined if the direction is "вниз" (!rootIsDefined)
const rootIsDefined = randomDirection === "вверх" ? true : false;

// NOTES
const notesArr = ["ДО♭", "ДО", "ДО♯", "РЕ♭", "РЕ", "РЕ♯", "МИ♭", "МИ", "ФА♭", "МИ♯", "ФА", "ФА♯", "СОЛЬ♭", "СОЛЬ", "СОЛЬ♯", "ЛЯ♭", "ЛЯ", "ЛЯ♯", "СИ♭", "СИ", "СИ♯"];

// get selected notes from local storage
const storedNotes = localStorage.getItem("selectedNotes");
const selectedNotesArr = storedNotes ? JSON.parse(storedNotes) : [];

const randomNoteIndex = Math.floor(Math.random() * selectedNotesArr.length);
// random note
const randomNote = selectedNotesArr[randomNoteIndex];
console.log("random note:", randomNote);

// GENERATE HTML
const container = document.getElementById("container");
const htmlTemplate = `
  <!-- TASK SECTION -->
  <div id="task">
    <div id="build">Постройте</div>
    <div id="random-interval">${randomInterval}</div>
    
    <div id="random-direction-and-note"><span id="random-direction">${randomDirection}</span> от ноты <span id="random-note">${randomNote}</span></div>
  </div>

  <!-- DISPLAY SECTION --> 
  <div id="root-interval-top">
    <div id="root">${rootIsDefined ? randomNote : "?"}</div>
    <div id="interval">${randomShortInterval}</div>
    <div id="top">${!rootIsDefined ? randomNote : "?"}</div>
  </div>
`;
container.innerHTML = htmlTemplate;

// RELOAD PAGE IF THE GENERATED TASK IS TOO DIFFICULT
if (rootIsDefined && randomNote === "ДО♭" && randomInterval === "УМЕНЬШЁННУЮ СЕПТИМУ") {
  window.location.reload();
} else if (rootIsDefined && randomNote === "ФА♭" && randomInterval === "УМЕНЬШЁННУЮ СЕПТИМУ") {
  window.location.reload();
} else if (!rootIsDefined && randomNote === "МИ♯" && randomInterval === "УМЕНЬШЁННУЮ СЕПТИМУ") {
  window.location.reload();
} else if (!rootIsDefined && randomNote === "СИ♯" && randomInterval === "УМЕНЬШЁННУЮ СЕПТИМУ") {
  window.location.reload();
} else if (!rootIsDefined && randomNote === "ДО♭" && randomInterval === "УВЕЛИЧЕННУЮ СЕКУНДУ") {
  window.location.reload();
} else if (!rootIsDefined && randomNote === "ФА♭" && randomInterval === "УВЕЛИЧЕННУЮ СЕКУНДУ") {
  window.location.reload();
} else if (rootIsDefined && randomNote === "МИ♯" && randomInterval === "УВЕЛИЧЕННУЮ СЕКУНДУ") {
  window.location.reload();
} else if (rootIsDefined && randomNote === "СИ♯" && randomInterval === "УВЕЛИЧЕННУЮ СЕКУНДУ") {
  window.location.reload();
}

// BLINKING BUTTONS  

// blink note buttons if accidental is selected before the note
function blinkNotes() {
  const noteButtons = document.querySelectorAll('.note-btn');
  noteButtons.forEach(button => {
      button.classList.add('blinking');
      // Remove the class after the animation is complete
      button.addEventListener('animationend', () => {
        button.classList.remove('blinking');
      }, { once: true });
  });
}

// blink note and accidental buttons if check answer button is clicked before the note is selected
function blinkNotesAndAccidentals() {
  const noteButtons = document.querySelectorAll('.note-accidental-btn');
  noteButtons.forEach(button => {
      button.classList.add('blinking');
      // Remove the class after the animation is complete
      button.addEventListener('animationend', () => {
          button.classList.remove('blinking');
      }, { once: true });
  });
}

// SELECT NOTE AND ACCIDENTAL
console.log("\n// CALCULATE RIGHT ANSWER\n\n");

// determine the workspace
const rootNote = document.querySelector('#root');
const topNote = document.querySelector('#top');
let workSpace = rootIsDefined ? topNote : rootNote;
console.log("workspace:", workSpace === rootNote ? "root" : "top");

// SELECT NOTE
const naturalNotesArr = ["ДО", "РЕ", "МИ", "ФА", "СОЛЬ", "ЛЯ", "СИ"];

// to find the index of the selected note in the naturalNotesArr
let selectedNote = "";
let selectedNoteIndex = "";

const selectNoteDiv = document.getElementById('select-note');
const selectNoteSound = new Audio("sounds/select-note-sound.mp3");
selectNoteDiv.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    selectedNote = event.target.innerHTML;
    selectedNoteIndex = naturalNotesArr.indexOf(selectedNote);
    selectNoteSound.play();
  }
  workSpace.innerHTML = selectedNote;
  console.log("\n// SELECT NOTE AND ACCIDENTAL\n\n");
  console.log("selected note:", selectedNote);
});

// SELECT ACCIDENTAL
const accidentalsArr = ["♭", "𝄫", "♯", "𝄪"];

const alteredNotesArr = [["ДО♭", "ДО𝄫", "ДО♯", "ДО𝄪"], ["РЕ♭", "РЕ𝄫", "РЕ♯", "РЕ𝄪"], ["МИ♭", "МИ𝄫", "МИ♯", "МИ𝄪"], ["ФА♭", "ФА𝄫", "ФА♯", "ФА𝄪"], ["СОЛЬ♭", "СОЛЬ𝄫", "СОЛЬ♯", "СОЛЬ𝄪"], ["ЛЯ♭", "ЛЯ𝄫", "ЛЯ♯", "ЛЯ𝄪"], ["СИ♭", "СИ𝄫", "СИ♯", "СИ𝄪"]];

// to find the index of the selected accidental in the accidentalsArr
let selectedAccidental = "";
let selectedAccidentalIndex = "";

const selectAccidentalDiv = document.getElementById('select-accidental');
selectAccidentalDiv.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    selectedAccidental = event.target.innerHTML;
    selectedAccidentalIndex = accidentalsArr.indexOf(selectedAccidental);
    if (workSpace.innerHTML === "?") {
      blinkNotes();
      selectedNote = "?";
    } else {
      selectedNote = alteredNotesArr[selectedNoteIndex][selectedAccidentalIndex];
      selectNoteSound.play();
    }
  }
  workSpace.innerHTML = selectedNote;
  console.log("selected note with accidental:", selectedNote);
});

// DETERMINE THE CORRECT NOTE

// determine the number of steps extracting the number from the given short name of the interval
const splittedInterval = randomShortInterval.split("");
const numberOfSteps = Number(splittedInterval[splittedInterval.length - 1]);

// determine the second note name extracting only the note name from the given note, removing the accidental sign
// const splittedNote = randomNote.split("");
const cleanedNote = randomNote.replace(/[♯♭𝄪𝄫]/g, "");
console.log("cleaned note (without accidental):", cleanedNote);

let secondNoteName = "";

// determine the top note if the root note is given
function rootToTop(cleanedNote, count) {
  // Let's find the index of the starting note
  const rootStepIndex = naturalNotesArr.indexOf(cleanedNote);

  if (rootStepIndex === -1) {
    console.error("The specified starting note was not found.");
    return;
  }

  // Determine the index of the top note considering cyclicity
  const lastIndex = (rootStepIndex + count - 1) % naturalNotesArr.length;
  const topStep = naturalNotesArr[lastIndex];
  console.log("root step:", cleanedNote);
  console.log("top step:", topStep);

  secondNoteName = topStep;
}

// determine the root note if the top note is given
function topToRoot(cleanedNote, count) {
  // Let's find the index of the starting note
  const topStepIndex = naturalNotesArr.indexOf(cleanedNote);

  if (topStepIndex === -1) {
    console.error("The specified starting note was not found.");
    return;
  }

  // Determine the index of the root note considering cyclicity.
  const rootNoteIndex = (topStepIndex - (count - 1) + naturalNotesArr.length) % naturalNotesArr.length;
  const rootStep = naturalNotesArr[rootNoteIndex];
  
  console.log("top step:", cleanedNote);
  console.log("root step:", rootStep);

  secondNoteName = rootStep;
}

// use the correct function depending on the direction
rootIsDefined ? rootToTop(cleanedNote, numberOfSteps) : topToRoot(cleanedNote, numberOfSteps); 

console.log("second note name:", secondNoteName);

// DETERMINE NUMBER OF SEMITONES

// Define the number of semitones for each interval
const semitonesObj = {
  "ч1": 0,
  "м2": 1,
  "б2": 2,
  "ув2": 3,
  "м3": 3,
  "б3": 4,
  "ч4": 5,
  "ув4": 6,
  "ум5": 6,
  "ч5": 7,
  "м6": 8,
  "б6": 9,
  "ум7": 9,
  "м7": 10,
  "б7": 11,
  "ч8": 12
}

// Determine the current number of semitones
const currentNumberOfSemitones = semitonesObj[randomShortInterval];
console.log("current number of semitones: ", currentNumberOfSemitones);

// Determine the key number (which of the 12) 
const twelveKeysObj = {
  "СИ♯": 1,
  "ДО": 1,
  "РЕ𝄫": 1,
  "СИ𝄪": 2,
  "ДО♯": 2,
  "РЕ♭": 2,
  "ДО𝄪": 3,
  "РЕ": 3,
  "МИ𝄫": 3,
  "РЕ♯": 4,
  "МИ♭": 4,
  "ФА𝄫": 4,
  "РЕ𝄪": 5,
  "МИ": 5,
  "ФА♭": 5,
  "МИ♯": 6,
  "ФА": 6,
  "СОЛЬ𝄫": 6,
  "МИ𝄪": 7,
  "ФА♯": 7,
  "СОЛЬ♭": 7,
  "ФА𝄪": 8,
  "СОЛЬ": 8,
  "ЛЯ𝄫": 8,
  "СОЛЬ♯": 9,
  "ЛЯ♭": 9,
  "СОЛЬ𝄪": 10,
  "ЛЯ": 10,
  "СИ𝄫": 10,
  "ЛЯ♯": 11,
  "СИ♭": 11,
  "ДО𝄫": 11,
  "ЛЯ𝄪": 12,
  "СИ": 12,
  "ДО♭": 12
}

// FIND FIRST KEY NUMBER (randomNote)
const firstKey = twelveKeysObj[randomNote];
console.log("first key number: ", firstKey);

// FIND SECOND KEY NUMBER  
let secondKey = 0;

// Calculate second key number (if direction is "вверх") adding currentNumberOfSemitones to firstKey
function findTopKey(firstKey, currentNumberOfSemitones) {
  let topKey = firstKey + currentNumberOfSemitones;
  if (topKey > 12) {
    topKey -= 12;
  }
  console.log("second key number: ", topKey);
  secondKey = topKey;
}

// Calculate second key number (if direction is "вниз") substracting currentNumberOfSemitones from firstKey
function findBottomKey(firstKey, currentNumberOfSemitones) {
  let bottomKey = firstKey - currentNumberOfSemitones;
  if (bottomKey < 1) {
    bottomKey += 12;
  }
  console.log("second key number: ", bottomKey);
  secondKey = bottomKey;
}

// use the correct function depending on the direction to find second key
rootIsDefined ? findTopKey(firstKey, currentNumberOfSemitones) : findBottomKey(firstKey, currentNumberOfSemitones);

// FIND EXACT NOTE IN twelveKeysArr  
const twelveKeysArr = [
  ["СИ♯", "ДО", "РЕ𝄫"],
  ["СИ𝄪", "ДО♯", "РЕ♭"],
  ["ДО𝄪", "РЕ", "МИ𝄫"],
  ["РЕ♯", "МИ♭", "ФА𝄫"],
  ["РЕ𝄪", "МИ", "ФА♭"],
  ["МИ♯", "ФА", "СОЛЬ𝄫"],
  ["МИ𝄪", "ФА♯", "СОЛЬ♭"],
  ["ФА𝄪", "СОЛЬ", "ЛЯ𝄫"],
  ["СОЛЬ♯", "ЛЯ♭"],
  ["СОЛЬ𝄪", "ЛЯ", "СИ𝄫"],
  ["ЛЯ♯", "СИ♭", "ДО𝄫"],
  ["ЛЯ𝄪", "СИ", "ДО♭"]
];

let finalSearchArr = twelveKeysArr[secondKey - 1];
console.log("final search array:", finalSearchArr);

// find secondNoteName in this finalSearchArr
let finalNote = "";

// take first 2 letters of the note to compare with notes in finalSearchArr
const firstTwoLettersInSecondNoteName = secondNoteName.split("", 2).join("");
console.log("first 2 letters in second note name:", firstTwoLettersInSecondNoteName);

for (let i = 0; i < finalSearchArr.length; i++) {
  const firstTwoLetters = finalSearchArr[i].split("", 2).join("");

  if (firstTwoLetters === firstTwoLettersInSecondNoteName) {
    finalNote = finalSearchArr[i];
  }
}
console.log("FINAL NOTE:", finalNote);

// CHECK ANSWER BUTTON
const checkAnswerButton = document.querySelector("#check-answer-btn");
const result = document.querySelector("#result");
const checkAnswerSound = new Audio("sounds/check-answer-sound.mp3");
checkAnswerButton.addEventListener("click", () => {
  if (workSpace.innerHTML === "?") {
    blinkNotesAndAccidentals();
    selectedNote = "?";
  } else if (selectedNote === finalNote) {
    result.innerHTML = "ПРАВИЛЬНО!";
    console.log("\n// CHECK ANSWER\n\n");
    console.log("Selected note:", selectedNote);
    console.log("Final note:", finalNote);
    console.log("Result: Correct!");
    checkAnswerSound.play(); 
  } else if (selectedNote !== finalNote) {
    result.innerHTML = "НЕПРАВИЛЬНО";
    console.log("\n// CHECK ANSWER\n\n");
    console.log("Selected note:", selectedNote);
    console.log("Final note:", finalNote);
    console.log("Result: Incorrect!");
    checkAnswerSound.play();
  }
});

// NEXT TASK BUTTON
const nextTaskButton = document.querySelector("#next-task-btn");
nextTaskButton.addEventListener("click", () => {
  if (workSpace.innerHTML === "?" || result.innerHTML === "") {
    blinkNotesAndAccidentals();
  } else {
    window.location.reload();
  }
});