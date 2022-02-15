// ==UserScript==
// @name        Course Bar
// @namespace   Violentmonkey Scripts
// @match       https://*.instructure.com/*
// @grant       none
// @version     1.0
// @author      helvieq499
// @description Shows a bar at the top of any page with links to all of the courses
// @downloadURL https://raw.githubusercontent.com/helvieq499/UserScripts/master/Course Bar.js
// ==/UserScript==

// Create the bar
let bar = document.createElement("div");
Object.assign(bar.style, {
  paddingLeft: "5px",
  borderBottom: "solid 1px purple",
  position: "sticky",
  top: "0px",
  height: "24px",
  backgroundColor: "black",
  zIndex: 10000
});
document.getElementById("wrapper").prepend(bar);

fetch(`${document.location.origin}/api/v1/dashboard/dashboard_cards`)
  .then(response => response.json())
  .then(courses => {
    for (let course of courses) {
      // Create a link to the course
      let link = document.createElement("a");
      link.href = course.href;
      link.style.padding = "0px 2px";
      link.textContent = course.shortName;
      bar.appendChild(link);
      
      // Create a line seperator after each course
      let line = document.createElement("span");
      line.textContent = "|";
      line.style.color = "#fff";
      bar.appendChild(line);
    }
  
    // Remove the last line seperator
    bar.removeChild(bar.lastChild);
});
