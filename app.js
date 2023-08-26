import { specialCharacters } from "./specialCharacters.js";
import { alphabetLowercase } from "./specialCharacters.js";
import { alphabetUppercase } from "./specialCharacters.js";
import { numbersArray } from "./specialCharacters.js";

const input = document.querySelector(".input");
const submitBtn = document.querySelector(".submit-btn");
const notificationMessage = document.querySelector(".error-message");
const notificationMessageTwo = document.querySelector(".error-message-two");
const strengthStatusBar1 = document.querySelector(".strength-status-bar-1");
const strengthStatusBar2 = document.querySelector(".strength-status-bar-2");
const strengthStatusBar3 = document.querySelector(".strength-status-bar-3");
const strengthStatus = document.querySelector(".strength-status");
const copyBtn = document.querySelector(".copy-to-clipboard-btn");
const messageItem = document.querySelector(".message-item");

// ========================================

// PASSWORD STRENGTH TESTER MAIN EVENT

// ========================================


// submitBtn.addEventListener("click", validation);
input.addEventListener("input", () => {
  setTimeout(() => {
    function validation(password) {
      // Your validation logic goes here
      characterLength(password);
      containsCapitalLetter(password);
      containsSpecialCharacters(password);
      containsNumbers(password);
      strongPassword(password);
      goodPassword(password);
      weakPassword(password);
      noPassword(password);
    }
    
    const password = input.value.trim();
    validation(password);
    hideLoading()
  }, 800);
  showLoading(); 
});

// Loading icon
const loadingContainer = document.querySelector(".loading-container");

function showLoading() {
  loadingContainer.style.display = "block";
}

function hideLoading() {
  loadingContainer.style.display = "none";
}




// ========================================

// CONDITION STATEMENT FUNCTIONS

// ========================================

function noPassword(password) {
  if (password.trim().length === 0) {
    notificationMessageTwo.innerHTML = `<i class='message-item' style="color: red">Please enter a password.</i>`;
    strengthStatusBar1.classList.remove("red");
    strengthStatusBar1.classList.remove("orange");
    strengthStatusBar2.classList.remove("orange");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  }
}

// character length is correct
function characterLength(password) {
  const charCheck = document.querySelector(".characters");
  if (password.length > 7) {
    charCheck.innerHTML = `<i class="fa-solid fa-check"></i><p>Password is at least 8 characters long</p>`;
    messageItem.innerHTML = `-`;

    return true;
  } else {
    charCheck.innerHTML = `<i class="fa-regular fa-square"></i><p>Password is at least 8 characters long</p>`;
    return false;
  }
}

// contains special character
function containsSpecialCharacters(password) {
  const specCheck = document.querySelector(".special");
  if (specialCharacters.some((char) => password.includes(char))) {
    specCheck.innerHTML = `<i class="fa-solid fa-check"></i><p>Password contains a special character</p>`;
    return true;
  } else if (
    password.length > 7 &&
    specialCharacters.some((char) => !password.includes(char))
  ) {
    specCheck.innerHTML = `<i class="fa-regular fa-square"></i><p>Password contains a special character</p>`;
    return false;
  } else {
    specCheck.innerHTML = `<i class="fa-regular fa-square"></i><p>Password contains a special character</p>`;
  }
}

// contains capital letters
function containsCapitalLetter(password) {
  const capCheck = document.querySelector(".capital");
  // googled method params
  const capitalLetterCheck = password.match(/[A-Z]/g, "");
  if (capitalLetterCheck) {
    capCheck.innerHTML = `<i class="fa-solid fa-check"></i><p>Password contains a capital letter</p>`;
    return true;
  } else if (password.length > 7 && !capitalLetterCheck) {
    capCheck.innerHTML = `<i class="fa-regular fa-square"></i><p>Password contains a capital letter</p>`;
    return false;
  } else {
    capCheck.innerHTML = `<i class="fa-regular fa-square"></i><p>Password contains a capital letter</p>`;
  }
}

// contains numbers
function containsNumbers(password) {
  const numCheck = document.querySelector(".numbers");
  // googled method params
  const numberCheck = password.match(/[1-9]/g, "");
  if (numberCheck) {
    numCheck.innerHTML = `<i class="fa-solid fa-check"></i><p>Password contains a number</p>`;
    return true;
  } else if (password.length > 7 && !numberCheck) {
    numCheck.innerHTML = `<i class="fa-regular fa-square"></i><p>Password contains a number</p>`;
    return false;
  } else {
    numCheck.innerHTML = `<i class="fa-regular fa-square"></i><p>Password contains a number</p>`;
  }
}

// ========================================

// COLOUR STRENGTH STATUS CONTIONAL STATMENT FUNCTIONS

// ========================================

// strong password
function strongPassword(password) {
  const successMessage = document.querySelector(".success-message");
  if (
    characterLength(password) &&
    containsSpecialCharacters(password) &&
    containsCapitalLetter(password) &&
    containsNumbers(password)
  ) {
    console.log("strong");
    strengthStatus.textContent = "Password is strong!";
    notificationMessageTwo.innerHTML = `<i class='message-item' style="color: green">Password is ready to be copied!</i>`;
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
    copyBtn.classList.remove("show");
    return false;
  }
}

// good password
function goodPassword(password) {
  if (
    // length no correct but have all other characters
    !characterLength(password) &&
    containsSpecialCharacters(password) &&
    containsCapitalLetter(password) &&
    containsNumbers(password)
  ) {
    console.log("good1");
    strengthStatus.textContent = "Password is good";
    notificationMessageTwo.innerHTML = ``;
    strengthStatusBar1.classList.remove("red");
    strengthStatusBar1.classList.add("orange");
    strengthStatusBar2.classList.add("orange");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  }
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
    // console.log("good3");
    strengthStatus.textContent = "Password is good";
    notificationMessageTwo.innerHTML = ``;
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
    // console.log("good4");
    strengthStatus.textContent = "Password is good";
    notificationMessageTwo.innerHTML = ``;
    strengthStatusBar1.classList.remove("red");
    strengthStatusBar1.classList.add("orange");
    strengthStatusBar2.classList.add("orange");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  } else {
    // console.log("NOT good");
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
    // console.log("weak1");
    strengthStatus.textContent = "Password is weak";
    notificationMessageTwo.innerHTML = ``;
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
    // console.log("weak2");
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
    // console.log("weak4");
    strengthStatus.textContent = "Password is weak";
    notificationMessageTwo.innerHTML = ``;
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
    // console.log("weak5");
    strengthStatus.textContent = "Password is weak";
    notificationMessageTwo.innerHTML = ``;
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
    // console.log("weak6");
    strengthStatus.textContent = "Password is weak";
    notificationMessageTwo.innerHTML = ``;
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
    // console.log("weak7");
    strengthStatus.textContent = "Password is weak";
    notificationMessageTwo.innerHTML = ``;
    strengthStatusBar1.classList.add("red");
    strengthStatusBar1.classList.remove("orange");
    strengthStatusBar2.classList.remove("orange");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  } else {
    // console.log("NOT weak");
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
    // console.log("copied");
  } catch (error) {
    // console.log("unable to copy!");
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
    // console.log("copied");
  } catch (error) {
    // console.log("unable to copy!");
  }
});

// ================================================== NAVBAR BUTTON

const navBtn = document.querySelector(".profile-img");
const navLinks = document.querySelector(".navlinks");

navBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show-nav");
});

// ==================================================

// SHOW SECTION

// ==================================================

// =========== classlist method

const passwordSection = document.querySelector(".password-section");
const profileSection = document.querySelector(".home-section");
const testerBtn = document.getElementById("tester");
const generatorBtn = document.getElementById("generator");
const profileBtn = document.getElementById("home");
const generatorSection = document.querySelector(
  ".password-generator-main-section"
);
const getStartedBtn = document.querySelector(".get-started-btn");

testerBtn.addEventListener("click", () => {
  passwordSection.classList.add("show-section");
  generatorSection.classList.remove("show-section");
  profileSection.classList.add("hide-section");
});
generatorBtn.addEventListener("click", () => {
  passwordSection.classList.remove("show-section");
  generatorSection.classList.add("show-section");
  profileSection.classList.add("hide-section");
});
profileBtn.addEventListener("click", () => {
  passwordSection.classList.remove("show-section");
  generatorSection.classList.remove("show-section");
  profileSection.classList.remove("hide-section");
});

getStartedBtn.addEventListener("click", () => {
  passwordSection.classList.add("show-section");
  generatorSection.classList.remove("show-section");
  profileSection.classList.add("hide-section");
});
