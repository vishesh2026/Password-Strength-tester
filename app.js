import { specialCharacters } from "./specialCharacters.js";

const input = document.querySelector(".input");
const submitBtn = document.querySelector(".submit-btn");
const notificationMessage = document.querySelector(".password-status");
const strengthStatusBar1 = document.querySelector(".strength-status-bar-1");
const strengthStatusBar2 = document.querySelector(".strength-status-bar-2");
const strengthStatusBar3 = document.querySelector(".strength-status-bar-3");
const strengthStatus = document.querySelector(".strength-status");

function validation() {
  const password = input.value.trim();

  // emptyInput(password);
  characterLength(password);
  containsSpecialCharacters(password);
  // !notThatWord(password) &
  containsCapitalLetter(password);
  containsNumbers(password);
  strongPassword(password);
  goodPassword(password);
  weakPassword(password);
}

submitBtn.addEventListener("click", validation);

// character length is correct
function characterLength(password) {
  if (password.length > 7) {
    console.log("password is long enough");
    return true;
  }
  // else if (password.trim().length === 0) {
  //   notificationMessage.textContent = "Please submit a password.";
  //   console.log("password is empty");
  //   return true;
  // }
  else {
    notificationMessage.textContent =
      "Password should be at least 8 characters long.";
    console.log("password is too short");
    return;
  }
}

// contains special character
function containsSpecialCharacters(password) {
  if (specialCharacters.some((char) => password.includes(char))) {
    console.log("contains special charac");
    return true;
  } else if (
    password.length > 7 &&
    specialCharacters.some((char) => !password.includes(char))
  ) {
    console.log("NO speci char");
    notificationMessage.textContent =
      "Password must include special characters like '@' or '$'.";
    return false;
  }
}

// contains capital letters
function containsCapitalLetter(password) {
  // googled method params
  const capitalLetterCheck = password.match(/[A-Z]/g, "");
  if (capitalLetterCheck) {
    console.log("capital letter is used!");
    return true;
  } else if (password.length > 7 && !capitalLetterCheck) {
    notificationMessage.textContent =
      "Password should contain at least one capital letter.";
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
    return true;
  } else if (password.length > 7 && !numberCheck) {
    notificationMessage.textContent =
      "Password should contain at least one number";
    return false;
  }
}

// strong password
function strongPassword(password) {
  if (
    characterLength(password) &&
    containsSpecialCharacters(password) &&
    containsCapitalLetter(password) &&
    containsNumbers(password)
  ) {
    console.log("strong");
    strengthStatus.textContent = "Password is strong";
    strengthStatusBar1.classList.remove("red");
    strengthStatusBar1.classList.remove("orange");
    strengthStatusBar2.classList.remove("orange");
    strengthStatusBar1.classList.add("green");
    strengthStatusBar2.classList.add("green");
    strengthStatusBar3.classList.add("green");
    return true;
  } else {
    console.log("strong code needs work");
    return false;
  }
}

// good password
function goodPassword(password) {
  if (
    !characterLength(password) &&
    containsSpecialCharacters(password) &&
    containsCapitalLetter(password) &&
    containsNumbers(password)
  ) {
    console.log("good");
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
    (containsSpecialCharacters(password) ||
      containsCapitalLetter(password) ||
      containsNumbers(password))
  ) {
    console.log("good");
    strengthStatus.textContent = "Password is good";
    strengthStatusBar1.classList.remove("red");
    strengthStatusBar1.classList.add("orange");
    strengthStatusBar2.classList.add("orange");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  } else if (
    characterLength(password) &&
    (!containsSpecialCharacters(password) ||
      !containsCapitalLetter(password) ||
      !containsNumbers(password))
  ) {
    console.log("good");
    strengthStatus.textContent = "Password is good";
    strengthStatusBar1.classList.remove("red");
    strengthStatusBar1.classList.add("orange");
    strengthStatusBar2.classList.add("orange");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  } else {
    console.log("good code needs work");
    return false;
  }
}

// weak password
function weakPassword(password) {
  if (
    !characterLength(password) &&
    !containsSpecialCharacters(password) &&
    !containsCapitalLetter(password) &&
    !containsNumbers(password)
  ) {
    console.log("weak");
    strengthStatus.textContent = "Password is weak";
    strengthStatusBar1.classList.add("red");
    return true;
  } else if (
    characterLength(password) &&
    !containsSpecialCharacters(password) &&
    !containsCapitalLetter(password) &&
    !containsNumbers(password)
  ) {
    console.log("weak");
    strengthStatus.textContent = "Password is weak";
    strengthStatusBar1.classList.add("red");
    strengthStatusBar1.classList.remove("green");
    strengthStatusBar2.classList.remove("green");
    strengthStatusBar3.classList.remove("green");
    return true;
  } else {
    console.log("weak code needs work");
    strengthStatusBar1.classList.remove("red");
    return false;
  }
}

// not 'password'
// function notThatWord(password) {
//   if (password !== "password") {
//     notificationMessage.textContent =
//       "Password may not be the word 'password'.";
//   }
// }

// function colorRepresentation(password){
// if(emptyInput(password)){
//   console.log('do nothing');
// } else if(password.length < 5) {
//   console.log("weak");
// } else if (password.length >= 5 && password.length < 7) {
//   console.log("moderate");
// } else if (password.length > 7 && containsSpecialCharacters(password)) {
//   console.log("strong");
// } else {
//   console.log("something went wrong");
// }
// }

// ======== needs work
