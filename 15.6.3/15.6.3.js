

function pageLoaded() {
    const wUrl = "wss://echo-ws-service.herokuapp.com";

    const infoOutput = document.querySelector(".info_output");
    const chatOutput = document.querySelector(".chat_output");
    const input = document.querySelector("input");
    const sendBtn = document.querySelector(".btn_send");
    const status = document.querySelector('#status');

    const btn = document.querySelector('.btn_geo');


    let socket = new WebSocket(wUrl);

    socket.onopen = () => {
        infoOutput.innerText = "Соединение установлено";
    }

    socket.onmessage = (event) => {
        writeToChat(event.data, true);
    }

    socket.onerror = () => {
        infoOutput.innerText = 'Произошла ошибка';
    }

    sendBtn.addEventListener('click', sendMessage);

    function sendMessage() {
        if (!input.value) return;
        socket.send(input.value);
        writeToChat(input.value, false);
        input.value === "";
    }

    function writeToChat(message, isRecieved) {
        let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
        chatOutput.innerHTML += messageHTML;
    }


    btn.addEventListener('click', () => {

        if (!navigator.geolocation) {
            infoOutput.innerText = 'Geolocation не поддерживается вашим браузером';
        } else {
            infoOutput.innerText = 'Определение местоположения…';
            navigator.geolocation.getCurrentPosition(success, error);
        }
    });

    const error = () => {
        status.textContent = 'Невозможно получить ваше местоположение';
    }

    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        setTimeout(() =>
            writeToChatGeoLocation(latitude, longitude), 2000)
    }

    function writeToChatGeoLocation(latitude, longitude){
        infoOutput.innerText = 'Гео позиция определена, пройдите по ссылке в чате...';
        let messageHTML = `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Ссылка на карту</a>`;
        chatOutput.innerHTML += messageHTML;
    }

}

document.addEventListener("DOMContentLoaded", pageLoaded);