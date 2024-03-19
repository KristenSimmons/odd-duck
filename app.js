'use strict';

const sectionElem = document.getElementById('resultsContainer');
const button = document.getElementById('showResults');

const leftImage = document.querySelector('section img:first-child');
const centerImage = document.querySelector('section img:nth-child(2)');
const rightImage = document.querySelector('section img:nth-child(3)');
const allProducts = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass',
];

let leftImageInstance = null;
let centerImageInstance = null;
let rightImageInstance = null;
let clickCount = 0; // running total of votes
const maxClicks = 25; // max number of votes
const productStorageKey = 'product-key';

function Product(name, src, views = 0, clicks = 0) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;
}
Product.allProducts = [];
Product.workingProducts = [];
