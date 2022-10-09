import { animate } from "./utils/animate";
import "./styles/main.scss";

const prevArrow = document.querySelector(".swiper-arrow__left");
const nextArrow = document.querySelector(".swiper-arrow__right");
const swiper = document.querySelector(".swiper");
const swiperList = swiper.querySelector(".swiper-list");
const swiperCircle = swiper.querySelector(".swiper-circle");
const imgNum = swiperList.children.length;

const firstLi = swiperList.firstElementChild.cloneNode(true);
swiperList.append(firstLi);

const _w = swiper.offsetWidth;
let count = 0;
let flag = true;

for (let idx = 0; idx < imgNum; idx++) {
    const li = document.createElement("li");
    li.setAttribute("idx", String(idx));
    idx === 0 && li.classList.add("is-active");
    swiperCircle.append(li);
}

function setActiveCircle() {
    let idx = count === imgNum ? 0 : count;
    swiperCircle.querySelector("li.is-active").classList.remove("is-active");
    swiperCircle.children[idx].classList.add("is-active");
}

function circleClick(e) {
    const _t = e.target;
    if (_t.nodeName !== "LI") return;
    const activeIdx = _t.getAttribute("idx");
    count = +activeIdx;
    this.querySelector("li.is-active").classList.remove("is-active");
    _t.classList.add("is-active");
    animate(swiperList, -activeIdx * _w);
}

function next() {
    if (flag) {
        this.classList?.remove("is-disabled");
        flag = false;
        if (count === imgNum) {
            swiperList.style.left = '0';
            count = 0;
        }
        count++;
        animate(swiperList, -count * _w, () => (flag = true));
        setActiveCircle();
    } else {
        this.classList?.add("is-disabled");
    }
}

function prev() {
    if (flag) {
        this.classList.remove("is-disabled");
        if (count === 0) {
            swiperList.style.left = `${-imgNum * _w}px`;
            count = imgNum;
        }
        count--;
        animate(swiperList, -count * _w, () => (flag = true));
        setActiveCircle();
    } else {
        this.classList.add("is-disabled");
    }
}

let timer = setInterval(next, 2000);
nextArrow.addEventListener("click", next);
prevArrow.addEventListener("click", prev);
swiperCircle.addEventListener("click", circleClick);
swiper.addEventListener("mouseenter", () => {
    nextArrow.style.visibility = "visible";
    prevArrow.style.visibility = "visible";
    clearInterval(timer);
    timer = null;
});
swiper.addEventListener("mouseleave", () => {
    nextArrow.style.visibility = "hidden";
    prevArrow.style.visibility = "hidden";
    timer = setInterval(next, 2000);
});
