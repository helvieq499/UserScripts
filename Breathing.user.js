// ==UserScript==
// @name        Breathing
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      helvieq499
// @description Adjusts the top margin of the body tith time
// @downloadURL https://raw.githubusercontent.com/helvieq499/UserScripts/master/Breathing.js
// ==/UserScript==

window.addEventListener("load", () => {
  // disable the vertical sidebar since it can resize the page and cause text wrapping
  let style = document.createElement("style");
  style.textContent = "body::-webkit-scrollbar { width: 0px }";
  document.head.appendChild(style);
  
  let original = document.body.style.margin || "0px";
  let render;
  (render = () => {
    requestAnimationFrame(render);
    document.body.style.marginTop = `calc(${original} + ${Math.floor(Math.sin(Date.now() / 1000) * 10)}px)`
  })();
});
