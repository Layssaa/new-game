import { enterForm, maze } from "./html-content";
import Player from "./classes/Player";
import feedbacks from "./messages/feedbacks";
import { playersWS } from "../../../backend/__mock__/data-mock";
import { makeGame } from "./runMazeIsa";

const onLoadIndexHtml = () => {
  let newPlayer = undefined;

  try {
    const setMessage = (text) => {
      const feedbackMessage = document.querySelector("#feedback-message");
      feedbackMessage.innerHTML = text;
      setTimeout(() => {
        feedbackMessage.innerHTML = "";
      }, 2000);
    };

    const enter = () => {
      const nickname = document.querySelector("#nickname").value;
      if (/\s/g.test(nickname)) {
        setMessage(feedbacks.BLANK_SPACE);
      } else if (document.querySelector("#nickname").value.length <= 0) {
        setMessage(feedbacks.SHORT_NICKNAME);
      } else {
        playersWS.push({
          nickname: document.querySelector("#nickname").value,
          created_at: new Date(),
        });
        newPlayer = new Player(document.querySelector("#nickname").value);
        document.querySelector("#root").innerHTML = maze;
        makeGame();
        document.querySelector("#exit-button").addEventListener("click", exit);
      }
    };

    const exit = () => {
      const newPlayersWS = playersWS.filter((playerWS) => {
        return playerWS.nickname !== newPlayer.nickname;
      });
      playersWS = newPlayersWS;
      newPlayer.exit();
      newPlayer = undefined;
      document.querySelector("#root").innerHTML = enterForm;
      document.querySelector("#enter-button").addEventListener("click", enter);
    };
    document.querySelector("#root").innerHTML = enterForm;
    document.querySelector("#enter-button").addEventListener("click", enter);
  } catch (error) {
    document.querySelector("#root").innerHTML = "Página em manuntenção";
  }
};

export default onLoadIndexHtml;
