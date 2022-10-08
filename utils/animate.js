export function animate(ele, target, callback) {
  ele.style.position = "absolute";
  ele.timer && clearInterval(ele.timer);
  ele.timer = setInterval(() => {
    const ol = ele.offsetLeft;
    let step = (target - ol) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (ol === target) {
      clearInterval(ele.timer);
      callback && callback();
    } else {
      ele.style.left = `${ol + step}px`;
    }
  }, 15);
}
