// ==UserScript==
// @name        Breathing
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      helvieq499
// @description Adjusts the body margin with time
// ==/UserScript==

window.addEventListener("load", () => {
  // disable the sidebars since those can resize the page
  let style = document.createElement("style");
  style.textContent = "body::-webkit-scrollbar { height: 0px }";
  document.head.appendChild(style);
  
  let original = document.body.style.margin || "0px";
  let render;
  (render = () => {
    requestAnimationFrame(render);
    document.body.style.margin = `calc(${original} + ${Math.floor(Math.sin(Date.now() / 1000) * 10)}px)`
  })();
});
