import { animate } from "./utils/animate";
import "./main.scss";

const prevArrow = document.querySelector(".swipper-arrow__left");
const nextArrow = document.querySelector(".swipper-arrow__right");
const swipper = document.querySelector(".swipper");
const swipperList = swipper.querySelector(".swipper-list");
const imgNum = swipperList.children.length;

const lastLi = swipperList.firstElementChild.cloneNode(true);
swipperList.append(lastLi);

const _w = swipper.offsetWidth;
let count = 0;

nextArrow.addEventListener("click", () => {
  if (count === imgNum) {
    swipperList.style.left = 0;
    count = 0;
  }
  count++;
  animate(swipperList, -count * _w);
});

prevArrow.addEventListener("click", () => {
  if (count === 0) {
    swipperList.style.left = `${-imgNum * _w}px`;
    count = imgNum;
  }
  count--;
  animate(swipperList, -count * _w);
});
