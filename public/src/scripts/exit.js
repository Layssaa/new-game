import { rootDiv } from "./enter.js";
import enterForm from "./html-content/enter-form.js";
import { ws } from "./request-control.js";

export const exit = () => {
  ws.exit();
  ws = undefined;
  rootDiv.innerHTML = enterForm;
};
