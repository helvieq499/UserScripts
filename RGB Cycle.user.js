// ==UserScript==
// @name        RGB Cycle
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      helvieq499
// @description Adjusts the hue-rotate with time
// @downloadURL https://raw.githubusercontent.com/helvieq499/UserScripts/master/RGB Cycle.js
// ==/UserScript==

window.addEventListener("load", () => {
  let original = document.body.style.filter || "";
  let render;
  (render = () => {
    requestAnimationFrame(render);
    document.body.style.filter = `${original} hue-rotate(${Math.floor(Math.sin(Date.now() / 5000) * 360)}deg)`
  })();
});
