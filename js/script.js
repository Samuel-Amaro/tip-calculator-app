"use strict";

let allInputs = document.querySelectorAll('input[type="number"]');
let allSelectsTipPercentage = document.querySelectorAll(".input__select-option");
let btnReset = document.querySelector(".btn-reset");

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
        if(parseInt(event.target.value) > 0) {
            removeAlert();
            let tip = getValuesTip();
            setValuesTip(tip.bill, tip.tipPercentage, tip.numberPeople);
        }else if(event.target.classList.contains("main__input_number-people") && parseInt(event.target.value) === 0)
            addAlert();
    }
}

function handlerActiveSelectTip(event) {
    if(!event.target.classList.contains("input__select-option_btn-active")) { 
        for(let selectTip of document.querySelectorAll(".input__select-option_btn-active"))
            selectTip.classList.remove("input__select-option_btn-active");
        event.target.classList.add("input__select-option_btn-active");
        let tip = getValuesTip();
        setValuesTip(tip.bill, tip.tipPercentage, tip.numberPeople);
    }
}

function clearFieldsResults(event) {
    document.querySelector(".main__input-result-tip-amount").innerHTML = "$0.00";
    document.querySelector(".main__input-result-total").innerHTML = "$0.00";
    inactiveButtonReset();
}

function activeButtonReset() {
    if(document.querySelector(".btn-reset").classList.contains("btn-reset__inactive")) {
        document.querySelector(".btn-reset").classList.remove("btn-reset__inactive");
        document.querySelector(".btn-reset").classList.add("input__select-option_btn-active");
    }
}

function inactiveButtonReset() {
    if(document.querySelector(".btn-reset").classList.contains("input__select-option_btn-active")) {
        document.querySelector(".btn-reset").classList.remove("input__select-option_btn-active");
        document.querySelector(".btn-reset").classList.add("btn-reset__inactive");
    }
}

function setValuesTip(bill, percentageTip, numberPeople) {
    let resultTipAmount = document.querySelector(".main__input-result-tip-amount");
    let resultTotal = document.querySelector(".main__input-result-total");
    if(bill === 0 || percentageTip === 0 || numberPeople === 0) {
        resultTipAmount.innerHTML = resultTipAmount.innerHTML;
        resultTotal.innerHTML = resultTotal.innerHTML;
    }else{
        let tipAmount = bill * (percentageTip / 100) / numberPeople;
        let totalPerPeople = (bill + (bill * (percentageTip / 100))) / numberPeople;
        if(isNaN(tipAmount) || isNaN(totalPerPeople)) {
            resultTipAmount.innerHTML = "$0.00";
            resultTotal.innerHTML = "$0.00";
            inactiveButtonReset();
        }else{
            resultTipAmount.innerHTML = "$" + tipAmount.toFixed(2);
            resultTotal.innerHTML = "$" + totalPerPeople.toFixed(2);
            activeButtonReset();
        }
    }
}

function getValuesTip() {
    let billElem = document.querySelector(".main__input_bill");
    let selectTipElem = document.querySelector(".input__select-option_btn-active");
    let valueTipPercen = 0;
    if(selectTipElem) 
        valueTipPercen = selectTipElem.value ?? selectTipElem.textContent;
    let numberPeopleElem = document.querySelector(".main__input_number-people");
    return {
        bill : parseFloat(billElem.value),
        tipPercentage : parseFloat(valueTipPercen),
        numberPeople : parseFloat(numberPeopleElem.value) 
    };
}

allInputs.forEach((inputElem) => {
    inputElem.addEventListener("input", handlerInput);
});

allSelectsTipPercentage.forEach((selectTip) => {
    selectTip.addEventListener("pointerdown", handlerActiveSelectTip);
});

btnReset.addEventListener("pointerdown", clearFieldsResults);


