export const winnerPopUp = (winner) => {
  const popUp = document.querySelector("#winner-pop-up");
  popUp.style.backgroundColor = "rgba(53, 52, 49, 0.95)";
  let p = document.createElement("p");
  popUp.append(p);
  p.innerHTML = `${winner} ganhou!`;
};