export const winnerPopUp = (winner) => {
  const popUp = document.querySelector("#winner-pop-up");
  const btn_logout = document.getElementById("exit-button")
  popUp.style.backgroundColor = "rgba(53, 52, 49, 1)";
  let p = document.createElement("p");
  popUp.append(p);
  popUp.append(btn_logout);
  btn_logout.style.position = "relative";
  p.innerHTML = `${winner} ganhou!`;
};
