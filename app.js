const theme1 = document.querySelector("#theme-1");
const theme2 = document.querySelector("#theme-2");
const theme3 = document.querySelector("#theme-3");
const themeChange = document.querySelector(".theme--slider");
const body = document.querySelector("body");
const inputExp = document.querySelector(".input--value--exp");
const outputValue = document.querySelector(".output--value");
const buttons = document.querySelectorAll(".input--box button");

let currentInput = "";

themeChange.addEventListener("click", themeswitch);

function themeswitch(e) {
  if (e.target === theme1) {
    body.classList.remove("theme--2", "theme--3");
    body.classList.add("theme--1");
  } else if (e.target === theme2) {
    body.classList.remove("theme--1", "theme--3");
    body.classList.add("theme--2");
  } else if (e.target === theme3) {
    body.classList.remove("theme--1", "theme--2");
    body.classList.add("theme--3");
  }
}

// event listeners
document.addEventListener("DOMContentLoaded", () => {
  // handling keyboard input
  document.addEventListener("keydown", (e) => {
    // handle numbers and decimal
    if (/^[0-9.]$/.test(e.key)) {
      e.preventDefault();
      handleInput(e.key);
    }
    // handle operators
    else if (["+", "-", "*", "/"].includes(e.key)) {
      e.preventDefault();
      const operator = e.key === "*" ? "x" : e.key;
      handleInput(operator);
    }
    // enter for equals
    else if (e.key === "Enter") {
      e.preventDefault();
      calculate();
    }
    // backspace for delete
    else if (e.key === "Backspace") {
      e.preventDefault();
      handleDelete();
    }
    // escape for reset
    else if (e.key === "Escape") {
      e.preventDefault();
      handleReset();
    }
  });

  // button click handling
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonText = button.textContent;

      if (buttonText === "Del") {
        handleDelete();
      } else if (buttonText === "Reset") {
        handleReset();
      } else if (buttonText === "=") {
        calculate();
      } else {
        handleInput(buttonText);
      }
    });
  });
});

function handleDelete() {
  currentInput = currentInput.slice(0, -1);
  inputExp.textContent = currentInput || "0";
}

function handleReset() {
  currentInput = "";
  inputExp.textContent = "0";
  outputValue.textContent = "0";
}

function handleInput(value) {
  if (currentInput === "0" && !isOperator(value)) {
    currentInput = value;
  } else {
    const lastChar = currentInput[currentInput.length - 1];
    if (
      !(isOperator(value) && isOperator(lastChar)) &&
      !(value === "." && lastChar === ".")
    ) {
      currentInput += value;
    }
  }
  inputExp.textContent = currentInput;
}

function isOperator(char) {
  return ["+", "-", "x", "/"].includes(char);
}

function calculate() {
  try {
    if (!currentInput || isOperator(currentInput[currentInput.length - 1])) {
      return;
    }

    let result = Function(
      '"use strict";return (' + currentInput.replace(/x/g, "*") + ")"
    )();

    if (!isFinite(result)) {
      throw new Error("Cannot divide by zero");
    }

    result = result.toString();
    if (result.includes(".")) {
      result = Number(parseFloat(result).toFixed(8))
        .toString()
        .replace(/\.?0+$/, "");
    }

    outputValue.textContent = result;
    currentInput = result;
  } catch (error) {
    outputValue.textContent = "Error";
    currentInput = "";
  }
}
