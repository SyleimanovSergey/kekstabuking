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
    price:
      Math.round(5000 - 0.5 + Math.random() * (45000 - 5000 + 1)),
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
          var j, temp;
          for (var i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
          }
          return arr;
        }
        let amenities = shuffle(amenitiesList);
        return amenities
      },
    description: " ",
    photos:
      function (i) {
        let photoList = [
          'http://o0.github.io/assets/images/tokyo/hotel.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel.jpg']
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
map.classList.remove('map--faded');

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
// Добавление значков
let addPins = function (){
  for (let i = 1; i <= 8; i++) {
    let newPin = mapPin.cloneNode(true)
    fragment.appendChild(newPin)
    mapPins.appendChild(fragment)
    newPin.style = 'left:' + newArray.offer.location.x() + 'px; top:' + newArray.offer.location.y() + 'px';
    newPin.querySelector("img").src = newArray.author.avatar(i);
    newPin.querySelector("img").alt = newArray.offer.title();
  }
}
//Добавление особенностей помещения
let featureAdd = function (){
  let features = newArray.offer.features();

  element.querySelector('.popup__features').innerHTML = ''

  for (let i = 0; i < randomInteger(1, features.length); i++) {
    let elementPopupFeatures = document.createElement('li')
    elementPopupFeatures.className = 'feature feature--' + features[i]
    element.querySelector('.popup__features').appendChild(elementPopupFeatures);
  }
}
//Добавление фотографий
let photoAdd = function (){
  for (let i = 1; i <= 2; i++) {
    let elementLi = element.querySelector('.popup__pictures').querySelector('li').cloneNode(true);
    elementLi.querySelector("img").src = newArray.offer.photos(i);
    fragment.appendChild(elementLi);
    element.querySelector('.popup__pictures').appendChild(fragment);
  }
}

addPins();
let element = mapCard.cloneNode(true)
element.querySelector('.popup__title').textContent = newArray.offer.title();
element.querySelector('.popup__text--address').textContent = newArray.offer.address.x + " " + newArray.offer.address.y;
element.querySelector('.popup__text--price').textContent = newArray.offer.price + " ₽/ночь";
element.querySelector('.popup__type').textContent = newArray.offer.type();
element.querySelector('.popup__text--capacity').querySelectorAll("span")[0].textContent = newArray.offer.rooms();
element.querySelector('.popup__text--capacity').querySelectorAll("span")[1].textContent = newArray.offer.guests();
element.querySelector('.popup__text--time').querySelectorAll('span')[0].textContent = newArray.offer.checkin();
element.querySelector('.popup__text--time').querySelectorAll('span')[1].textContent = newArray.offer.checkout();
featureAdd()
element.querySelector('.popup__description').textContent = newArray.offer.description
element.querySelector('.popup__pictures').querySelector('li').querySelector("img").src = newArray.offer.photos(0);
photoAdd()
map.appendChild(element);
