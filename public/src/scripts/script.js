import { enterForm } from "./html-content";
import feedbacks from "./messages/feedbacks";

const rootDiv = document.querySelector("#root");

try {
  rootDiv.innerHTML = enterForm;

  const nickname = document.querySelector("#nickname");
  const enterButton = document.querySelector("#enter-button");
  const feedbackMessage = document.querySelector("#feedback-message");

  setMessage = (text) => {
    feedbackMessage.innerHTML = text;
    setTimeout(() => {
      feedbackMessage.innerHTML = "";
    }, 2000);
  };

  const enter = () => {
    if (/\s/g.test(nickname.value)) {
      setMessage(feedbacks.BLANK_SPACE);
    } else if (nickname.value.length <= 0) {
      setMessage(feedbacks.SHORT_NICKNAME);
    } else {
      feedbackMessage.innerHTML = "Usuário ok";
    }
  };

  enterButton.addEventListener("click", enter);
  
} catch (error) {
  rootDiv.innerHTML = "Página em manuntenção";
}
