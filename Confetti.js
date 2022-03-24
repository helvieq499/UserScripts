// ==UserScript==
// @name        Confetti
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      helvieq499
// @description Puts random amount of random rectangles onto the screen at a timed interval
// @downloadURL https://raw.githubusercontent.com/helvieq499/UserScripts/master/Confetti.js
// ==/UserScript==

let elems = [];
for (let i = 0; i < Math.random() * 5 + 3; i++)
  setInterval(() => {
    let d = document.createElement("div");
    Object.assign(d.style, {
      backgroundColor: "#" + Math.random().toString(16).substring(2,8),
      width: 100 * (Math.random() + 0.5) + "px",
      height: 20 * (Math.random() + 0.5) + "px",
      top: "calc(" + (100 * Math.random()) + "vh - 30px)",
      left: "calc(" + (100 * Math.random()) + "vw - 150px)",
      position: "fixed",
      zIndex: 2147483647,
      transform: "rotate(" + (Math.random() * 360) +"deg)",
      opacity: 0.4,
      pointerEvents: "none",
    });
    elems.push(d);
    document.body.appendChild(d);
    for (let j = 0; elems.length > 50 * Math.random() && j < 5; j++)
      document.body.removeChild(elems.shift());
  }, Math.random() * 10000 + 5000);
