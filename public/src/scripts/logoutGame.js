import { newPlayer, rootDiv } from "./enter.js";
import enterForm from "./html-content/enter-form.js";


export const exit = () => {
    newPlayer.exit();
    newPlayer = undefined
    rootDiv.innerHTML = enterForm;
  };
