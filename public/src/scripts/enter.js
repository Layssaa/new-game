import { enterForm, maze } from "./html-content";
import feedbacks from "./messages/feedbacks";
import { makeGame } from "./runMazeIsa";
import { loginWS } from "./request-control";

export const rootDiv = document.querySelector("#root");

export const onLoadIndexHtml = () => {
  rootDiv.innerHTML = enterForm;
  document.querySelector("#enter-button").addEventListener("click", enter);
  window.addEventListener("keydown", enterKey);
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
  } else if (nickname.length <= 0) {
    setMessage(feedbacks.SHORT_NICKNAME);
  } else {
    loginWS(nickname);
  }
};

export const enterKey = (_event) => {
  if (_event.keyCode === 13) {
    enter();
  }
}

onLoadIndexHtml()