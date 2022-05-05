import { onLoadIndexHtml, rootDiv } from "./enter.js";
import enterForm from "./html-content/enter-form.js";
import { logoutWS } from "./request-control.js";
import { animationFrame, game, gameInit, loopAnimationFrame } from "./runMazeIsa.js";

export const exit = () => {
  logoutWS();
  gameInit();
  rootDiv.innerHTML = enterForm;
  onLoadIndexHtml();
  game.setLoop(()=>{});
  cancelAnimationFrame(animationFrame);
  cancelAnimationFrame(loopAnimationFrame);
};