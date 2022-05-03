import { enterForm, maze } from "./html-content";
import Player from "./classes/Player";
import feedbacks from "./messages/feedbacks";
import { makeGame } from "./runMazeIsa";

export let newPlayer = undefined;
export const rootDiv = document.querySelector("#root");

export const onLoadIndexHtml = () => {
  rootDiv.innerHTML = enterForm;
  document.querySelector("#enter-button").addEventListener("click", enter);
};

export const setMessage = (text) => {
  const feedbackMessage = document.querySelector("#feedback-message");
  feedbackMessage.innerHTML = text;
  setTimeout(() => {
    feedbackMessage.innerHTML = "";
  }, 2000);
};

export const enter = async () => {
  const nickname = document.querySelector("#nickname").value;
  if (/\s/g.test(nickname)) {
    setMessage(feedbacks.BLANK_SPACE);
  } else if (document.querySelector("#nickname").value.length <= 0) {
    setMessage(feedbacks.SHORT_NICKNAME);
  } else {
    newPlayer = new Player(document.querySelector("#nickname").value);
    await newPlayer.init();
    rootDiv.innerHTML = maze;
    makeGame();
  }
};

export const exit = () => {
  newPlayer.exit();
  newPlayer = undefined;
  rootDiv.innerHTML = enterForm;
  document.querySelector("#enter-button").addEventListener("click", enter);
};
