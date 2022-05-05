import { onLoadIndexHtml, rootDiv } from "./enter.js";
import enterForm from "./html-content/enter-form.js";
import { logoutWS } from "./request-control.js";

export const exit = () => {
  location.reload(true);
  logoutWS();
  rootDiv.innerHTML = enterForm;
  localStorage.clear();
  onLoadIndexHtml()
};
