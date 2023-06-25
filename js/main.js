
const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")
let passwordLength = 16;

function generatePassword() {
  let chars = "abcdefghjkmnpqrstuvwxyz"

  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
  const numberChars = "123456789"
  const symbolChars = "?!@&*()[]"

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars
  }

  if (numberCheckEl.checked) {
    chars += numberChars
  }

  if (symbolCheckEl.checked) {
    chars += symbolChars
  }

  let password = "";

  // usaremos o for para trazer o valor total de chars de forma randomica
  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inputEl.value = password;
  calculateQuality()
  calculateFontSize()
}

function calculateQuality() {

  const percent = Math.round(
    (passwordLength / 64) * 25 + 
      (upperCaseCheckEl.checked ? 20 : 0) +
      (numberCheckEl.checked ? 25 : 0) +
      (symbolCheckEl.checked ? 30 : 0)
  )

  securityIndicatorBarEl.style.width = `${percent}%`

  if (percent > 69) {
    // safe
    securityIndicatorBarEl.classList.add("safe")
    securityIndicatorBarEl.classList.remove("warning")
    securityIndicatorBarEl.classList.remove("critical")
    
    
  } else if (percent > 50) {
    // warning
    securityIndicatorBarEl.classList.add("warning")
    securityIndicatorBarEl.classList.remove("safe")
    securityIndicatorBarEl.classList.remove("critical")
    
  } else {
    // critical
    securityIndicatorBarEl.classList.add("critical")
    securityIndicatorBarEl.classList.remove("safe")
    securityIndicatorBarEl.classList.remove("warning")
    
  }
  if (percent >= 100) {
    securityIndicatorBarEl.classList.add("completed")
  } else {
    securityIndicatorBarEl.classList.remove("completed")
  }
}

function calculateFontSize() {
  if (passwordLength > 40) {
    inputEl.classList.remove("font-sm")
    inputEl.classList.remove("font-xs")
    inputEl.classList.add("font-xxs")
  } else if (passwordLength > 30) {
    inputEl.classList.remove("font-sm")
    inputEl.classList.add("font-xs")
    inputEl.classList.remove("font-xxs")
  } else if (passwordLength > 17) {
    inputEl.classList.add("font-sm")
    inputEl.classList.remove("font-xs")
    inputEl.classList.remove("font-xxs")
  } else {
    inputEl.classList.remove("font-sm")
    inputEl.classList.remove("font-xs")
    inputEl.classList.remove("font-xxs")
  }
}



function copy() {
  navigator.clipboard.writeText(inputEl.value);
}

const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", function () {
  passwordLength = passwordLengthEl.value
  document.querySelector('#password-length-text').innerText = passwordLength
  generatePassword();
});

upperCaseCheckEl.addEventListener("click", generatePassword)
numberCheckEl.addEventListener("click", generatePassword)
symbolCheckEl.addEventListener("click", generatePassword)

document.querySelector("#copy-icon").addEventListener("click", copy);
document.querySelector("#reset").addEventListener("click", generatePassword);
document.querySelector("#copy").addEventListener("click", copy);

generatePassword();
// O passwordLength tem o 16 como valor inicial do gerador. para auterar a quant de chars é só mexer no range