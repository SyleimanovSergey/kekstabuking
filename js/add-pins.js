'use strict';

(function (){


    window.addPins = function () {

        if (MAP_PINS.querySelectorAll('.map__pin--item').length > 1) {
            [].forEach.call(MAP_PINS.querySelectorAll('.map__pin--item'), function (i) {
                i.parentNode.removeChild(i);
            })
        }

        const PINS_ITEM_BUTTON = document.querySelector('#pin').content.querySelector('button');

        for (let i = 1; i <= 8; i++) {
            let newPin = PINS_ITEM_BUTTON.cloneNode(true)
            fragment.appendChild(newPin)
            MAP_PINS.appendChild(fragment)
            newPin.classList.add('map__pin--item')
            newPin.style = 'left:' + UTILS.offer.location.x() + 'px; top:' + UTILS.offer.location.y() + 'px';
            newPin.querySelector("img").src = UTILS.author.avatar(i);
            newPin.querySelector("img").alt = UTILS.offer.title();
        }
    }
}())