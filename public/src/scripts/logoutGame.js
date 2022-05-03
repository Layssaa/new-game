import { newPlayer, rootDiv } from "./enter.js";
import enterForm from "./html-content/enter-form.js";
import logout from "./html-content/logout";

export const exit = () => {
    newPlayer.exit();
    newPlayer = undefined
    rootDiv.innerHTML = enterForm;
  };

// document.querySelector(".buttonLogout").addEventListener("click", exit);