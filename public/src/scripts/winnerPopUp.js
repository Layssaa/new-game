const winnerPopUp = (winner) => {
  const popup = document.getElementById("popupVencedor");
  popup.style.backgroundColor = "rgba(53, 52, 49, 0.95)";
  let p = document.createElement("p");
  popup.append(p);
  p.innerHTML = `${winner} ganhou!`;
};

export default winnerPopUp;
