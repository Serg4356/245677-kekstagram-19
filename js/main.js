'use strict';

var PHOTO_DESCRIPTION_COUNT = 25;
var MIN_INDEX = 0;
var MIN_LIKE_COUNT = 15;
var MAX_LIKE_COUNT = 200;
var MIN_COMMENT_COUNT = 1;
var MAX_COMMENT_COUNT = 10;
var MIN_AVATAR_ID = 1;
var MAX_AVATAR_ID = 6;
var NAMES = [
  'Артем',
  'Кирилл',
  'Иван',
  'Сергей',
  'Ильдар'
];
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateComments = function () {
  var comments = [];

  for (var i = 0; i < getRandomIntInclusive(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT); i++) {
    comments[i] = {
      avatar: 'img/avatar-' + getRandomIntInclusive(MIN_AVATAR_ID, MAX_AVATAR_ID) + '.svg',
      message: MESSAGES[getRandomIntInclusive(MIN_INDEX, MESSAGES.length - 1)],
      name: NAMES[getRandomIntInclusive(MIN_INDEX, NAMES.length - 1)]
    };
  }

  return comments;
};

var generatePhotoDescriptions = function () {
  var photoDescriptions = [];
  for (var i = 0; i < PHOTO_DESCRIPTION_COUNT; i++) {
    photoDescriptions[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: '',
      likes: getRandomIntInclusive(MIN_LIKE_COUNT, MAX_LIKE_COUNT),
      comments: generateComments(),
    };
  }

  return photoDescriptions;
};


var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictureFragment = document.createDocumentFragment();
var comments = generatePhotoDescriptions();

for (var i = 0; i < comments.length; i++) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').setAttribute('src', comments[i].url);
  pictureElement.querySelector('.picture__likes').textContent = comments[i].likes;
  pictureElement.querySelector('.picture__likes').textContent = comments[i].comments.length;
  pictureFragment.appendChild(pictureElement);
}
document.querySelector('.pictures').appendChild(pictureFragment);
