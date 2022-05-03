import { enterForm, maze } from "./html-content";
import feedbacks from "./messages/feedbacks";
import { makeGame } from "./runMazeIsa";
import { loginWS } from "./controls";

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
    loginWS(document.querySelector("#nickname").value);
    rootDiv.innerHTML = maze;
    makeGame();
  }
};