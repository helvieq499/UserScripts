// ==UserScript==
// @name        Particles
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      helvieq499
// @description Particles.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js
// @downloadURL https://raw.githubusercontent.com/helvieq499/UserScripts/master/Particles.js
// ==/UserScript==

window.addEventListener("load", () => {
  let canvas = document.createElement("canvas");
  canvas.id = "particles-helvieq499";  
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100vw",
    height: "100vh",
    zIndex: 99999,
    pointerEvents: "none",
  });
  document.body.appendChild(canvas);
  
  Particles.init({
    selector: '#particles-helvieq499',
    color: "#ff0000",
    connectParticles: true
  });
});
