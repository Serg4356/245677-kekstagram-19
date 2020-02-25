'use strict';

var PHOTO_DESCRIPTION_COUNT = 25;
var MIN_INDEX = 0;
var MIN_LIKE_COUNT = 15;
var MAX_LIKE_COUNT = 200;
var MIN_COMMENT_COUNT = 1;
var MAX_COMMENT_COUNT = 10;
var MIN_AVATAR_ID = 1;
var MAX_AVATAR_ID = 6;
var PHOTO_PATH_PREFIX = 'photos/';
var PHOTO_EXTENSION = '.jpg';
var AVATAR_PATH_PREFIX = 'img/avatar-';
var AVATAR_EXTENSION = '.svg';
var PICTURE_TEMPLATE_ID = '#picture';
var PICTURE_TEMPLATE_CLASS = '.picture';
var PICTURE_IMG_CLASS = '.picture__img';
var PICTURE_LIKES_CLASS = '.picture__likes';
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

var getRandomAvatarImgPath = function () {
  var randomAvatarNumber = getRandomIntInclusive(MIN_AVATAR_ID, MAX_AVATAR_ID);

  return AVATAR_PATH_PREFIX + randomAvatarNumber + AVATAR_EXTENSION
};

var getRandomComments = function () {
  var comments = [];
  var commentsCount = getRandomIntInclusive(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT);

  for (var i = 0; i < commentsCount; i++) {
    comments.push({
      avatar: getRandomAvatarImgPath(),
      message: MESSAGES[getRandomIntInclusive(MIN_INDEX, MESSAGES.length - 1)],
      name: NAMES[getRandomIntInclusive(MIN_INDEX, NAMES.length - 1)]
    });
  }

  return comments;
};

var getPhotoDescriptions = function () {
  var photoDescriptions = [];

  for (var i = 0; i < PHOTO_DESCRIPTION_COUNT; i++) {
    photoDescriptions.push({
      url: PHOTO_PATH_PREFIX + (i + 1) + PHOTO_EXTENSION,
      description: '',
      likes: getRandomIntInclusive(MIN_LIKE_COUNT, MAX_LIKE_COUNT),
      comments: getRandomComments(),
    });
  }

  return photoDescriptions;
};

var loadMocks = function (pictureTemplate, photoDescriptions) {
  var pictureFragment = document.createDocumentFragment();

  for (var i = 0; i < photoDescriptions.length; i++) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector(PICTURE_IMG_CLASS).setAttribute('src', photoDescriptions[i].url);
    pictureElement.querySelector(PICTURE_LIKES_CLASS).textContent = photoDescriptions[i].likes;
    pictureElement.querySelector(PICTURE_LIKES_CLASS).textContent = photoDescriptions[i].comments.length;
    pictureFragment.appendChild(pictureElement);
  }

  document.querySelector(PICTURE_TEMPLATE_CLASS).appendChild(pictureFragment);
};

var pictureTemplate = document.querySelector(PICTURE_TEMPLATE_ID).content.querySelector(PICTURE_TEMPLATE_CLASS);
var photoDescriptions = getPhotoDescriptions();
loadMocks(pictureTemplate, photoDescriptions);
