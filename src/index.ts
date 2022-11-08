import "./css/main.css";

const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");

btnSend.addEventListener("click", send);

function send() {
  divMessages.innerHTML += tbMessage.value;
}