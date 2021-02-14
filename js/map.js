'use strict';
(function () {
   const MIN_SHIFT_Y = 130;
    const MAX_SHIFT_Y = 630;
    const MIN_SHIFT_X = 0;
    const MAX_SHIFT_X = 1200;

    window.activePosition = function () {
        let posTop = MAP_PIN_MAIN.offsetTop + MAP_PIN_MAIN.offsetHeight - 22;
        let posLeft = MAP_PIN_MAIN.offsetLeft;
        return address.value = posTop + ',' + ' ' + posLeft;
    }

    window.onPinItem = function () {

        const PINS = MAP_PINS.querySelectorAll('.map__pin--item');
        const POPUP = MAP.querySelectorAll('.popup');


        PINS.forEach((item, i) => {

            item.addEventListener('click', () => {
                POPUP.forEach(function (item) {
                    item.classList.add('hidden')
                })
                if (i > 0) {
                    MAP.querySelectorAll('.popup')[i].classList.toggle('hidden');
                }
            });
        });
    };

    (function position() {
        let posTop = MAP_PIN_MAIN.offsetTop;
        let posLeft = MAP_PIN_MAIN.offsetLeft;
        return address.value = posTop + ' ' + ',' + ' ' + posLeft;
    }());

    MAP_PIN_MAIN.addEventListener('mousedown', function (evt) {
        evt.preventDefault()
        MAP.classList.remove('map--faded')

        let startCoords = {
            x: MAP_PIN_MAIN.clientX,
            y: MAP_PIN_MAIN.clientY,
        }

        let dragged = true;


        let onMouseClickMainPin = function (clickEvt) {
            clickEvt.preventDefault();
            activeForm();
            addPins();
            addPopUp();
            onPinItem()
        }


        let onMouseMoveMapPin = function (moveEvt) {
            moveEvt.preventDefault();
            activePosition();
            dragged = false;

            let shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY,
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY,
            };

            MAP_PIN_MAIN.style.top = (MAP_PIN_MAIN.offsetTop - shift.y) + 'px';
            MAP_PIN_MAIN.style.left = (MAP_PIN_MAIN.offsetLeft - shift.x) + 'px';

            if ((MAP_PIN_MAIN.offsetTop - shift.y) >= MAX_SHIFT_Y) {
                MAP_PIN_MAIN.style.top = Number(MAX_SHIFT_Y) + 'px';
            }
            else if ((MAP_PIN_MAIN.offsetTop - shift.y) <= MIN_SHIFT_Y) {
                MAP_PIN_MAIN.style.top = Number(MIN_SHIFT_Y) + 'px';
            }
            else if ((MAP_PIN_MAIN.offsetLeft - shift.x) >= MAX_SHIFT_X) {
                MAP_PIN_MAIN.style.left = Number(MAX_SHIFT_X) + 'px';
            }
            else if ((MAP_PIN_MAIN.offsetLeft - shift.x) <= MIN_SHIFT_X) {
                MAP_PIN_MAIN.style.left = Number(MIN_SHIFT_X) + 'px';
            }
        };

        let onMouseUpMapPin = function (upEvt) {
            upEvt.preventDefault();
            document.removeEventListener('mousemove', onMouseMoveMapPin);
            document.removeEventListener('mouseup', onMouseUpMapPin);

            if (dragged === true) {
                let onClickPreventDefault = function () {
                    MAP_PIN_MAIN.removeEventListener('click', onMouseClickMainPin);
                    MAP_PIN_MAIN.removeEventListener('click', onClickPreventDefault);
                }
                MAP_PIN_MAIN.addEventListener('click', onMouseClickMainPin);
                MAP_PIN_MAIN.addEventListener('click', onClickPreventDefault);

            }
        }

        document.addEventListener('mousemove', onMouseMoveMapPin)
        document.addEventListener('mouseup', onMouseUpMapPin)
    });

    function onPinItem() {
        let pins = MAP_PINS.querySelectorAll('.map__pin--item');
        let popup = MAP.querySelectorAll('.popup');

        pins.forEach((item, i) => {

            item.addEventListener('click', () => {
                popup.forEach(function (item) {
                    item.classList.add('hidden')
                })
                MAP.querySelectorAll('.popup')[i].classList.toggle('hidden');
            })
        })
    }
}());





