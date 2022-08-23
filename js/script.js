"use strict";

let allInputs = document.querySelectorAll('input[type="number"]');
let allSelectsTipPercentage = document.querySelectorAll(".input__select-option");

function addAlert() {
    let alert = document.querySelector(".feedback-input");
    if(!alert) {
        let p = document.createElement("p");
        let inputNumberPeople = document.querySelector(".main__input_number-people");
        let label = document.querySelector(".main__number-of-people");
        inputNumberPeople.classList.add("main__input_alert");
        p.setAttribute("alert", "role");
        p.setAttribute("aria-relevant", "all");
        p.setAttribute("class", "feedback-input");
        p.textContent = "Can't be zero"; 
        label.insertAdjacentElement("afterend", p);
    }
}

function removeAlert() {
    let p = document.querySelector(".feedback-input");
    let inputNumberPeople = document.querySelector(".main__input_number-people");
    if(p) {
        p.remove();
        inputNumberPeople.classList.remove("main__input_alert");
    }
}

function handlerInput(event) {
    if(event.target.value) {
        if(event.target.classList.contains("main__input_number-people") && event.target.value === '0'){ 
            addAlert();
        }else if(event.target.classList.contains("main__input_number-people") && parseInt(event.target.value) > 0)
            removeAlert();
        console.log('Number: ' + event.target.value);
    }
}

function handlerActiveSelectTip(event) {
    if(!event.target.classList.contains("input__select-option_btn-active")) { 
        for(let selectTip of document.querySelectorAll(".input__select-option_btn-active")) {
            selectTip.classList.remove("input__select-option_btn-active");
        }
        event.target.classList.add("input__select-option_btn-active");
    }
}

//TODO: implementar function que limpa campos de resultado
//TODO: implementar um estado inativo inicial do button e depois implementar o estado ativo, isso e dinamico a cada click

function clearFieldsResults(event) {

}

allInputs.forEach((inputElem) => {
    inputElem.addEventListener("input", handlerInput);
});

allSelectsTipPercentage.forEach((selectTip) => {
    selectTip.addEventListener("pointerdown", handlerActiveSelectTip);
});

//TODO: implementar function de calcular quantidade total da gorjeta por pessoa
//TODO: implementar uma function que mostre o resultado dos calculos ao vivo a cada nova entrada de valor recebida, boa parte da estrutura do codigo esta pronta basta, so realizar calculo e atualizar campos a cada modificação.
function calcTip(bill, percentageTip, numberPeople) {

}

