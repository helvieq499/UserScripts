// ==UserScript==
// @name        Always isTrusted
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      helvieq499
// @description Forces Event.isTrusted to always be true 
// @downloadURL https://raw.githubusercontent.com/helvieq499/UserScripts/master/Always isTrusted.js
// ==/UserScript==

let createEventProxy = (event) => new Proxy(event, {
  get(target, prop, reciever) {
    if (prop == "isTrusted")
      return true;
    return target[prop];
  }
});

// this only works on newly created listeners
// there doesn't appear to be a way to get a list of current listeners
// luckily this user script will run before the website runs
let original = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(type, func, ...args) {
  original.apply(this, [type, (event, ...args2) => {
    func(createEventProxy(event), ...args2);
  }, ...args]);
}

// although a getter could be set that would return the passed function to hide a bit more
// there isn't much of a point when anyone can just use __lookupSetter__ and find us
for (let prop of Object.getOwnPropertyNames(HTMLElement.prototype).filter(x => x.indexOf("on") == 0)) {
  let original = HTMLElement.prototype.__lookupSetter__(prop);
  HTMLElement.prototype.__defineSetter__(prop, function(func) {
    original.call(this, (event, ...args) => {
      func(createEventProxy(event), ...args);
    });
  }); 
}

// for some reason window has to be different from everything else
// this could be merged with the above loop
for (let prop of Object.getOwnPropertyNames(window).filter(x => x.indexOf("on") == 0)) {
  let original = window.__lookupSetter__(prop);
  window.__defineSetter__(prop, function(func) {
    original.call(this, (event, ...args) => {
      func(createEventProxy(event), ...args);
    });
  }); 
}
