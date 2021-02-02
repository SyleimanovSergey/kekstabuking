'use strict'
//ПЕРЕМЕНЫЕ
let newArray = {
    author: {
        avatar:
            function (i) {
                return 'img/avatars/user0' + i + '.png'
            }
    },
    offer: {
        title: function () {
            let headings = [
                "Большая уютная квартира",
                "Маленькая неуютная квартира",
                "Огромный прекрасный дворец",
                "Маленький ужасный дворец",
                "Красивый гостевой домик",
                "Некрасивый негостеприимный домик",
                "Уютное бунгало далеко от моря",
                "Неуютное бунгало по колено в воде"]
            return headings[randomNumber(headings.length)];
        },
        address: {
            x: Math.round(1000 - 0.5 + Math.random() * (1000 - 50 + 1)),
            y: Math.round(1000 - 0.5 + Math.random() * (1000 - 50 + 1)),
        },
        price: function () {
            return Math.round(5000 - 0.5 + Math.random() * (45000 - 5000 + 1))
        },

        type: function () {
            let typePalace = ['palace', 'flat', 'house', 'bungalo']
            return typePalace[randomNumber(typePalace.length)];
        },
        rooms: function () {
            return Math.round(1 - 0.5 + Math.random() * (5 - 1 + 1));
        },
        guests: function () {
            return Math.round(1 - 0.5 + Math.random() * (20 - 1 + 1))
        },
        checkin: function () {
            let timeCheckin = ['12:00', '13:00', '14:00']
            return timeCheckin[randomNumber(timeCheckin.length)];
        },
        checkout: function () {
            let timeCheckout = ['12:00', '13:00', '14:00']
            return timeCheckout[randomNumber(timeCheckout.length)];
        },
        features:
            function () {
                let amenitiesList = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

                function shuffle(arr) {
                    let j, temp;
                    for (let i = arr.length - 1; i > 0; i--) {
                        j = Math.floor(Math.random() * (i + 1));
                        temp = arr[j];
                        arr[j] = arr[i];
                        arr[i] = temp;
                    }
                    return arr;
                }

                return shuffle(amenitiesList)
            },
        description: " ",
        photos:
            function (i) {
                let photoList = [
                    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
                    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
                    'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
                return photoList[i]
            },
        location: {
            x: function () {
                return Math.round(10 - 0.5 + Math.random() * (1200 - 10 + 1))

            },
            y: function () {
                return Math.round(150 - 0.5 + Math.random() * (500 - 150 + 1))

            }
        },
    },
}

let map = document.querySelector('.map');


let mapCard = document.querySelector('template')
    .content
    .querySelector('.map__card')

const mapPin = document.querySelector('.map__pin');

const mapPins = document.querySelector('.map__pins');

const fragment = document.createDocumentFragment()

//ФУНКЦИИ
// Рандомайзер
let randomNumber = (length) => {
    return Math.floor(Math.random() * Math.floor(length));
}

// Рандомайзер min max
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}


let AddPins = function () {

    //Проверка и удаление значков

    if (mapPins.querySelectorAll('.map__pin--item').length > 1) {
        [].forEach.call(mapPins.querySelectorAll('.map__pin--item'), function (i) {
            i.parentNode.removeChild(i);
        })
    }
    // Проверка и удаление popup

    if (map.querySelectorAll('article').length > 0) {
        [].forEach.call(map.querySelectorAll('article'), function (i) {
            i.parentNode.removeChild(i);
        })
    }
    // Добавление значков
    let addPins = function () {
        for (let i = 1; i <= 8; i++) {
            let newPin = mapPin.cloneNode(true)
            fragment.appendChild(newPin)
            mapPins.appendChild(fragment)
            newPin.classList.add('map__pin--item')
            newPin.style = 'left:' + newArray.offer.location.x() + 'px; top:' + newArray.offer.location.y() + 'px';
            newPin.querySelector("img").src = newArray.author.avatar(i);
            newPin.querySelector("img").alt = newArray.offer.title();
        }
    }
    //Добавить описание

    let addPopUp = function () {
        for (let i = 1; i <= 8; i++) {
            let element = mapCard.cloneNode(true)

            element.querySelector('img').src = newArray.author.avatar(i)
            element.querySelector('.popup__title').textContent = newArray.offer.title();
            element.querySelector('.popup__text--address').textContent = newArray.offer.address.x + " " + newArray.offer.address.y;
            element.querySelector('.popup__text--price').textContent = newArray.offer.price() + " ₽/ночь";
            element.querySelector('.popup__type').textContent = newArray.offer.type();
            element.querySelector('.popup__text--capacity').querySelectorAll("span")[0].textContent = String(newArray.offer.rooms());
            element.querySelector('.popup__text--capacity').querySelectorAll("span")[1].textContent = String(newArray.offer.guests());
            element.querySelector('.popup__text--time').querySelectorAll('span')[0].textContent = newArray.offer.checkin();
            element.querySelector('.popup__text--time').querySelectorAll('span')[1].textContent = newArray.offer.checkout();

            (function () {
                for (let i = 1; i <= 2; i++) {
                    let elementLi = element.querySelector('.popup__pictures').querySelector('li').cloneNode(true);
                    elementLi.querySelector("img").src = newArray.offer.photos(i);
                    fragment.appendChild(elementLi);
                    element.querySelector('.popup__pictures').appendChild(fragment);
                }
            }())
            element.querySelector('.popup__description').textContent = newArray.offer.description
            element.querySelector('.popup__pictures').querySelector('li').querySelector("img").src = newArray.offer.photos(0);
            //Добавление особенностей помещения
            (function () {
                let features = newArray.offer.features();

                element.querySelector('.popup__features').innerHTML = '';

                for (let i = 0; i < randomInteger(1, features.length); i++) {
                    let elementPopupFeatures = document.createElement('li')
                    elementPopupFeatures.className = 'feature feature--' + features[i]
                    element.querySelector('.popup__features').appendChild(elementPopupFeatures);
                }
            }())
            map.appendChild(element);
        }
    }
    addPins();
    addPopUp()
    //Добавление фотографий
}


//Активация формы

let notice = document.querySelector('.notice');
let activeForm = function () {
    notice.querySelector('form').classList.remove('notice__form--disabled');
}

let formElement = notice.querySelectorAll('.form__element--wide');
let title = formElement[0].querySelector('#title');
let address = formElement[1].querySelector('#address');
let type = formElement[2].querySelector('#type');
let price = formElement[3].querySelector('#price');
let timeIn = formElement[4].querySelector('#timein');
let timeOut = formElement[4].querySelector('#timeout');
let room_number = formElement[5].querySelector('#room_number');
let capacity = formElement[6].querySelector('#capacity');
let facilities = formElement[7];
let description = formElement[8].querySelector('#description');
let photo = formElement[9];


let mapPinMain = mapPins.querySelector('.map__pin--main');
// Определение координат

let position = function () {
    let posTop = mapPinMain.offsetTop;
    let posLeft = mapPinMain.offsetLeft;
    return address.value = posTop + ' ' + posLeft;
}
position()

let activePosition = function () {
    let posTop = mapPinMain.offsetTop + mapPinMain.offsetHeight + 22;
    let posLeft = mapPinMain.offsetLeft;
    return address.value = posTop + ' ' + posLeft;
}

// Перетаскивание значка

function onMapPinMain() {
    map.classList.remove('map--faded');
    activeForm()
    AddPins()
    activePosition()
    onPinItem()
}

mapPinMain.addEventListener('mouseup', onMapPinMain)

function onPinItem() {

    let pins = mapPins.querySelectorAll('.map__pin--main');
    let popup = map.querySelectorAll('.popup');


    pins.forEach((item, i) => {

        item.addEventListener('click', e => {
            popup.forEach(function (item) {
                item.classList.add('hidden')
            })
            if (i > 0) {
                map.querySelectorAll('.popup')[i - 1].classList.toggle('hidden');
            }
        })
    })
}