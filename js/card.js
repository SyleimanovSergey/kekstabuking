'use strict';

(function () {
    window.addPopUp = function () {

        if (MAP.querySelectorAll('article').length > 1) {
            [].forEach.call(MAP.querySelectorAll('article'), function (i) {
                i.parentNode.removeChild(i);
            })
        }

        for (let i = 1; i <= 8; i++) {
            let element = MAP_CARD.cloneNode(true);
            element.querySelector('img').src = UTILS.author.avatar(i);
            element.querySelector('.popup__title').textContent = UTILS.offer.title();
            element.querySelector('.popup__text--address').textContent = String(UTILS.offer.address.x) + " " + String(UTILS.offer.address.y);
            element.querySelector('.popup__text--price').textContent = String(UTILS.offer.price()) + " ₽/ночь";
            element.querySelector('.popup__type').textContent = UTILS.offer.type();
            element.querySelector('.popup__text--capacity').querySelectorAll("span")[0].textContent = String(UTILS.offer.rooms());
            element.querySelector('.popup__text--capacity').querySelectorAll("span")[1].textContent = String(UTILS.offer.guests());
            element.querySelector('.popup__text--time').querySelectorAll('span')[0].textContent = UTILS.offer.checkin();
            element.querySelector('.popup__text--time').querySelectorAll('span')[1].textContent = UTILS.offer.checkout();

            //Добавление фотографий
            (function () {
                for (let i = 1; i <= 2; i++) {
                    let elementLi = element.querySelector('.popup__pictures').querySelector('li').cloneNode(true);
                    elementLi.querySelector("img").src = UTILS.offer.photos(i);
                    fragment.appendChild(elementLi);
                    element.querySelector('.popup__pictures').appendChild(fragment);
                }
            }())

            element.querySelector('.popup__description').textContent = UTILS.offer.description;
            element.querySelector('.popup__pictures').querySelector('li').querySelector("img").src = UTILS.offer.photos(0);


            //Добавление особенностей помещения
            (function () {
                let features = UTILS.offer.features();

                element.querySelector('.popup__features').innerHTML = '';

                for (let i = 0; i < randomInteger(1, features.length); i++) {
                    let elementPopupFeatures = document.createElement('li')
                    elementPopupFeatures.className = 'feature feature--' + features[i]
                    element.querySelector('.popup__features').appendChild(elementPopupFeatures);
                }
            }())

            fragment.appendChild(element);
            MAP.appendChild(fragment)
        }
    };
}());