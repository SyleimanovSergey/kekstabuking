'use strict';

(function (){

    window.NOTICE = document.querySelector('.notice');

    window.formElement = NOTICE.querySelectorAll('.form__element--wide');
    window.title = formElement[0].querySelector('#title');
    window.address = formElement[1].querySelector('#address');
    window.type = formElement[2].querySelector('#type');
    window.price = formElement[3].querySelector('#price');
    window.timeIn = formElement[4].querySelector('#timein');
    window.timeOut = formElement[4].querySelector('#timeout');
    window.room_number = formElement[5].querySelector('#room_number');
    window.capacity = formElement[6].querySelector('#capacity');
    window.facilities = formElement[7];
    window.description = formElement[8].querySelector('#description');
    window.photo = formElement[9];


    window.activeForm = function () {
        NOTICE.querySelector('form').classList.remove('notice__form--disabled');
    }
}())