'use strict';


(function (){
    window.UTILS = {
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
    };


    window.MAP = document.querySelector('.map');
    window.MAP_CARD = document.querySelector('#card').content.querySelector('.map__card');
    window.MAP_PIN = document.querySelector('.map__pin');
    window.MAP_PINS = document.querySelector('.map__pins');
    window.fragment = document.createDocumentFragment();

    window.randomNumber = (length) => {
        return Math.floor(Math.random() * Math.floor(length));
    };

    window.randomInteger= function (min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    };

    window.MAP_PIN_MAIN = MAP_PINS.querySelector('.map__pin--main');
}());