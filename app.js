import { specialCharacters } from "./specialCharacters.js";
import { alphabetLowercase } from "./specialCharacters.js";
import { alphabetUppercase } from "./specialCharacters.js";
import { numbersArray } from "./specialCharacters.js";

const input = document.querySelector(".input");
const submitBtn = document.querySelector(".submit-btn");
const notificationMessage = document.querySelector(".error-message");
const strengthStatusBar1 = document.querySelector(".strength-status-bar-1");
const strengthStatusBar2 = document.querySelector(".strength-status-bar-2");
const strengthStatusBar3 = document.querySelector(".strength-status-bar-3");
const strengthStatus = document.querySelector(".strength-status");
const copyBtn = document.querySelector(".copy-to-clipboard-btn");

// ======================================== PASSWORD STRENGTH TESTER MAIN EVENT
function validation() {
  const password = input.value.trim();

  characterLength(password);
  containsCapitalLetter(password);
  containsSpecialCharacters(password);
  containsNumbers(password);
  strongPassword(password);
  goodPassword(password);
  weakPassword(password);
  noPassword(password);
}

submitBtn.addEventListener("click", validation);

// ======================================== CONDITION STATEMENT FUNCTIONS

function noPassword(password) {
  if (password.trim().length === 0) {
    notificationMessage.textContent = "Please enter a password.";
    console.log("password is empty");
    return true;
  } else {
    return;
  }
}

// character length is correct
function characterLength(password) {
  if (password.length > 7) {
    console.log("password is long enough");
    const charCheck = document.querySelector(".characters");
    charCheck.innerHTML = `<i class="fa-solid fa-check"></i><p>Password is at least 8 characters long</p>`;
    return true;
  } else {
    // notificationMessage.textContent =
    //   "Password should be at least 8 characters long.";
    console.log("password is too short");
    return false;
  }
}

// contains special character
function containsSpecialCharacters(password) {
  if (specialCharacters.some((char) => password.includes(char))) {
    console.log("contains special charac");
    const specCheck = document.querySelector(".special");
    specCheck.innerHTML = `<i class="fa-solid fa-check"></i><p>Password contains a special character</p>`;
    return true;
  } else if (
    password.length > 7 &&
    specialCharacters.some((char) => !password.includes(char))
  ) {
    console.log("NO speci char");
    // notificationMessage.textContent =
    //   "Password must include special characters like '@' or '$'.";
    return false;
  }
}

// contains capital letters
function containsCapitalLetter(password) {
  // googled method params
  const capitalLetterCheck = password.match(/[A-Z]/g, "");
  if (capitalLetterCheck) {
    console.log("capital letter is used!");
    const capCheck = document.querySelector(".capital");
    capCheck.innerHTML = `<i class="fa-solid fa-check"></i><p>Password contains a capital letter</p>`;
    return true;
  } else if (password.length > 7 && !capitalLetterCheck) {
    // notificationMessage.textContent =
    //   "Password should contain at least one capital letter.";
    console.log("password doesnt have a capital letter");
    return false;
  }
}

// contains numbers
function containsNumbers(password) {
  // googled method params
  const numberCheck = password.match(/[1-9]/g, "");
  if (numberCheck) {
    console.log("includes numbers");
    const numCheck = document.querySelector(".numbers");
    numCheck.innerHTML = `<i class="fa-solid fa-check"></i><p>Password contains a number</p>`;
    return true;
  } else if (password.length > 7 && !numberCheck) {
    // notificationMessage.textContent =
    //   "Password should contain at least one number";
    return false;
  }
}

// ======================================== COLOUR STRENGTH STATUS CONTIONAL STATMENT FUNCTIONS

// strong password
function strongPassword(password) {
  if (
    characterLength(password) &&
    containsSpecialCharacters(password) &&
    containsCapitalLetter(password) &&
    containsNumbers(password)
  ) {
    console.log("strong");
    strengthStatus.textContent = "Password is strong!";
    notificationMessage.textContent = "Password is ready to be copied!";
    strengthStatusBar1.classList.remove("red");
    strengthStatusBar1.classList.remove("orange");
    strengthStatusBar2.classList.remove("orange");
    strengthStatusBar1.classList.add("green");
    strengthStatusBar2.classList.add("green");
    strengthStatusBar3.classList.add("green");
    // show copy to clipboard button
    copyBtn.classList.add("show");

    return true;
  } else {
    console.log("NOT strong");
    return false;
  }
}

// good password
function goodPassword(password) {
  // if (
  //   // length no correct but have all other characters
  //   !characterLength(password) &&
  //   containsSpecialCharacters(password) &&
  //   containsCapitalLetter(password) &&
  //   containsNumbers(password)
  // ) {
  //   console.log("good1");
  //   strengthStatus.textContent = "Password is good";
  //   strengthStatusBar1.classList.remove("red");
  //   strengthStatusBar1.classList.add("orange");
  //   strengthStatusBar2.classList.add("orange");
  //   strengthStatusBar1.classList.remove("green");
  //   strengthStatusBar2.classList.remove("green");
  //   strengthStatusBar3.classList.remove("green");
  //   return true;
  // }
  // else if (
  //   !characterLength(password) &&
  //   ((containsSpecialCharacters(password) && containsCapitalLetter(password)) ||
  //     containsNumbers(password))
  // ) {
  //   console.log("good2");
  //   strengthStatus.textContent = "Password is good";
  //   strengthStatusBar1.classList.remove("red");
  //   strengthStatusBar1.classList.add("orange");
  //   strengthStatusBar2.classList.add("orange");
  //   strengthStatusBar1.classList.remove("green");
  //   strengthStatusBar2.classList.remove("green");
  //   strengthStatusBar3.classList.remove("green");
  //   return true;
  // }
  if (
    characterLength(password) &&
    ((containsSpecialCharacters(password) &&
      containsNumbers(password) &&
      !containsCapitalLetter(password)) ||
      (containsCapitalLetter(password) &&
        containsNumbers(password) &&
        !containsSpecialCharacters(password)) ||
      (containsCapitalLetter(password) &&
        containsSpecialCharacters(password) &&
        !containsNumbers(password)))
  ) {
    console.log("good3");
    strengthStatus.textContent = "Password is good";
    strengthStatusBar1.classList.remove("red");
    strengthStatusBar1.classList.add("orange");
    strengthStatusBar2.classList.add("orange");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  } else if (
    !characterLength(password) &&
    ((containsSpecialCharacters(password) &&
      containsNumbers(password) &&
      !containsCapitalLetter(password)) ||
      (containsCapitalLetter(password) &&
        containsNumbers(password) &&
        !containsSpecialCharacters(password)) ||
      (containsCapitalLetter(password) &&
        containsSpecialCharacters(password) &&
        !containsNumbers(password)))
  ) {
    console.log("good4");
    strengthStatus.textContent = "Password is good";
    strengthStatusBar1.classList.remove("red");
    strengthStatusBar1.classList.add("orange");
    strengthStatusBar2.classList.add("orange");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  } else {
    console.log("NOT good");
    return false;
  }
}

// weak password
function weakPassword(password) {
  if (
    // nothing met
    !noPassword(password) &&
    !characterLength(password) &&
    !containsSpecialCharacters(password) &&
    !containsCapitalLetter(password) &&
    !containsNumbers(password)
  ) {
    console.log("weak1");
    strengthStatus.textContent = "Password is weak";
    strengthStatusBar1.classList.add("red");
    strengthStatusBar1.classList.remove("organge");
    strengthStatusBar2.classList.remove("organge");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  } else if (
    // empty input
    noPassword(password) &&
    !characterLength(password) &&
    !containsSpecialCharacters(password) &&
    !containsCapitalLetter(password) &&
    !containsNumbers(password)
  ) {
    console.log("weak2");
    strengthStatus.textContent = "No password...";
    strengthStatusBar1.classList.remove("red");
    strengthStatusBar1.classList.remove("organge");
    strengthStatusBar2.classList.remove("organge");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  }
  // else if (
  //   !characterLength(password) &&
  //   containsSpecialCharacters(password) &&
  //   (!containsCapitalLetter(password) || !containsNumbers(password))
  // ) {
  //   console.log("weak3");
  //   strengthStatus.textContent = "Password is weak";
  //   strengthStatusBar1.classList.add("red");
  //   strengthStatusBar1.classList.remove("orange");
  //   strengthStatusBar2.classList.remove("orange");
  //   strengthStatusBar1.classList.remove("green");
  //   strengthStatusBar2.classList.remove("green");
  //   strengthStatusBar3.classList.remove("green");
  //   return true;
  // }
  else if (
    // only number added
    !characterLength(password) &&
    !containsSpecialCharacters(password) &&
    !containsCapitalLetter(password) &&
    containsNumbers(password)
  ) {
    console.log("weak4");
    strengthStatus.textContent = "Password is weak";
    strengthStatusBar1.classList.add("red");
    strengthStatusBar1.classList.remove("orange");
    strengthStatusBar2.classList.remove("orange");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  } else if (
    !characterLength(password) &&
    ((!containsSpecialCharacters(password) &&
      !containsNumbers(password) &&
      containsCapitalLetter(password)) ||
      (!containsCapitalLetter(password) &&
        containsNumbers(password) &&
        !containsSpecialCharacters(password)) ||
      (!containsCapitalLetter(password) &&
        containsSpecialCharacters(password) &&
        !containsNumbers(password)))
  ) {
    console.log("weak5");
    strengthStatus.textContent = "Password is weak";
    strengthStatusBar1.classList.add("red");
    strengthStatusBar1.classList.remove("orange");
    strengthStatusBar2.classList.remove("orange");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  }
  if (
    !noPassword(password) &&
    characterLength(password) &&
    !containsSpecialCharacters(password) &&
    !containsCapitalLetter(password) &&
    !containsNumbers(password)
  ) {
    console.log("weak6");
    strengthStatus.textContent = "Password is weak";
    strengthStatusBar1.classList.add("red");
    strengthStatusBar1.classList.remove("organge");
    strengthStatusBar2.classList.remove("organge");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  } else if (
    characterLength(password) &&
    ((!containsSpecialCharacters(password) &&
      !containsNumbers(password) &&
      containsCapitalLetter(password)) ||
      (!containsCapitalLetter(password) &&
        containsNumbers(password) &&
        !containsSpecialCharacters(password)) ||
      (!containsCapitalLetter(password) &&
        containsSpecialCharacters(password) &&
        !containsNumbers(password)))
  ) {
    console.log("weak7");
    strengthStatus.textContent = "Password is weak";
    strengthStatusBar1.classList.add("red");
    strengthStatusBar1.classList.remove("orange");
    strengthStatusBar2.classList.remove("orange");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  } else {
    console.log("NOT weak");
    strengthStatusBar1.classList.remove("red");
    return false;
  }
}

// ================================================== COPY BUTTON

copyBtn.addEventListener("click", () => {
  try {
    const password = input.value.trim();
    navigator.clipboard.writeText(password);
    copyBtn.textContent = "Copied!";
    copyBtn.style.color = "#04aa47";
    copyBtn.style.border = "2px solid #04aa47";
    console.log("copied");
  } catch (error) {
    console.log("unable to copy!");
  }
});

// ================================================== PASSWORD GENERATOR

const generateBtn = document.querySelector(".password-generator-btn");
const generatedPasswordDiv = document.querySelector(".generated-password");

generateBtn.addEventListener("click", () => {
  // ==============function 1
  function randomNumber1(array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex;
  }
  // random array index
  const randomNumbersCharacterIndex = randomNumber1(numbersArray);
  const randomSpecialCharacterIndex = randomNumber1(specialCharacters);
  const randomLowLetterCharacterIndex = randomNumber1(alphabetLowercase);
  const randomUpLetterCharacterIndex = randomNumber1(alphabetUppercase);

  // random character find
  const randomNumbersCharacter1 = numbersArray[randomNumbersCharacterIndex];
  const randomSpecialCharacter1 =
    specialCharacters[randomSpecialCharacterIndex];
  const randomLowLetterCharacter1 =
    alphabetLowercase[randomLowLetterCharacterIndex];
  const randomUpLetterCharacter1 =
    alphabetUppercase[randomUpLetterCharacterIndex];

  // ==============function 2
  function randomNumber2(array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex;
  }
  // random array index
  const randomNumbersCharacterIndex2 = randomNumber2(numbersArray);
  const randomSpecialCharacterIndex2 = randomNumber2(specialCharacters);
  const randomLowLetterCharacterIndex2 = randomNumber2(alphabetLowercase);
  const randomUpLetterCharacterIndex2 = randomNumber2(alphabetUppercase);

  // random character find
  const randomNumbersCharacter2 = numbersArray[randomNumbersCharacterIndex2];
  const randomSpecialCharacter2 =
    specialCharacters[randomSpecialCharacterIndex2];
  const randomLowLetterCharacter2 =
    alphabetLowercase[randomLowLetterCharacterIndex2];
  const randomUpLetterCharacter2 =
    alphabetUppercase[randomUpLetterCharacterIndex2];

  generatedPasswordDiv.textContent = `${randomNumbersCharacter1}${randomLowLetterCharacter1}${randomSpecialCharacter1}${randomUpLetterCharacter1}${randomNumbersCharacter2}${randomSpecialCharacter2}${randomLowLetterCharacter2}${randomUpLetterCharacter2}`;
});

// ================================================== COPY BUTTON

const copyGenBtn = document.querySelector(".copy-to-clipboard-btn-2");

copyGenBtn.addEventListener("click", () => {
  try {
    const generatedPassword = generatedPasswordDiv.textContent.trim();
    navigator.clipboard.writeText(generatedPassword);
    copyGenBtn.textContent = "Copied!";
    copyGenBtn.style.color = "#04aa47";
    copyGenBtn.style.border = "2px solid #04aa47";
    if (generatedPasswordDiv.textContent === "") {
      copyGenBtn.textContent = "Nothing to copy?";
      copyGenBtn.style.color = "red";
      copyGenBtn.style.border = "2px solid red";
    }
    console.log("copied");
  } catch (error) {
    console.log("unable to copy!");
  }
});
