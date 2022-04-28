// ==UserScript==
// @name        Time Scale
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      helvieq499
// @description Changes the time by a multiplier
// @downloadURL https://raw.githubusercontent.com/helvieq499/UserScripts/master/Time Scale.js
// ==/UserScript==

// currently you cannot change this without causing the time to jump by a large amount
// the solution would be to use a setter and change the start time to the current scaled time
let timeScale = 2.0;

(original => {
  let start = Date.now();
  Date.now = function (...args) { 
    return (original.apply(this, args) - start) * timeScale + start; 
  } 
})(Date.now);

(original => {
  let start = performance.now();
  performance.now = function (...args) { 
    return (original.apply(this, args) - start) * timeScale + start; 
  } 
})(performance.now);

(original => {
  let start = performance.now();
  requestAnimationFrame = function(callback) {
    original.call(this, time => callback(time * timeScale));
  }
})(requestAnimationFrame);
