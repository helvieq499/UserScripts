// ==UserScript==
// @name        Scramble Title
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       unsafeWindow
// @version     1.0
// @author      helvieq499
// @description Randomizes the order of every character in the window title
// @downloadURL https://raw.githubusercontent.com/helvieq499/UserScripts/master/Scramble Title.js
// ==/UserScript==

document.__proto__ = new Proxy(document.__proto__, {
  set: (obj, prop, val, recv) => {
    if (prop == "title")
      val = val.split("").sort(() => Math.random() - 0.5).join("");
    return Reflect.set(obj, prop, val, recv);
  }
});
document.title = document.title;
