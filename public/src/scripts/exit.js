import { rootDiv } from "./enter.js";
import enterForm from "./html-content/enter-form.js";
import { ws, logoutWS } from "./request-control.js";

export const exit = () => {
  logoutWS();
  ws = undefined;
  rootDiv.innerHTML = enterForm;
  localStorage.clear();
};
