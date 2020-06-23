/*
  How to use:
  1) Import this file into your project, for example:
     import * as jLoader from "./jLoader.mjs";
  2) Use exported functions:
     jLoader.showLoader();
     jLoader.hideLoader();
     jLoader.simulateLoading(1000);
*/


let _loaderDiv = null;

const _loaderStyleParent = {
  position: "fixed",
  zIndex: 100,
  width: "68px",
  height: "68px",
  left: "calc(50% - 34px)",
  top: "20%",
  display: "none",
};

const _loaderStyleChild = {
  width: "68px",
  height: "68px",
  borderRadius: "50%",
  boxShadow: "5px 3px 3px steelblue"
}

const _animKeyframes = [
  { transform: 'rotate(0)' },
  { transform: 'rotate(1turn)' }
];

const _animTiming = {
  duration: 600,
  iterations: Infinity
};


export function showLoader() {
  if (_loaderDiv) {
    _loaderDiv.style.display = "block";
  } else {
    console.error("jLoader: element not found");
  }
}


export function hideLoader() {
  if (_loaderDiv) {
    _loaderDiv.style.display = "none";
  } else {
    console.error("jLoader: element not found");
  }
}


export function simulateLoading(msTimeout = 500) {
  if (!_loaderDiv) {
    return 1;
  }
  showLoader();
  setTimeout(function () {
    hideLoader();
  }, msTimeout);
}


function applyStyles(elem, objStyles) {
  for (const key in objStyles) {
    elem.style[key] = objStyles[key];
  }
}


// ******* MAIN ********

function main() {
  let divChild = document.createElement("div");
  _loaderDiv = document.createElement("div");
  _loaderDiv.setAttribute("data-info", "jLoader");
  applyStyles(_loaderDiv, _loaderStyleParent);
  applyStyles(divChild, _loaderStyleChild);
  divChild.animate(_animKeyframes, _animTiming);
  _loaderDiv.appendChild(divChild);
  document.body.appendChild(_loaderDiv);
}

main();
