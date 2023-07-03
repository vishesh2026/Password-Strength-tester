import { specialCharacters } from "./specialCharacters.js";

const input = document.querySelector(".input");
const submitBtn = document.querySelector(".submit-btn");
const notificationMessage = document.querySelector(".password-status");

function validation() {
  const password = input.value;
  console.log(password);

  emptyInput(password);
  characterLength(password);
  containsSpecialCharacters(password);

  //   if (password === "password") {
  //     notificationMessage.textContent = "Password may not be 'password.";
  //   }
}

submitBtn.addEventListener("click", validation);

function characterLength(password) {
  if (password.length > 0 && password.length < 8) {
    notificationMessage.textContent =
      "Password should be 8 characters long or more.";
  }
}

function emptyInput(password) {
  //   empty input
  if (password === "") {
    notificationMessage.textContent = "Please submit a password.";
  }
}

function containsSpecialCharacters(password) {
  if (password.length === 8 && password.value !== '' && !password.includes(...specialCharacters)) {
    notificationMessage.textContent =
      "Password must include special characters like '@' or '$'.";
  }
}
