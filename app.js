const adviceBtn = document.querySelector(".adviceBtn");
const advice = document.querySelector(".advice");
const adviceNumber = document.querySelector(".adviceNumber");
const lines = document.querySelectorAll(".line");
const square = document.querySelector(".square");
const adviceNumberTitle = document.querySelector(".adviceNumberTitle");
const container = document.querySelector(".container");

adviceBtn.addEventListener("click", getAdvice);
let apiAdvice = [];
let isTrue = true;

async function getAdvice() {
  const api = `https://api.adviceslip.com/advice`;
  try {
    const response = await fetch(api);
    apiAdvice = await response.json();
    displayAdvice();
  } catch (error) {
    console.log(error);
  }
}

function displayAdvice() {
  adviceNumber.innerHTML = `${apiAdvice.slip.id}`;
  advice.innerHTML = apiAdvice.slip.advice;

  cssDesign(advice, "animation", "fromRight-ToCenter 1.5s");
  cssDesign(adviceNumber, "animation", "adviceAnimation 1.5s");
  cssDesign(square, "display", "block");
  cssDesign(adviceNumberTitle, "opacity", 1);

  lines.forEach((line) => {
    cssDesign(line, "display", "block");
  });

  setTimeout(() => {
    cssDesign(advice, "removeProperty", "animation");
    cssDesign(adviceBtn, "add", "adviceBottom");
    cssDesign(adviceBtn, "removeProperty", "animation");
    cssDesign(adviceNumber, "removeProperty", "animation");
    cssDesign(adviceBtn, "disabled", false);
  }, 1500);

  isTrue
    ? cssDesign(adviceBtn, "animation", "fromCenter-ToBottom 1.5s")
    : cssDesign(adviceBtn, "removeProperty", "animation");

  if (isTrue) isTrue = false;
  cssDesign(adviceBtn, "disabled", true);
  cssDesign(container, "add", "showContainer");

  let root = document.documentElement;
  let containerHeight = container.offsetHeight;
  root.style.setProperty("--containerHeight", `${containerHeight * 0.504}px`);
}

const cssDesign = (el, property, value) => {
  if (property === "animation") el.style.animation = value;
  if (property === "display") el.style.display = value;
  if (property === "removeProperty") el.style.removeProperty(value);
  if (property === "opacity") el.style.opacity = value;
  if (property === "add") el.classList.add(value);
  if (property === "disabled") el.disabled = value;
};
