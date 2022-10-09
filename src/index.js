import { animate } from "./utils/animate";
import "./styles/main.scss";

const prevArrow = document.querySelector(".swipper-arrow__left");
const nextArrow = document.querySelector(".swipper-arrow__right");
const swipper = document.querySelector(".swipper");
const swipperList = swipper.querySelector(".swipper-list");
const swipperCircle = swipper.querySelector(".swipper-circle");
const imgNum = swipperList.children.length;

const firstLi = swipperList.firstElementChild.cloneNode(true);
swipperList.append(firstLi);

const _w = swipper.offsetWidth;
let count = 0;
let flag = true;

for (let idx = 0; idx < imgNum; idx++) {
  const li = document.createElement("li");
  li.setAttribute("idx", idx);
  idx === 0 && li.classList.add("is-active");
  swipperCircle.append(li);
}

function setActiveCircle() {
  let idx = count === imgNum ? 0 : count;
  swipperCircle.querySelector("li.is-active").classList.remove("is-active");
  swipperCircle.children[idx].classList.add("is-active");
}

function circleClick(e) {
  const _t = e.target;
  if (_t.nodeName !== "LI") return;
  const activeIdx = _t.getAttribute("idx");
  count = +activeIdx;
  this.querySelector("li.is-active").classList.remove("is-active");
  _t.classList.add("is-active");
  animate(swipperList, -activeIdx * _w);
}

function next() {
  if (flag) {
    this.classList?.remove("is-disabled");
    flag = false;
    if (count === imgNum) {
      swipperList.style.left = 0;
      count = 0;
    }
    count++;
    animate(swipperList, -count * _w, () => (flag = true));
    setActiveCircle();
  } else {
    this.classList?.add("is-disabled");
  }
}

function prev() {
  if (flag) {
    this.classList.remove("is-disabled");
    if (count === 0) {
      swipperList.style.left = `${-imgNum * _w}px`;
      count = imgNum;
    }
    count--;
    animate(swipperList, -count * _w, () => (flag = true));
    setActiveCircle();
  } else {
    this.classList.add("is-disabled");
  }
}

let timer = setInterval(next, 2000);
nextArrow.addEventListener("click", next);
prevArrow.addEventListener("click", prev);
swipperCircle.addEventListener("click", circleClick);
swipper.addEventListener("mouseenter", () => {
  nextArrow.style.visibility = "visible";
  prevArrow.style.visibility = "visible";
  clearInterval(timer);
  timer = null;
});
swipper.addEventListener("mouseleave", () => {
  nextArrow.style.visibility = "hidden";
  prevArrow.style.visibility = "hidden";
  timer = setInterval(next, 2000);
});
