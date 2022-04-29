import { enterForm, mockGame } from "./html-content";
import Player from "./classes/Player";
import feedbacks from "./messages/feedbacks";
import { playersWS } from "../../../backend/__mock__/data-mock";

const rootDiv = document.querySelector("#root");
let newPlayer = undefined;

try {
  rootDiv.innerHTML = enterForm;

  const nickname = document.querySelector("#nickname");
  const enterButton = document.querySelector("#enter-button");
  const feedbackMessage = document.querySelector("#feedback-message");

  const setMessage = (text) => {
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
      playersWS.push({
        nickname: nickname,
        created_at: new Date(),
      });
      newPlayer = new Player(nickname.value);
      rootDiv.innerHTML = mockGame;
      document.querySelector("#exit-button").addEventListener("click", exit);
    }
  };

  const exit = () => {
    const newPlayersWS = playersWS.filter((playerWS) => {
      return playerWS.nickname !== newPlayer.nickname;
    });
    playersWS = newPlayersWS;
    newPlayer.exit();
    rootDiv.innerHTML = enterForm;
  };

  enterButton.addEventListener("click", enter);
} catch (error) {
  rootDiv.innerHTML = "Página em manuntenção";
}