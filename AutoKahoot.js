// ==UserScript==
// @name        AutoKahoot
// @namespace   Violentmonkey Scripts
// @match       https://kahoot.it/*
// @grant       GM.xmlHttpRequest
// @version     1.0
// @author      helvieq499
// @description Prompts for the quiz id and then automatically solves when it is submitted
// @downloadURL https://raw.githubusercontent.com/helvieq499/UserScripts/master/AutoKahoot.js
// ==/UserScript==

FetchAnswers = id => callback => GM.xmlHttpRequest({
    method: "GET",
    url: "https://play.kahoot.it/rest/kahoots/" + id,
    onload: resp => callback(resp)
});

AutoKahoot = {
  answers: undefined,
  getChoices: () => document.querySelector("#root > div:nth-child(1) > main > div:nth-child(2) > div > div"),
  getCurrent: () => new Number(document.querySelector("#root > div:nth-child(1) > main > div:nth-child(1) > div > div:nth-child(1)").textContent.split(' ')[0]),
  getAnswer: () => AutoKahoot.answers[AutoKahoot.getCurrent() - 1][1][0].position,
  putAnswer: () => AutoKahoot.getChoices().children[AutoKahoot.getAnswer()].click(),
};

panel = document.createElement("textarea");
panel.placeholder = "Quiz ID";
Object.assign(panel.style, {
  border: "solid 1px purple",
  backgroundColor: "black",
  position: "absolute",
  width: "300px",
  left: "10px",
  top: "10px",
  height: "16px",
  zIndex: 10000,
  resize: "none",
});

panel.addEventListener("keypress", e => {
  if (e.key != "Enter") return;
  e.preventDefault();
  e.stopPropagation();
    
  FetchAnswers(panel.value)(resp => {
    panel.disabled = false;
    if (resp.status != 200) return alert(`Failed with status code ${resp.status}`);

    panel.value = "";
    
    AutoKahoot.answers = JSON.parse(resp.responseText).questions.map(question => [question.question, question.choices.map((choice, index) => {choice.position = index; return choice; }).filter(choice => choice.correct)])
    if (window.prevInterval) {
      clearInterval(prevInterval);
      delete window.prevInterval;
    }
    window.prevInterval = setInterval(AutoKahoot.putAnswer, 10);
  });
  panel.disabled = true;
});

document.body.appendChild(panel);

window.addEventListener("keydown", e => {
  if (e.key != "Insert") return;
  e.preventDefault();
  e.stopPropagation();
  
  panel.style.display = panel.style.display == "none" ? "inherit" : "none";
});
