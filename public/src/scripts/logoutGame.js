import { Player } from "./classes/Player";
import logout from "./html-content/logout";

const logoutDiv = document.querySelector("#logout");

logoutDiv.innerHTML = logout;

const exit = () => {
    const newPlayersWS = playersWS.filter((playerWS) => {
      return playerWS.nickname !== newPlayer.nickname;
    });
    playersWS = newPlayersWS;
    newPlayer.exit();
    newPlayer = undefined
    rootDiv.innerHTML = enterForm;
  };

document.querySelector(".buttonLogout").addEventListener("click", exit);